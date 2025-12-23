import { serve } from 'bun';

console.log('Starting test server...');

const server = serve({
  port: 3001,
  fetch(request) {
    console.log('Request received:', request.method, request.url);
    return new Response('Hello from test server!', {
      headers: { 'Content-Type': 'text/plain' },
    });
  },
});

console.log('Test server running on http://localhost:3001');
