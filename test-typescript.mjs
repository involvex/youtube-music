#!/usr/bin/env node
// Test script to verify TypeScript compilation works after fixes

import { execSync } from 'child_process';
import { existsSync } from 'fs';

console.log('Testing TypeScript compilation after fixes...\n');

// Check if our type declaration files exist
console.log('1. Checking if type declaration files exist:');
console.log(`   - MDUI types: ${existsSync('src/mdui.d.ts') ? '✓' : '✗'}`);
console.log(
  `   - electron-is types: ${existsSync('src/electron-is.d.ts') ? '✓' : '✗'}`,
);

console.log('\n2. Testing TypeScript compilation...');
try {
  // Run TypeScript compiler
  execSync('pnpm typecheck', { stdio: 'inherit' });
  console.log('   ✓ TypeScript compilation successful!');
} catch {
  console.log('   ✗ TypeScript compilation failed');
  console.log('   Error details: See output above');
  process.exit(1);
}

console.log('\n3. Testing specific problematic files...');
const problematicFiles = [
  'src/plugins/navigation/index.tsx',
  'src/plugins/synced-lyrics/renderer/components/LyricsPicker.tsx',
];

for (const file of problematicFiles) {
  try {
    execSync(`pnpm tsc --noEmit --skipLibCheck ${file}`, { stdio: 'pipe' });
    console.log(`   ✓ ${file} compiles without errors`);
  } catch {
    console.log(`   ✗ ${file} still has errors`);
  }
}

console.log('\n4. Testing vite plugin compilation...');
try {
  execSync(
    'pnpm tsc --noEmit --skipLibCheck vite-plugins/plugin-importer.mts',
    { stdio: 'pipe' },
  );
  console.log('   ✓ vite plugin compiles without errors');
} catch {
  console.log('   ✗ vite plugin still has errors');
  console.log('   Error details: See output above');
}

console.log('\nTest completed!');
