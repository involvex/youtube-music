/**
 * Standalone Bun Development Server for YouTube Music Frontend
 *
 * This comprehensive development server provides:
 * - Hot Module Replacement (HMR) with WebSocket support
 * - File watching with Bun.watch for automatic reloading
 * - SPA routing with fallback to index.html
 * - External access support for development from other devices
 * - CORS configuration for cross-origin requests
 * - Environment variable configuration
 * - Static asset serving with proper MIME types
 * - Integration with existing Vite build system
 */

import { readFileSync, existsSync, statSync } from 'node:fs';
import { join, extname } from 'node:path';

import { serve } from 'bun';

const __dirname = process.cwd();

// Environment Configuration
const CONFIG = {
  // Server configuration
  PORT: parseInt(process.env.DEV_SERVER_PORT || '3000', 10),
  HOST: process.env.DEV_SERVER_HOST || '127.0.0.1', // Use localhost by default for security
  HMR_PORT: parseInt(process.env.HMR_PORT || '3001', 10),
  HMR_HOST: process.env.HMR_HOST || process.env.DEV_SERVER_HOST || '0.0.0.0',

  // Feature flags
  ENABLE_HMR: process.env.ENABLE_HMR !== 'false',
  ENABLE_CORS: process.env.ENABLE_CORS !== 'false',
  ENABLE_PROXY: process.env.ENABLE_PROXY !== 'false',

  // Paths
  PUBLIC_DIR: join(__dirname, 'public'),
  SRC_DIR: join(__dirname, 'src'),
  ASSETS_DIR: join(__dirname, 'assets'),
  DIST_DIR: join(__dirname, 'dist'),

  // API configuration
  API_BASE_URL: process.env.API_BASE_URL || 'https://music.youtube.com',
  WS_URL:
    process.env.WS_URL ||
    `ws://${process.env.HMR_HOST || 'localhost'}:${process.env.HMR_PORT || '3001'}`,

  // Development settings
  NODE_ENV: process.env.NODE_ENV || 'development',
  BUN_ENV: process.env.BUN_ENV || 'development',
  LOG_LEVEL: process.env.LOG_LEVEL || 'info',
};

// MIME types for static file serving
const MIME_TYPES = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.ts': 'text/typescript',
  '.tsx': 'text/typescript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.eot': 'application/vnd.ms-fontobject',
  '.mp3': 'audio/mpeg',
  '.wav': 'audio/wav',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
  '.pdf': 'application/pdf',
  '.zip': 'application/zip',
  '.tar': 'application/x-tar',
  '.gz': 'application/gzip',
};

// Environment variables for frontend injection
const ENV_VARS = {
  NODE_ENV: CONFIG.NODE_ENV,
  BUN_ENV: CONFIG.BUN_ENV,
  API_BASE_URL: CONFIG.API_BASE_URL,
  WS_URL: CONFIG.WS_URL,
  ENABLE_HMR: CONFIG.ENABLE_HMR,
  DEV_SERVER_PORT: CONFIG.PORT,
  HMR_PORT: CONFIG.HMR_PORT,
  HMR_HOST: CONFIG.HMR_HOST,
};

// HMR WebSocket clients
const hmrClients = new Set<WebSocket>();

// File watcher for HMR
let fileWatcher: any = null;
let isWatching = false;

// Logging utilities
const log = {
  info: (message: string, ...args: any[]) => {
    if (CONFIG.LOG_LEVEL === 'info' || CONFIG.LOG_LEVEL === 'debug') {
      console.log(`[DEV-SERVER] ${message}`, ...args);
    }
  },
  warn: (message: string, ...args: any[]) => {
    console.warn(`[DEV-SERVER] ${message}`, ...args);
  },
  error: (message: string, ...args: any[]) => {
    console.error(`[DEV-SERVER] ${message}`, ...args);
  },
  debug: (message: string, ...args: any[]) => {
    if (CONFIG.LOG_LEVEL === 'debug') {
      console.debug(`[DEV-SERVER] ${message}`, ...args);
    }
  },
};

// File change debouncing
const changeQueue = new Map();
const DEBOUNCE_DELAY = 100;

function debounceHMR(filePath: string) {
  if (changeQueue.has(filePath)) {
    clearTimeout(changeQueue.get(filePath) as NodeJS.Timeout);
  }

  const timeout = setTimeout(() => {
    changeQueue.delete(filePath);
    broadcastHMR(filePath);
  }, DEBOUNCE_DELAY);

  changeQueue.set(filePath, timeout);
}

// File watcher setup
function setupFileWatcher() {
  if (isWatching || !CONFIG.ENABLE_HMR) return;

  try {
    // Try to use Bun.watch first
    const bun = Bun;
    const bunTyped = bun as any;

    if (typeof bunTyped.watch === 'function') {
      fileWatcher = bunTyped.watch({
        dir: CONFIG.SRC_DIR,
        ignored: [
          'node_modules',
          'dist',
          'build',
          '.git',
          '*.log',
          '*.tmp',
          '*.test.*',
          '*.spec.*',
          '*.d.ts',
          'vite-plugins/**',
        ],
        recursive: true,
      });

      fileWatcher.on('change', (event: any) => {
        if (event.type === 'modify' || event.type === 'create') {
          const filePath = event.path;
          const ext = extname(filePath);

          // Only trigger HMR for relevant files
          if (
            [
              '.ts',
              '.tsx',
              '.js',
              '.jsx',
              '.css',
              '.scss',
              '.sass',
              '.less',
            ].includes(ext)
          ) {
            log.debug(`File changed: ${filePath}`);
            debounceHMR(filePath);
          }
        }
      });

      isWatching = true;
      log.info('📁 File watcher started - watching source files for changes');
    } else {
      // Fallback to Node.js fs.watch
      log.warn('Bun.watch not available, using Node.js fs.watch fallback');
      startNodeFileWatcher();
    }
  } catch (error) {
    log.error(
      'Failed to start Bun file watcher, trying Node.js fallback:',
      error,
    );
    startNodeFileWatcher();
  }
}

// Node.js fs.watch fallback implementation
function startNodeFileWatcher() {
  try {
    const fs = require('node:fs');
    const path = require('node:path');

    // Watch the source directory recursively
    const watchDir = (dir: string) => {
      try {
        const files = fs.readdirSync(dir);

        for (const file of files) {
          const fullPath = path.join(dir, file);

          // Skip ignored directories
          if (
            ['node_modules', 'dist', 'build', '.git', 'vite-plugins'].includes(
              file,
            )
          ) {
            continue;
          }

          try {
            const stat = fs.statSync(fullPath);

            if (stat.isDirectory()) {
              // Only watch directories that are within the project
              if (fullPath.startsWith(CONFIG.SRC_DIR)) {
                watchDir(fullPath);
              }
            } else {
              // Watch individual files
              const watcher = fs.watch(fullPath, (eventType: string) => {
                if (eventType === 'change' || eventType === 'rename') {
                  const ext = path.extname(fullPath);

                  // Only trigger HMR for relevant files
                  if (
                    [
                      '.ts',
                      '.tsx',
                      '.js',
                      '.jsx',
                      '.css',
                      '.scss',
                      '.sass',
                      '.less',
                    ].includes(ext)
                  ) {
                    log.debug(`File changed: ${fullPath}`);
                    debounceHMR(fullPath);
                  }
                }
              });

              // Store watcher for cleanup
              if (!fileWatcher) {
                fileWatcher = [];
              }
              fileWatcher.push(watcher);
            }
          } catch {
            // Skip files that can't be accessed
            log.debug(`Skipping inaccessible file: ${fullPath}`);
          }
        }
      } catch (error) {
        log.warn(`Failed to watch directory ${dir}:`, error);
      }
    };

    watchDir(CONFIG.SRC_DIR);
    isWatching = true;
    log.info(
      '📁 Node.js file watcher started - watching source files for changes',
    );
  } catch (error) {
    log.error('Failed to start Node.js file watcher:', error);
  }
}

// HMR broadcasting
function broadcastHMR(filePath: string) {
  if (!CONFIG.ENABLE_HMR) return;

  const message = JSON.stringify({
    type: 'update',
    path: filePath,
    timestamp: Date.now(),
    hash: Math.random().toString(36).slice(2, 8), // Simple cache busting
  });

  log.debug(`Broadcasting HMR update for: ${filePath}`);

  hmrClients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      try {
        client.send(message);
      } catch (error) {
        log.warn('Failed to send HMR message:', error);
        hmrClients.delete(client);
      }
    } else {
      hmrClients.delete(client);
    }
  });
}

// Static file serving
function serveFile(filePath: string) {
  if (!existsSync(filePath)) {
    return new Response('File not found', { status: 404 });
  }

  const stats = statSync(filePath);
  if (stats.isDirectory()) {
    return new Response('Directory access not allowed', { status: 403 });
  }

  const ext = extname(filePath);
  const mimeType =
    (MIME_TYPES as Record<string, string>)[ext] || 'application/octet-stream';

  const content = readFileSync(filePath);

  const headers: Record<string, string> = {
    'Content-Type': mimeType,
    'Cache-Control': 'no-cache, no-store, must-revalidate',
    'Pragma': 'no-cache',
    'Expires': '0',
  };

  // Add CORS headers if enabled
  if (CONFIG.ENABLE_CORS) {
    headers['Access-Control-Allow-Origin'] = '*';
    headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS';
    headers['Access-Control-Allow-Headers'] =
      'Content-Type, Authorization, X-Requested-With';
  }

  return new Response(content, {
    headers,
  });
}

// HTML file serving with environment injection
function serveHTML(filePath: string) {
  let content = readFileSync(filePath, 'utf-8');

  // Inject environment variables
  const envScript = `
    <script>
      window.__ENV__ = ${JSON.stringify(ENV_VARS)};
      window.__DEV_SERVER__ = {
        enabled: true,
        port: ${CONFIG.PORT},
        host: '${CONFIG.HOST}',
        hmr: {
          enabled: ${CONFIG.ENABLE_HMR},
          port: ${CONFIG.HMR_PORT},
          host: '${CONFIG.HMR_HOST}'
        }
      };
    </script>
  `;

  // Inject HMR client script
  const hmrScript = CONFIG.ENABLE_HMR
    ? `
    <script>
      (function() {
        // HMR Client Implementation
        let ws;
        let reconnectAttempts = 0;
        const maxReconnectAttempts = 10;

        function connect() {
          try {
            const wsUrl = 'ws://${CONFIG.HMR_HOST}:${CONFIG.HMR_PORT}';
            ws = new WebSocket(wsUrl);

            ws.onopen = function() {
              console.log('[HMR] Connected to development server');
              reconnectAttempts = 0;
            };

            ws.onmessage = function(event) {
              const data = JSON.parse(event.data);
              if (data.type === 'update') {
                console.log('[HMR] File changed:', data.path);
                // For now, trigger page reload
                // TODO: Implement selective updates for specific file types
                if (data.path.endsWith('.css')) {
                  // CSS hot reload
                  const links = document.querySelectorAll('link[rel="stylesheet"]');
                  links.forEach(link => {
                    const href = link.getAttribute('href');
                    if (href) {
                      const newHref = href + (href.includes('?') ? '&' : '?') + 'v=' + Date.now();
                      link.setAttribute('href', newHref);
                    }
                  });
                } else {
                  // JS/HTML changes require page reload
                  location.reload();
                }
              }
            };

            ws.onclose = function() {
              console.warn('[HMR] Connection closed, attempting to reconnect...');
              if (reconnectAttempts < maxReconnectAttempts) {
                reconnectAttempts++;
                setTimeout(connect, 1000 * reconnectAttempts);
              }
            };

            ws.onerror = function() {
              console.warn('[HMR] Connection failed');
            };
          } catch (error) {
            console.error('[HMR] Failed to connect:', error);
          }
        }

        // Start connection
        connect();
      })();
    </script>
  `
    : '';

  // Inject scripts before closing head tag
  content = content.replace(/<\/head>/i, `${envScript}${hmrScript}</head>`);

  const headers = {
    'Content-Type': 'text/html; charset=utf-8',
    'Cache-Control': 'no-cache, no-store, must-revalidate',
    'Pragma': 'no-cache',
    'Expires': '0',
  };

  // Add CORS headers if enabled
  if (CONFIG.ENABLE_CORS) {
    (headers as any)['Access-Control-Allow-Origin'] = '*';
    (headers as any)['Access-Control-Allow-Methods'] =
      'GET, POST, PUT, DELETE, OPTIONS';
    (headers as any)['Access-Control-Allow-Headers'] =
      'Content-Type, Authorization, X-Requested-With';
  }

  return new Response(content, {
    headers,
  });
}

// API proxy handler
async function handleAPIProxy(request: Request, pathname: string, url: URL) {
  if (!CONFIG.ENABLE_PROXY) {
    return new Response('Proxy disabled', { status: 403 });
  }

  try {
    const targetUrl = `${CONFIG.API_BASE_URL}${pathname}${url.search}`;

    const response = await fetch(targetUrl, {
      method: request.method,
      headers: {
        ...Object.fromEntries(request.headers.entries()),
        Origin: `http://${CONFIG.HOST}:${CONFIG.PORT}`,
        Referer: `http://${CONFIG.HOST}:${CONFIG.PORT}/`,
      },
      body: request.body,
    });

    const headers = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers':
        'Content-Type, Authorization, X-Requested-With',
      'Access-Control-Expose-Headers': 'Content-Length, Content-Type',
    };

    // Copy response headers, excluding problematic ones
    response.headers.forEach((value, key) => {
      if (
        ![
          'access-control-allow-origin',
          'access-control-allow-methods',
          'access-control-allow-headers',
        ].includes(key.toLowerCase())
      ) {
        (headers as any)[key] = value;
      }
    });

    return new Response(response.body, {
      status: response.status,
      headers,
    });
  } catch (error) {
    log.error('API proxy error:', error);
    return new Response('API proxy error', { status: 502 });
  }
}

// SPA routing handler
function handleSPARouting(_request: Request, pathname: string) {
  log.debug(`Handling request for: ${pathname}`);

  // Check if the request is for a static asset
  const ext = extname(pathname);
  log.debug(`Path extension: "${ext}"`);

  if (ext && ext !== '.html') {
    // Try to serve the static file
    let filePath = '';

    if (pathname.startsWith('/src/')) {
      filePath = join(CONFIG.SRC_DIR, pathname.slice(5));
    } else if (pathname.startsWith('/assets/')) {
      filePath = join(CONFIG.ASSETS_DIR, pathname.slice(8));
    } else if (pathname.startsWith('/dist/')) {
      filePath = join(CONFIG.DIST_DIR, pathname.slice(6));
    } else {
      filePath = join(CONFIG.PUBLIC_DIR, pathname);
    }

    log.debug(`Looking for static file: ${filePath}`);
    if (existsSync(filePath)) {
      log.debug(`Serving static file: ${filePath}`);
      return serveFile(filePath);
    }
  } else {
    log.debug(
      'No extension or .html extension, falling through to SPA fallback',
    );
  }

  // For all other routes (including root /), serve the main HTML file (SPA fallback)
  const indexPath = join(CONFIG.SRC_DIR, 'index.html');
  log.debug(`Looking for SPA fallback: ${indexPath}`);
  log.debug(`SRC_DIR path: ${CONFIG.SRC_DIR}`);
  log.debug(`File exists check: ${existsSync(indexPath)}`);
  if (existsSync(indexPath)) {
    log.debug(`Serving SPA fallback: ${indexPath}`);
    return serveHTML(indexPath);
  }

  // If not found in src, try public directory
  const publicIndexPath = join(CONFIG.PUBLIC_DIR, 'index.html');
  log.debug(`Looking for public fallback: ${publicIndexPath}`);
  log.debug(`PUBLIC_DIR path: ${CONFIG.PUBLIC_DIR}`);
  log.debug(`Public file exists check: ${existsSync(publicIndexPath)}`);
  if (existsSync(publicIndexPath)) {
    log.debug(`Serving public fallback: ${publicIndexPath}`);
    return serveHTML(publicIndexPath);
  }

  log.warn(`File not found: ${pathname}`);
  return new Response('Not found', { status: 404 });
}

// Main request handler
async function handleRequest(request: Request) {
  const url = new URL(request.url);
  const pathname = url.pathname;

  // Simple test response
  if (pathname === '/test') {
    return new Response('Server is working!', { status: 200 });
  }

  log.debug(`Main request handler: ${request.method} ${pathname}`);

  // Handle CORS preflight requests
  if (request.method === 'OPTIONS' && CONFIG.ENABLE_CORS) {
    return new Response(null, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers':
          'Content-Type, Authorization, X-Requested-With',
        'Access-Control-Max-Age': '86400',
      },
    });
  }

  // Handle HMR WebSocket connection
  // Note: HMR WebSocket is handled by the separate HMR server on HMR_PORT
  // This is just a fallback for when the HMR server is not running
  if (pathname === '/hmr' && request.headers.get('upgrade') === 'websocket') {
    log.warn(
      '[HMR] WebSocket upgrade attempted on main server, but HMR server should handle this',
    );
    return new Response('HMR WebSocket should be handled by HMR server', {
      status: 503,
    });
  }

  // Handle API proxy
  if (pathname.startsWith('/api/') && CONFIG.ENABLE_PROXY) {
    return await handleAPIProxy(request, pathname, url);
  }

  // Handle static files and SPA routing
  return handleSPARouting(request, pathname);
}

// HMR WebSocket server
function startHMRServer() {
  if (!CONFIG.ENABLE_HMR) return;

  try {
    const bun = Bun;
    const bunTyped = bun as any;
    bunTyped.serve({
      port: CONFIG.HMR_PORT,
      hostname: CONFIG.HMR_HOST,
      fetch: handleRequest,
      websocket: {
        open(ws: any) {
          hmrClients.add(ws as WebSocket);
          log.info('[HMR] WebSocket client connected');
        },
        message() {
          // Handle incoming messages if needed
        },
        close(ws: any) {
          hmrClients.delete(ws as WebSocket);
          log.info('[HMR] WebSocket client disconnected');
        },
        error(error: any) {
          log.error('[HMR] WebSocket server error:', error);
        },
      },
    });

    log.info(
      `🔄 HMR WebSocket server running on ws://${CONFIG.HMR_HOST}:${CONFIG.HMR_PORT}`,
    );
  } catch (error) {
    log.error('Failed to start HMR WebSocket server:', error);
  }
}

// Start the development server
async function startServer() {
  log.info('🚀 Starting Standalone Bun Development Server...');
  log.info(`📍 Server: http://${CONFIG.HOST}:${CONFIG.PORT}`);
  log.info(`🔄 HMR: ws://${CONFIG.HMR_HOST}:${CONFIG.HMR_PORT}`);
  log.info(`📁 Environment: ${CONFIG.NODE_ENV}`);
  log.info(`⚡ HMR Enabled: ${CONFIG.ENABLE_HMR}`);
  log.info(
    `🌐 External Access: ${CONFIG.HOST !== 'localhost' && CONFIG.HOST !== '127.0.0.1'}`,
  );
  log.info(`🔒 CORS Enabled: ${CONFIG.ENABLE_CORS}`);
  log.info(
    `🔗 API Proxy: ${CONFIG.ENABLE_PROXY ? CONFIG.API_BASE_URL : 'Disabled'}`,
  );

  // Start HMR WebSocket server
  startHMRServer();

  // Setup file watcher
  setupFileWatcher();

  // Start main HTTP server
  log.info('Starting HTTP server...');
  const server = serve({
    port: CONFIG.PORT,
    hostname: CONFIG.HOST,
    fetch: handleRequest,
  });
  log.info('HTTP server started successfully');

  log.info(
    `✅ Development server running on http://${CONFIG.HOST}:${CONFIG.PORT}`,
  );
  log.info('📋 Available at:');
  log.info(`   - Local: http://localhost:${CONFIG.PORT}`);
  if (CONFIG.HOST !== 'localhost' && CONFIG.HOST !== '127.0.0.1') {
    log.info(`   - Network: http://${CONFIG.HOST}:${CONFIG.PORT}`);
  }

  // Graceful shutdown
  process.on('SIGINT', () => {
    log.info('\n🛑 Shutting down development server...');

    if (fileWatcher) {
      fileWatcher.close();
      log.info('📁 File watcher stopped');
    }

    server.stop();
    log.info('✅ HTTP server stopped');

    process.exit(0);
  });

  // Handle uncaught errors
  process.on('uncaughtException', (error) => {
    log.error('Uncaught Exception:', error);
    process.exit(1);
  });

  process.on('unhandledRejection', (reason, promise) => {
    log.error('Unhandled Promise Rejection at:', promise, 'reason:', reason);
  });
}

// Health check endpoint
function createHealthCheck() {
  const healthPort = CONFIG.PORT + 100; // Use a different port to avoid conflicts

  serve({
    port: healthPort,
    hostname: CONFIG.HOST,
    fetch: () =>
      new Response(
        JSON.stringify({
          status: 'ok',
          timestamp: Date.now(),
          config: {
            port: CONFIG.PORT,
            host: CONFIG.HOST,
            hmr: CONFIG.ENABLE_HMR,
            cors: CONFIG.ENABLE_CORS,
            proxy: CONFIG.ENABLE_PROXY,
          },
        }),
        {
          headers: { 'Content-Type': 'application/json' },
        },
      ),
  });

  log.info(`🏥 Health check available at http://${CONFIG.HOST}:${healthPort}`);
}

// Start the server
try {
  createHealthCheck();
  startServer();
} catch (error) {
  log.error('Failed to start development server:', error);
  process.exit(1);
}
