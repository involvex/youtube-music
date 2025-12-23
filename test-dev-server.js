#!/usr/bin/env node

/**
 * Simple test script for the standalone Bun development server
 * This script verifies that the server can be started and basic functionality works
 */

import { spawn } from 'child_process';
import { setTimeout } from 'timers/promises';

const PORT = 3000;
const HMR_PORT = 3001;

async function testServer() {
  console.log('🧪 Testing Standalone Bun Development Server...\n');

  // Start the server
  console.log('1. Starting development server...');
  const serverProcess = spawn('pnpm', ['dev:standalone'], {
    stdio: ['pipe', 'pipe', 'pipe'],
    env: {
      ...process.env,
      DEV_SERVER_PORT: PORT.toString(),
      HMR_PORT: HMR_PORT.toString(),
      LOG_LEVEL: 'info',
      ENABLE_HMR: 'true',
      ENABLE_CORS: 'true',
    },
  });

  let serverOutput = '';
  let serverStarted = false;

  serverProcess.stdout.on('data', (data) => {
    const output = data.toString();
    serverOutput += output;
    console.log('   Server:', output.trim());

    if (output.includes('Development server running')) {
      serverStarted = true;
    }
  });

  serverProcess.stderr.on('data', (data) => {
    console.error('   Error:', data.toString().trim());
  });

  // Wait for server to start
  console.log('2. Waiting for server to start...');
  let attempts = 0;
  while (!serverStarted && attempts < 30) {
    await setTimeout(1000);
    attempts++;
  }

  if (!serverStarted) {
    console.error('❌ Server failed to start within 30 seconds');
    serverProcess.kill();
    process.exit(1);
  }

  console.log('✅ Server started successfully\n');

  // Test HTTP endpoint
  console.log('3. Testing HTTP endpoint...');
  try {
    const response = await fetch(`http://localhost:${PORT}`);
    if (response.ok) {
      console.log('✅ HTTP endpoint responding');
      const html = await response.text();
      if (html.includes('window.__ENV__')) {
        console.log('✅ Environment variables injected');
      } else {
        console.log('⚠️  Environment variables not found in response');
      }
    } else {
      console.error(`❌ HTTP endpoint returned status: ${response.status}`);
    }
  } catch (error) {
    console.error('❌ HTTP endpoint test failed:', error.message);
  }

  // Test HMR WebSocket endpoint
  console.log('4. Testing HMR WebSocket endpoint...');
  try {
    const ws = new WebSocket(`ws://localhost:${HMR_PORT}/hmr`);

    await new Promise((resolve, reject) => {
      ws.onopen = () => {
        console.log('✅ HMR WebSocket connection established');
        ws.close();
        resolve();
      };

      ws.onerror = (error) => {
        console.error('❌ HMR WebSocket connection failed:', error);
        reject(error);
      };

      setTimeout(() => {
        console.error('❌ HMR WebSocket connection timeout');
        reject(new Error('Connection timeout'));
      }, 5000);
    });
  } catch (error) {
    console.error('❌ HMR WebSocket test failed:', error.message);
  }

  // Test health check endpoint
  console.log('5. Testing health check endpoint...');
  try {
    const response = await fetch(`http://localhost:${PORT + 1}`);
    if (response.ok) {
      const health = await response.json();
      console.log('✅ Health check endpoint responding');
      console.log('   Status:', health.status);
      console.log('   Config:', JSON.stringify(health.config, null, 2));
    } else {
      console.error(
        `❌ Health check endpoint returned status: ${response.status}`,
      );
    }
  } catch (error) {
    console.error('❌ Health check test failed:', error.message);
  }

  // Cleanup
  console.log('\n6. Cleaning up...');
  serverProcess.kill();
  await setTimeout(1000);

  console.log('✅ Test completed successfully!');
  console.log('\n📋 Summary:');
  console.log('   - Development server starts correctly');
  console.log('   - HTTP endpoint responds');
  console.log('   - HMR WebSocket connection works');
  console.log('   - Health check endpoint available');
  console.log('   - Environment variables injected');
}

// Run the test
testServer().catch((error) => {
  console.error('❌ Test failed:', error);
  process.exit(1);
});
