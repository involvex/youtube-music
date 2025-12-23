// SolidJS Plugin Configuration for Bun
module.exports = {
  // SolidJS compilation options
  options: {
    // Generate mode: 'dom' for browser, 'ssr' for server-side rendering
    generate: 'dom',

    // Hydration settings
    hydratable: false,

    // SSR settings
    ssr: false,

    // Development mode optimizations
    dev: process.env.NODE_ENV === 'development',

    // Source map generation
    sourceMap: process.env.NODE_ENV === 'development',

    // Fragment wrapper
    fragment: 'div',

    // Event delegation
    delegateEvents: true,

    // Context to prop optimization
    contextToCustomElements: false,

    // Built-in component names
    builtIns: {
      For: 'For',
      Show: 'Show',
      Switch: 'Switch',
      Match: 'Match',
      Suspense: 'Suspense',
      SuspenseList: 'SuspenseList',
      Portal: 'Portal',
      Index: 'Index',
      ErrorBoundary: 'ErrorBoundary',
    },
  },

  // Plugin hooks
  hooks: {
    // Before compilation
    beforeCompile: (code, filename) => {
      if (process.env.NODE_ENV === 'development') {
        console.log(`[SolidJS] Compiling: ${filename}`);
      }
      return code;
    },

    // After compilation
    afterCompile: (code, filename) => {
      if (process.env.NODE_ENV === 'development') {
        console.log(`[SolidJS] Compiled: ${filename}`);
      }
      return code;
    },
  },

  // Development server integration
  dev: {
    // HMR integration
    hmr: {
      enabled: process.env.ENABLE_HMR === 'true',
      port: process.env.HMR_PORT || 3001,
      host: process.env.HMR_HOST || 'localhost',
    },

    // Development tools
    devTools: {
      enabled: process.env.ENABLE_DEBUG === 'true',
      inspect: process.env.ENABLE_INSPECTOR === 'true',
    },
  },

  // Production optimizations
  production: {
    // Minification
    minify: process.env.MINIFY === 'true',

    // Tree shaking
    treeShake: process.env.TREE_SHAKING === 'true',

    // Dead code elimination
    deadCodeElimination: true,

    // Property access optimization
    propertyAccessOptimization: true,
  },
};
