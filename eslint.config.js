const js = require('@eslint/js');
const tsParser = require('@typescript-eslint/parser');
const ts = require('@typescript-eslint/eslint-plugin');
const prettier = require('eslint-plugin-prettier');
const eslintConfigPrettier = require('eslint-config-prettier');
const n = require('eslint-plugin-n'); // Node.js plugin

/** ✅ Fix: Use `globalThis.process` to avoid `no-undef` */
const isDev = globalThis.process?.env?.NODE_ENV !== 'production';

module.exports = [
  {
    files: ['src/**/*.{js,ts}'], // ✅ Apply ESLint to `.js` and `.ts` files inside `src/`
    ignores: ['node_modules', 'dist', 'eslint.config.js'], // ✅ Ignore `node_modules` & `dist` & config files
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'commonjs', // ✅ Use CommonJS (`require()`)
      },
      globals: {
        process: 'readonly', // ✅ Allow `process.env`
        console: 'readonly',
        __dirname: 'readonly', // ✅ Allow `__dirname`
        require: 'readonly', // ✅ Allow `require()`
        module: 'readonly', // ✅ Allow `module`
      },
    },
    plugins: {
      '@typescript-eslint': ts,
    },
    rules: {
      // Disable `import` and enforce `require()`
      '@typescript-eslint/no-var-requires': 'off', // ✅ Allow `require()` in TypeScript
      '@typescript-eslint/no-require-imports': 'off', // ✅ Allow `require()` in TypeScript
      'import/no-import-module-exports': 'off', // ✅ Disable import module exports
      'import/no-unresolved': 'off', // ✅ Turn off unresolved import warnings

      // ✅ Enforce `require()` instead of `import`
      'no-import-assign': 'error', // Prevent assignments of `import` syntax
      'import/prefer-default-export': 'off', // Disable the preference for default exports

      // TypeScript-specific rules
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/no-unused-vars': ['warn'],
      '@typescript-eslint/explicit-module-boundary-types': 'off',

      // Default rules from TypeScript plugin
      ...ts.configs.recommended.rules,
    },
  },
  {
    files: ['src/**/*.{js,ts}'], // Apply Prettier to `.js` and `.ts` files inside `src/`
    plugins: {
      prettier,
      n,
    },
    rules: {
      'prettier/prettier': 'error',
      'no-console': isDev ? 'off' : 'warn', // Allow in dev, warn in prod
      'n/no-unsupported-features/es-syntax': 'off', // Disable unsupported feature warnings for Node.js
      ...eslintConfigPrettier.rules,
    },
  },
];
