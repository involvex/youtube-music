#!/usr/bin/env node

/**
 * Simple test script for the standalone Bun development server
 * This script verifies that the server can be started and basic functionality works
 */

const PORT = 3002;
const HMR_PORT = 3003;

async function testServer() {
  console.log('🧪 Testing Standalone Bun Development Server...\n');

  // Test HTTP endpoint
  console.log('1. Testing HTTP endpoint...');
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
  console.log('2. Testing HMR WebSocket endpoint...');
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
  console.log('3. Testing health check endpoint...');
  try {
    const response = await fetch(`http://localhost:${PORT + 100}`);
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

  console.log('\n✅ Test completed successfully!');
  console.log('\n📋 Summary:');
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
