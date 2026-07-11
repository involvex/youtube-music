# AGENTS.md - YouTube Music Involvex-Edition

This document provides instructions for AI coding agents working on this project.

## Project Overview

YouTube Music Involvex-Edition is a feature-rich desktop client for YouTube Music built with Electron, SolidJS, and TypeScript. It includes 40+ built-in plugins, extensive customization options, and cross-platform support (Windows, macOS, Linux).

## Technologies

### Core Stack

- **Runtime**: Electron 39.x, Bun (alternative runtime)
- **Frontend Framework**: SolidJS 1.9.x with JSX
- **Language**: TypeScript 5.9.x (strict mode)
- **Build Tool**: electron-vite 5.0.x (Vite-based)
- **Package Manager**: pnpm 10+ (primary), Bun (alternative)
- **UI Components**: mdui 2.1.x (Material Design components)
- **State Management**: SolidJS reactivity system

### Key Dependencies

- **youtubei.js** - YouTube Music API client
- **@ghostery/adblocker-electron** - Ad blocking
- **hono** - HTTP server framework
- **conf** / **electron-store** - Configuration management
- **i18next** - Internationalization (30+ languages)
- **solid-styled-components** - CSS-in-JS styling

### Dev Tools

- **ESLint** 9.x with TypeScript, Prettier, Solid, and Import plugins
- **Prettier** 3.x for code formatting
- **Playwright** 1.57.x for E2E testing
- **electron-builder** for distribution packaging

## Useful Commands

### Development

```bash
# Start development server (primary method)
pnpm dev

# Start with debug logging
pnpm dev:debug

# Start frontend only (renderer process)
pnpm dev:renderer

# Bun alternative (if using Bun runtime)
bun run bun:dev
```

### Code Quality

```bash
# Run ESLint
pnpm lint

# Fix ESLint issues
pnpm lint:fix

# Format code with Prettier
pnpm format

# Check formatting without modifying
pnpm format:check

# TypeScript type checking
pnpm typecheck
```

### Testing

```bash
# Run Playwright tests
pnpm test

# Run tests in debug mode
pnpm test:debug
```

### Building

```bash
# Full build (format + lint + typecheck + compile)
pnpm build

# Clean build artifacts
pnpm clean

# Create platform distributables
pnpm dist              # All platforms
pnpm dist:win          # Windows only
pnpm dist:mac          # macOS (Intel)
pnpm dist:mac:arm64    # macOS (Apple Silicon)
pnpm dist:linux        # Linux only
```

### Preview

```bash
# Preview production build
pnpm start

# Start with debug logging
pnpm start:debug
```

## Project Structure

```
youtube-music/
├── src/
│   ├── config/           # Configuration management
│   ├── i18n/             # Internationalization (translations in resources/)
│   ├── loader/           # Module loaders
│   ├── plugins/          # Core plugins (40+ built-in)
│   ├── providers/        # Data providers (songs, controls, app state)
│   ├── types/            # TypeScript type definitions
│   └── utils/            # Utility functions
├── assets/               # Static assets (icons, CSS)
├── docs/                 # Documentation (workspace)
├── web/                  # Web-specific files
├── tests/                # Playwright test files
└── vite-plugins/         # Custom Vite plugins
```

### Key Files

- `src/index.ts` - Main process entry point
- `src/preload.ts` - Electron preload script
- `src/renderer.ts` - Renderer process entry
- `electron.vite.config.mts` - Electron-vite configuration
- `electron-builder.yml` - Distribution builder config

## Best Practices and Guidelines

### TypeScript

- **Always use TypeScript** for new code - no plain JavaScript
- **Strict mode** is enabled - `noImplicitAny`, `strictFunctionTypes`, etc.
- **Use `type` imports** for type-only imports:
  ```typescript
  import type { PluginConfig } from './types';
  ```
- **Avoid `any`** - use proper types or `unknown` when necessary
- **Use path aliases**: `@/*` maps to `./src/*`, `@assets/*` maps to `./assets/*`

### Code Style

- **ESLint + Prettier** enforces consistent formatting
- **Single quotes** for strings
- **Semicolons** required
- **2-space indentation** (no tabs)
- **Trailing commas** in all contexts
- **Arrow functions** with parentheses: `(x) => x` not `x => x`
- **Object curly spacing**: `{ foo: bar }` not `{foo: bar}`

### Import Organization

Follow the ESLint import order rule:

1. Built-in modules
2. External packages
3. Internal modules (absolute paths)
4. Parent imports
5. Type imports (always last)

```typescript
import path from 'node:path';

import { BrowserWindow } from 'electron';
import type { PluginConfig } from '@/*/types';

import { PluginManager } from './plugin-manager';
```

### Component Patterns (SolidJS)

```typescript
// Use component functions with PascalCase naming
function MyComponent(props: MyComponentProps) {
  return (
    <div class="my-component">
      {props.children}
    </div>
  );
}

// Use solid-styled-components for styling
import styled from 'solid-styled-components';

const Container = styled('div')`
  display: flex;
  flex-direction: column;
`;
```

### Plugin Development

Plugins live in `src/plugins/` and follow a standard pattern:

1. **Single responsibility** - one plugin, one purpose
2. **Proper cleanup** - dispose resources when disabled
3. **Error handling** - graceful degradation, don't crash the app
4. **Performance** - avoid blocking the main thread
5. **Memory management** - clean up event listeners and intervals

```typescript
// Plugin structure example
export default {
  name: 'my-plugin',
  config: {
    enabled: false,
    // ... config schema
  },
  async setup({ config, providers }) {
    // Initialize plugin
    return {
      // Cleanup function
      dispose() {
        // Clean up resources
      }
    };
  }
} satisfies PluginConfig;
```

### Git Workflow

- **Branch naming**: `feature/`, `fix/`, `hotfix/` prefixes
- **Commits**: Use [Conventional Commits](https://www.conventionalcommits.org/):
  ```
  feat(plugins): add new audio compressor plugin
  fix(i18n): correct German translation for "pause"
  docs(readme): update installation instructions
  ```
- **Types**: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

### Testing

- Use **Playwright** for E2E tests
- Place test files in `tests/` directory
- Run `pnpm test` before submitting PRs
- Write descriptive test names

### Common Pitfalls

1. **Electron security** - Never use `nodeIntegration: true` without proper context isolation
2. **Main vs Renderer** - Keep Electron main process code separate from renderer
3. **Plugin conflicts** - Test with multiple plugins enabled
4. **Cross-platform** - Use `electron-is` for platform-specific code:
   ```typescript
   import electronIs from 'electron-is';
   if (electronIs.windows()) { /* Windows-specific */ }
   ```
5. **i18n** - Always use translation keys, never hardcode user-facing strings

## Environment Variables

```bash
# Development
NODE_ENV=development
ELECTRON_ENABLE_LOGGING=1
ENABLE_HMR=true

# Production
NODE_ENV=production
```

## Additional Resources

- [CONTRIBUTING.md](CONTRIBUTING.md) - Detailed contribution guidelines
- [BUN_README.md](BUN_README.md) - Bun-specific configuration
- [changelog.md](changelog.md) - Version history

## Quick Reference

| Task | Command |
|------|---------|
| Start dev server | `pnpm dev` |
| Lint code | `pnpm lint` |
| Format code | `pnpm format` |
| Type check | `pnpm typecheck` |
| Run tests | `pnpm test` |
| Build for production | `pnpm build` |
| Create Windows installer | `pnpm dist:win` |
