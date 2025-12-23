import { serve } from 'bun';
import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const SRC_DIR = join(__dirname, '..');

console.log('Starting simple server...');
console.log('SRC_DIR:', SRC_DIR);

const server = serve({
  port: 3002,
  fetch(request) {
    const url = new URL(request.url);
    const pathname = url.pathname;

    console.log('Request:', pathname);

    if (pathname === '/') {
      const indexPath = join(SRC_DIR, 'index.html');
      console.log('Looking for:', indexPath);
      console.log('File exists:', existsSync(indexPath));

      if (existsSync(indexPath)) {
        const content = readFileSync(indexPath, 'utf-8');
        return new Response(content, {
          headers: { 'Content-Type': 'text/html' },
        });
      } else {
        return new Response('Index file not found', { status: 404 });
      }
    }

    return new Response('Not found', { status: 404 });
  },
});

console.log('Simple server running on http://localhost:3002');
