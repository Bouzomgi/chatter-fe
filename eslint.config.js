import path from 'node:path'
import baseFrontend from '@bouzomgi/eslint-config-base/frontend'
import tseslint from 'typescript-eslint'

export default [
  {
    files: ['**/*.js', '**/*.ts', '**/*.tsx'],
    ignores: [
      '.eslintrc.js',
      'eslint.config.js',
      'build',
      'coverage',
      'public',
      '*.html'
    ],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: './tsconfig.eslint.json',
        tsconfigRootDir: path.resolve()
      },
      globals: {
        window: 'readonly',
        document: 'readonly'
      }
    }
  },
  ...baseFrontend
]
