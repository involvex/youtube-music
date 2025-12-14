//@ts-check

import eslint from '@eslint/js';
import prettier from 'eslint-plugin-prettier/recommended';
import solid from 'eslint-plugin-solid/configs/recommended';
import stylistic from '@stylistic/eslint-plugin';
import tsEslint from 'typescript-eslint';

import * as importPlugin from 'eslint-plugin-import';

export default tsEslint.config(
  eslint.configs.recommended,
  tsEslint.configs.eslintRecommended,
  prettier,
  solid,
  {
    ignores: [
      'dist',
      'node_modules',
      '*.config.*js',
      'src/plugins/**',
      '.vite-inspect/**',
      'vite-plugins/**',
    ],
  },
  // TypeScript configuration for .ts, .tsx, .mts files
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.mts'],
    plugins: {
      stylistic,
      importPlugin,
      '@typescript-eslint': tsEslint.plugin,
    },
    languageOptions: {
      parser: tsEslint.parser,
      parserOptions: {
        project: ['tsconfig.json', 'tsconfig.tests.json'],
        sourceType: 'module',
        ecmaVersion: 'latest',
      },
    },
    rules: {
      'stylistic/arrow-parens': ['error', 'always'],
      'stylistic/object-curly-spacing': ['error', 'always'],
      'stylistic/jsx-pascal-case': 'error',
      'stylistic/jsx-curly-spacing': [
        'error',
        { when: 'never', children: true },
      ],
      'stylistic/jsx-sort-props': 'error',
      'prettier/prettier': [
        'error',
        {
          singleQuote: true,
          semi: true,
          tabWidth: 2,
          trailingComma: 'all',
          quoteProps: 'preserve',
        },
      ],
      '@typescript-eslint/no-floating-promises': 'off',
      '@typescript-eslint/no-misused-promises': [
        'off',
        { checksVoidReturn: false },
      ],
      '@typescript-eslint/no-unused-vars': ['off', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/consistent-type-imports': [
        'error',
        {
          fixStyle: 'inline-type-imports',
          prefer: 'type-imports',
          disallowTypeAnnotations: false,
        },
      ],
      'importPlugin/first': 'error',
      'importPlugin/newline-after-import': 'off',
      'importPlugin/no-default-export': 'off',
      'importPlugin/no-duplicates': 'error',
      'importPlugin/no-unresolved': [
        'error',
        {
          ignore: ['^virtual:', '\\?inline$', '\\?raw$', '\\?asset&asarUnpack'],
        },
      ],
      'importPlugin/order': [
        'error',
        {
          'groups': [
            'builtin',
            'external',
            ['internal', 'index', 'sibling'],
            'parent',
            'type',
          ],
          'newlines-between': 'always-and-inside-groups',
          'alphabetize': { order: 'ignore', caseInsensitive: false },
        },
      ],
      'importPlugin/prefer-default-export': 'off',
      'camelcase': ['error', { properties: 'never' }],
      'class-methods-use-this': 'off',
      'stylistic/lines-around-comment': [
        'error',
        {
          beforeBlockComment: false,
          afterBlockComment: false,
          beforeLineComment: false,
          afterLineComment: false,
        },
      ],
      'stylistic/max-len': 'off',
      'stylistic/no-mixed-operators': 'off', // prettier does not support no-mixed-operators
      'stylistic/no-multi-spaces': ['error', { ignoreEOLComments: true }],
      'stylistic/no-tabs': 'error',
      'no-void': 'error',
      'no-empty': 'off',
      'prefer-promise-reject-errors': 'off',
      'stylistic/quotes': [
        'error',
        'single',
        {
          avoidEscape: true,
          allowTemplateLiterals: 'never',
        },
      ],
      'stylistic/quote-props': ['error', 'consistent'],
      'stylistic/semi': ['error', 'always'],
    },
    settings: {
      'import/parsers': {
        '@typescript-eslint/parser': ['.ts'],
      },
      'import/resolver': {
        typescript: {},
        exports: {},
      },
    },
  },
  // JavaScript configuration for .js files (without TypeScript project context)
  {
    files: ['**/*.js'],
    plugins: {
      stylistic,
      importPlugin,
    },
    languageOptions: {
      sourceType: 'module',
      ecmaVersion: 'latest',
    },
    rules: {
      'stylistic/quotes': [
        'error',
        'single',
        {
          avoidEscape: true,
          allowTemplateLiterals: 'never',
        },
      ],
      'stylistic/semi': ['error', 'always'],
      'importPlugin/first': 'error',
      'importPlugin/no-unresolved': [
        'error',
        {
          ignore: ['^virtual:', '\\?inline$', '\\?raw$', '\\?asset&asarUnpack'],
        },
      ],
    },
  },
  // JavaScript configuration for .mjs files (ES modules with Node.js globals)
  {
    files: ['**/*.mjs'],
    plugins: {
      stylistic,
      importPlugin,
    },
    languageOptions: {
      sourceType: 'module',
      ecmaVersion: 'latest',
      globals: {
        console: 'readonly',
        process: 'readonly',
        Buffer: 'readonly',
        __dirname: 'readonly',
        __filename: 'readonly',
        module: 'readonly',
        require: 'readonly',
        exports: 'readonly',
        global: 'readonly',
        setTimeout: 'readonly',
        setInterval: 'readonly',
        clearTimeout: 'readonly',
        clearInterval: 'readonly',
        queueMicrotask: 'readonly',
        fetch: 'readonly',
        URL: 'readonly',
        URLSearchParams: 'readonly',
        TextEncoder: 'readonly',
        TextDecoder: 'readonly',
        AbortController: 'readonly',
        AbortSignal: 'readonly',
        Event: 'readonly',
        EventTarget: 'readonly',
        Request: 'readonly',
        Response: 'readonly',
        Headers: 'readonly',
        FormData: 'readonly',
        Blob: 'readonly',
        File: 'readonly',
        FileReader: 'readonly',
        ArrayBuffer: 'readonly',
        DataView: 'readonly',
        Int8Array: 'readonly',
        Uint8Array: 'readonly',
        Uint8ClampedArray: 'readonly',
        Int16Array: 'readonly',
        Uint16Array: 'readonly',
        Int32Array: 'readonly',
        Uint32Array: 'readonly',
        Float32Array: 'readonly',
        Float64Array: 'readonly',
        BigInt64Array: 'readonly',
        BigUint64Array: 'readonly',
        Map: 'readonly',
        Set: 'readonly',
        WeakMap: 'readonly',
        WeakSet: 'readonly',
        Promise: 'readonly',
        Symbol: 'readonly',
        BigInt: 'readonly',
      },
    },
    rules: {
      'stylistic/quotes': [
        'error',
        'single',
        {
          avoidEscape: true,
          allowTemplateLiterals: 'never',
        },
      ],
      'stylistic/semi': ['error', 'always'],
      'importPlugin/first': 'error',
      'importPlugin/no-unresolved': [
        'error',
        {
          ignore: ['^virtual:', '\\?inline$', '\\?raw$', '\\?asset&asarUnpack'],
        },
      ],
    },
  },
  // Type definition files (.d.ts) - ignore unused vars as they are declarations
  {
    files: ['**/*.d.ts'],
    rules: {
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
    },
  },
  // Type definition files in src/types - ignore unused vars as they are interface definitions
  {
    files: ['src/types/**/*.ts'],
    rules: {
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
    },
  },
);
