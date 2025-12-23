import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { defineConfig } from 'electron-vite';
import builtinModules from 'builtin-modules';

import solidPlugin from 'vite-plugin-solid';
import viteResolve from 'vite-plugin-resolve';

import { withFilter } from 'vite';

import { pluginVirtualModuleGenerator } from './vite-plugins/plugin-importer.mjs';
import pluginLoader from './vite-plugins/plugin-loader.mjs';
import { i18nImporter } from './vite-plugins/i18n-importer.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));

const resolveAlias = {
  '@': resolve(__dirname, './src'),
  '@assets': resolve(__dirname, './assets'),
};

export default defineConfig({
  main: {
    experimental: {
      enableNativePlugin: true,
    },
    plugins: [
      pluginLoader('backend'),
      viteResolve({
        'virtual:i18n': i18nImporter('main'),
        'virtual:plugins': pluginVirtualModuleGenerator('main'),
      }),
    ],
    publicDir: 'assets',
    define: {
      __dirname: 'import.meta.dirname',
      __filename: 'import.meta.filename',
    },
    build: {
      lib: {
        entry: 'src/index.ts',
        formats: ['es'],
      },
      outDir: 'dist/main',
      rolldownOptions: {
        external: ['electron', 'custom-electron-prompt', ...builtinModules],
        input: './src/index.ts',
      },
      minify: true,
      cssMinify: true,
    },
    resolve: {
      alias: resolveAlias,
    },
  },
  preload: {
    experimental: {
      enableNativePlugin: true,
    },
    plugins: [
      pluginLoader('preload'),
      viteResolve({
        'virtual:i18n': i18nImporter('preload'),
        'virtual:plugins': pluginVirtualModuleGenerator('preload'),
      }),
    ],
    build: {
      lib: {
        entry: 'src/preload.ts',
        formats: ['cjs'],
      },
      outDir: 'dist/preload',
      commonjsOptions: {
        ignoreDynamicRequires: true,
      },
      rolldownOptions: {
        external: ['electron', 'custom-electron-prompt', ...builtinModules],
        input: './src/preload.ts',
      },
      minify: true,
      cssMinify: true,
    },
    resolve: {
      alias: resolveAlias,
    },
  },
  renderer: {
    experimental: {
      enableNativePlugin: true,
    },
    plugins: [
      pluginLoader('renderer'),
      viteResolve({
        'virtual:i18n': i18nImporter('renderer'),
        'virtual:plugins': pluginVirtualModuleGenerator('renderer'),
      }),
      withFilter(solidPlugin(), {
        load: { id: [/\.(tsx|jsx)$/, '/@solid-refresh'] },
      }),
    ],
    root: './src/',
    build: {
      lib: {
        entry: 'src/index.html',
        formats: ['iife'],
        name: 'renderer',
      },
      outDir: 'dist/renderer',
      rolldownOptions: {
        external: ['electron', ...builtinModules],
        input: './src/index.html',
      },
      minify: true,
      cssMinify: true,
    },
    resolve: {
      alias: {
        ...resolveAlias,
        'zlibjs/bin/gunzip.min.js': resolve(__dirname, './src/zlib-shim.ts'),
      },
    },
    server: {
      cors: {
        origin: 'https://music.\u0079\u006f\u0075\u0074\u0075\u0062\u0065.com',
      },
    },
  },
});
