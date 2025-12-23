# Standalone Bun Development Server

This document describes the standalone Bun development server for YouTube Music Frontend, which provides a comprehensive development environment independent of Electron.

## Overview

The standalone Bun development server (`src/dev-server.ts`) replaces the previous pnpm script-based setup with a proper `Bun.serve` implementation that provides:

- **Hot Module Replacement (HMR)** with WebSocket support
- **File watching** with `Bun.watch` for automatic reloading
- **SPA routing** with fallback to `index.html`
- **External access** support for development from other devices/networks
- **CORS configuration** for cross-origin requests
- **Environment variable** configuration
- **Static asset serving** with proper MIME types
- **Integration** with existing Vite build system

## Features

### 🔥 Hot Module Replacement (HMR)

- WebSocket-based real-time updates
- CSS hot reloading without page refresh
- JavaScript/HTML changes trigger page reload
- Automatic reconnection on connection loss
- Debounced file change detection

### 📁 File Watching

- Uses `Bun.watch` for efficient file monitoring
- Watches source files (`src/`, `assets/`, etc.)
- Ignores build directories and node_modules
- Smart file type detection for HMR triggers

### 🌐 External Access

- Default host: `0.0.0.0` (accessible from other devices)
- Configurable port and host settings
- Network discovery for development teams
- CORS support for cross-origin requests

### 🛠️ Development Tools

- Environment variable injection into frontend
- Health check endpoint for monitoring
- Comprehensive logging with configurable levels
- Graceful shutdown handling
- Error handling and recovery

## Configuration

### Environment Variables

| Variable          | Default                     | Description                               |
| ----------------- | --------------------------- | ----------------------------------------- |
| `DEV_SERVER_PORT` | `3000`                      | Development server port                   |
| `DEV_SERVER_HOST` | `0.0.0.0`                   | Development server host (external access) |
| `HMR_PORT`        | `3001`                      | HMR WebSocket port                        |
| `HMR_HOST`        | Same as `DEV_SERVER_HOST`   | HMR WebSocket host                        |
| `ENABLE_HMR`      | `true`                      | Enable/disable hot module replacement     |
| `ENABLE_CORS`     | `true`                      | Enable/disable CORS headers               |
| `ENABLE_PROXY`    | `true`                      | Enable/disable API proxy                  |
| `API_BASE_URL`    | `https://music.youtube.com` | API proxy target                          |
| `LOG_LEVEL`       | `info`                      | Logging level (info/debug)                |
| `NODE_ENV`        | `development`               | Node environment                          |
| `BUN_ENV`         | `development`               | Bun environment                           |

### Usage Examples

```bash
# Start with default settings
pnpm dev:standalone

# Start with file watching
pnpm dev:standalone:watch

# Start with HMR enabled (default)
pnpm dev:standalone:hmr

# Start on custom port
DEV_SERVER_PORT=8080 pnpm dev:standalone

# Start with external access disabled
DEV_SERVER_HOST=localhost pnpm dev:standalone

# Start with HMR disabled
ENABLE_HMR=false pnpm dev:standalone

# Start with debug logging
LOG_LEVEL=debug pnpm dev:standalone
```

## Architecture

### Server Components

```
┌─────────────────────────────────────────┐
│           Bun Development Server         │
├─────────────────┬───────────────────────┤
│   HTTP Server   │   WebSocket Server    │
│   (Port 3000)   │   (Port 3001)         │
├─────────────────┼───────────────────────┤
│ Static File     │ HMR Client Management │
│ Serving         │                       │
├─────────────────┼───────────────────────┤
│ SPA Routing     │ File Change Detection │
│ (Fallback)      │                       │
├─────────────────┼───────────────────────┤
│ CORS Support    │ Environment Injection │
└─────────────────┴───────────────────────┘
```

### File Structure

```
src/
├── dev-server.ts          # Main development server
├── index.html            # SPA entry point
├── renderer.ts           # Main renderer (loaded by SPA)
└── [other source files]  # Watched for changes

assets/                   # Static assets
public/                   # Public files
dist/                     # Build output
```

## Development Workflow

### 1. Start the Server

```bash
pnpm dev:standalone
```

### 2. Access the Application

- Local: `http://localhost:3000`
- Network: `http://[your-ip]:3000` (if external access enabled)

### 3. Development Features

- **Auto-reload**: Changes to source files trigger updates
- **CSS Hot Reload**: CSS changes apply without page refresh
- **Environment Variables**: Available in frontend via `window.__ENV__`
- **Health Check**: Monitor server status at `http://localhost:3001`

### 4. HMR Client

The server injects an HMR client script that:

- Connects to WebSocket server
- Listens for file change events
- Applies CSS updates in real-time
- Reloads page for JS/HTML changes

## Integration with Existing Build System

### Vite Compatibility

The standalone server maintains compatibility with the existing Vite configuration:

- **Build Process**: Unchanged - still uses `pnpm build`
- **Electron Development**: Unchanged - still uses `pnpm dev`
- **Asset Processing**: Handled by existing Vite plugins
- **TypeScript**: Uses existing tsconfig configurations

### Electron vs. Standalone

| Feature         | Electron Development | Standalone Server   |
| --------------- | -------------------- | ------------------- |
| Runtime         | Electron             | Bun                 |
| Port            | Dynamic              | 3000 (configurable) |
| HMR             | Vite                 | Custom WebSocket    |
| External Access | Limited              | Full support        |
| Performance     | Slower               | Faster              |
| Dependencies    | Electron required    | Bun only            |

## Troubleshooting

### Common Issues

#### Port Already in Use

```bash
# Check what's using the port
lsof -i :3000

# Use different port
DEV_SERVER_PORT=8080 pnpm dev:standalone
```

#### HMR Not Working

```bash
# Enable debug logging
LOG_LEVEL=debug pnpm dev:standalone

# Check WebSocket connection in browser console
# Look for HMR client connection messages
```

#### CORS Issues

```bash
# Enable CORS (default)
ENABLE_CORS=true pnpm dev:standalone

# Check browser console for CORS errors
```

#### File Watching Not Working

```bash
# Check file watcher status in logs
# Ensure files are in watched directories
# Check ignored patterns in configuration
```

### Debug Mode

Enable debug logging to troubleshoot issues:

```bash
LOG_LEVEL=debug pnpm dev:standalone
```

This provides detailed information about:

- File changes detected
- HMR message broadcasting
- WebSocket connections
- Request handling

## Performance

### Optimization Features

- **Debounced File Changes**: Prevents excessive HMR triggers
- **Efficient File Watching**: Uses Bun's native file watching
- **Caching Headers**: Proper cache control for development
- **Compression**: Enabled for faster asset delivery

### Resource Usage

- **Memory**: Lower than Electron development
- **CPU**: Efficient file watching and serving
- **Network**: Optimized for development workflows

## Security

### Development-Only Features

- **CORS**: Enabled for development flexibility
- **External Access**: Configurable for team development
- **Error Details**: Full error information in development

### Production Considerations

This server is designed for development only. For production:

- Use the existing Electron build process
- Deploy with proper security configurations
- Disable development features (HMR, external access, etc.)

## Contributing

### Adding Features

1. Update the server configuration in `src/dev-server.ts`
2. Add new environment variables as needed
3. Update this documentation
4. Test with various configurations

### Bug Reports

Include the following information:

- Bun version
- Operating system
- Environment variables used
- Error messages and logs
- Steps to reproduce

## Future Enhancements

Planned features for future versions:

- [ ] Selective JavaScript hot reloading
- [ ] Asset optimization and compression
- [ ] Development proxy configuration
- [ ] Plugin system for development tools
- [ ] Performance monitoring and metrics
- [ ] Integration with development tools (VS Code, etc.)

## Support

For issues and questions:

1. Check the troubleshooting section
2. Enable debug logging
3. Review the logs for error details
4. Create an issue with reproduction steps
