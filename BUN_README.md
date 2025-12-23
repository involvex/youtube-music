# Bun Configuration for YouTube Music Frontend

This directory contains a comprehensive Bun configuration that enables a modern frontend development server with HMR, file watching, and asset optimization - designed to run natively without Electron dependencies.

## 🚀 Quick Start

### Prerequisites

- Bun installed (https://bun.sh)
- Node.js 18+ (for Bun compatibility)

### Installation

1. Install Bun dependencies:

```bash
bun install
```

2. Start the development server:

```bash
bun run bun:dev
```

3. Open your browser and navigate to:

```
http://localhost:3000
```

## 📁 Configuration Files

### Core Configuration

- **`bunfig.toml`** - Main Bun configuration with development and production settings
- **`tsconfig.bun.json`** - TypeScript configuration optimized for Bun runtime
- **`postcss.config.js`** - CSS processing and optimization configuration

### Development Server

- **`src/dev-server.ts`** - Standalone development server with HMR support
- **`bun-plugins/solid.config.js`** - SolidJS-specific configuration

### Environment Configuration

- **`.env.development`** - Development environment variables
- **`.env.production`** - Production environment variables
- **`.env.example`** - Template for environment variables

## 🛠️ Available Scripts

### Development

```bash
# Start development server with HMR
bun run bun:dev

# Start frontend-only development server
bun run bun:dev:frontend

# Start development server with custom entry
bun dev --entry src/index.html
```

### Build

```bash
# Build for production
bun run bun:build

# Build frontend only
bun run bun:build:frontend

# Build with custom entry and output
bun build --entry src/index.html --outdir dist/frontend
```

### Server

```bash
# Start production server
bun run bun:start

# Preview built files
bun run bun:preview
```

### Utilities

```bash
# Clean build artifacts
bun run bun:clean

# Format code
bun run bun:format

# Run linting
bun run bun:lint

# Run tests
bun run bun:test
```

## ⚙️ Configuration Features

### Development Server

- **Hot Module Replacement (HMR)** - Real-time updates without page refresh
- **File Watching** - Automatic rebuilds on file changes
- **WebSocket Support** - For HMR communication
- **CORS Support** - Cross-origin resource sharing
- **Static File Serving** - Serve assets and public files
- **API Proxy** - Proxy API requests to backend

### Build Optimization

- **Code Splitting** - Split bundles for better performance
- **Tree Shaking** - Remove unused code
- **Minification** - Compress JavaScript and CSS
- **Asset Optimization** - Optimize images and fonts
- **Source Maps** - Debug production builds
- **Bundle Analysis** - Analyze bundle size

### TypeScript Support

- **Path Resolution** - Clean import paths with aliases
- **Type Checking** - Full TypeScript compilation
- **Declaration Files** - Generate .d.ts files
- **Source Maps** - Debug TypeScript in browser

### SolidJS Integration

- **JSX Transformation** - SolidJS-specific JSX handling
- **Component Optimization** - Optimize SolidJS components
- **HMR Support** - Hot reload for SolidJS components
- **Development Tools** - SolidJS dev tools integration

## 🔧 Environment Variables

### Development

```bash
NODE_ENV=development
BUN_ENV=development
DEV_SERVER_PORT=3000
HMR_PORT=3001
ENABLE_HMR=true
ENABLE_PROXY=true
```

### Production

```bash
NODE_ENV=production
BUN_ENV=production
ENABLE_HMR=false
MINIFY=true
SPLITTING=true
TREE_SHAKING=true
```

## 📦 Dependencies

### Required for Bun

```json
{
  "devDependencies": {
    "@types/node": "^20.0.0",
    "typescript": "^5.0.0"
  }
}
```

### Optional for Enhanced Features

```json
{
  "devDependencies": {
    "autoprefixer": "^10.4.0",
    "cssnano": "^6.0.0",
    "postcss": "^8.4.0"
  }
}
```

## 🎯 Browser Compatibility

- **Modern Browsers** - ES2020+ support required
- **Web APIs** - Full web API compatibility
- **No Node.js APIs** - Pure frontend code only
- **ES Modules** - Native ES module support

## 🔒 Security Features

- **Content Security Policy (CSP)** - Production CSP headers
- **CORS Configuration** - Cross-origin resource sharing
- **HTTPS Support** - Optional HTTPS in production
- **Security Headers** - Production security headers

## 📊 Performance Monitoring

- **Bundle Size Limits** - Enforce bundle size constraints
- **Chunk Size Limits** - Optimize chunk sizes
- **Asset Size Limits** - Monitor asset sizes
- **Performance Hints** - Build performance suggestions

## 🐛 Troubleshooting

### Common Issues

1. **HMR not working**
   - Check WebSocket connection on port 3001
   - Verify `ENABLE_HMR=true` in environment
   - Check browser console for errors

2. **TypeScript errors**
   - Ensure `tsconfig.bun.json` is properly configured
   - Check path resolution in `bunfig.toml`
   - Verify TypeScript version compatibility

3. **Build failures**
   - Check bundle size limits in configuration
   - Verify asset paths and imports
   - Check for circular dependencies

4. **SolidJS issues**
   - Ensure JSX is properly configured
   - Check SolidJS version compatibility
   - Verify component imports

### Debug Mode

```bash
# Enable debug logging
ENABLE_DEBUG=true bun run bun:dev

# Enable inspector
ENABLE_INSPECTOR=true bun run bun:dev
```

## 🔄 Migration from Electron-Vite

### Step 1: Install Bun

```bash
npm install -g bun
bun install
```

### Step 2: Start Bun Development

```bash
bun run bun:dev
```

### Step 3: Test Functionality

- Verify HMR works
- Check TypeScript compilation
- Test asset loading
- Validate SolidJS components

### Step 4: Build for Production

```bash
bun run bun:build
```

## 📚 Additional Resources

- [Bun Documentation](https://bun.sh/docs)
- [SolidJS Documentation](https://solidjs.com/)
- [TypeScript with Bun](https://bun.sh/docs/typescript)
- [PostCSS Configuration](https://postcss.org/)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This configuration is licensed under the MIT License.
