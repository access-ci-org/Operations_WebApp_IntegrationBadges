import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import jsxA11y from 'eslint-plugin-jsx-a11y';

export default [
  // Global Ignores
  { ignores: ['build'] },

  // Base ESLint and Recommended Configs
  js.configs.recommended,

  // Accessibility Flat Config (No spreading .rules needed)
  jsxA11y.flatConfigs.strict,

  // Your Core React Application Config
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      globals: {
        ...globals.browser,
        ...globals.es2020,
      },
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    // Explicitly configure React version for plugin safety
    settings: {
      react: {
        version: '19.0',
      },
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {

      ...reactHooks.configs.recommended.rules,

      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],

      // 'react-refresh/only-export-components': [
      //   'warn',
      //   { allowConstantExport: true },
      // ],

      // Disable validating useEffect dependencies.
      'react-hooks/exhaustive-deps': 'off'
    },
  },
]
