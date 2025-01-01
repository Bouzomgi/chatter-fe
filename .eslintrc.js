module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'react-app',
    'react-app/jest',
    'prettier'
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json',
    tsconfigRootDir: __dirname
  },
  ignorePatterns: ['.eslintrc.js', 'build', 'coverage', 'public'],
  rules: {
    /* PROBLEMS */
    'array-callback-return': 2,
    'no-await-in-loop': 2,
    'no-duplicate-imports': 2,
    'no-self-compare': 2,
    'no-template-curly-in-string': 2,
    'no-unmodified-loop-condition': 2,
    'no-unreachable-loop': 2,

    /* STYLE */
    'arrow-body-style': [2, 'as-needed'],
    'camelcase': 2,
    'consistent-return': 2,
    'func-style': [2, 'declaration', { allowArrowFunctions: true }],
    'max-lines': 1,
    'no-array-constructor': 2,
    'no-console': 1,
    'no-eval': 2,
    'no-lonely-if': 2,
    'no-magic-numbers': 1,
    'no-return-await': 2,
    'no-useless-return': 2,
    'no-var': 2,
    'prefer-arrow-callback': 2,
    'prefer-const': 2,
    'require-await': 2,
    'spaced-comment': [2, 'always', { markers: ['/'] }],

    /* STANDARD-WITH-TYPESCRIPT */
    '@typescript-eslint/no-require-imports': 2,
    '@typescript-eslint/no-unused-vars': 1,
    '@typescript-eslint/ban-ts-comment': 0,

    /* REACT */
    'react/boolean-prop-naming': 2,
    'react/destructuring-assignment': [
      2,
      'always',
      { destructureInSignature: 'always' }
    ],
    'react/forbid-prop-types': 2,
    'react/hook-use-state': 2,
    'react/jsx-boolean-value': [2, 'always'],
    'react/jsx-closing-bracket-location': 2,
    'react/jsx-closing-tag-location': 2,
    'react/jsx-curly-brace-presence': [2, 'never'],
    'react/jsx-curly-spacing': [2, { when: 'never' }],
    'react/jsx-equals-spacing': [2, 'never'],
    'react/jsx-fragments': 2,
    'react/jsx-handler-names': 2,
    'react/jsx-indent-props': [2, 2],
    'react/jsx-indent': 0,
    'react/jsx-no-constructed-context-values': 1,
    'react/jsx-no-script-url': 2,
    'react/jsx-no-useless-fragment': 2,
    'react/jsx-pascal-case': 2,
    'react/jsx-props-no-multi-spaces': 2,
    'react/jsx-tag-spacing': 2,
    'react/no-danger': 2,
    'react/no-did-mount-set-state': 2,
    'react/no-did-update-set-state': 2,
    'react/no-namespace': 2,
    'react/no-this-in-sfc': 2,
    'react/no-typos': 2,
    'react/no-unused-class-component-methods': 2,
    'react/no-unused-prop-types': 2,
    'react/no-unused-state': 1,
    'react/no-will-update-set-state': 2,
    'react/prefer-es6-class': 2,
    'react/prefer-exact-props': 2,
    'react/prefer-read-only-props': 2,
    'react/prefer-stateless-function': 2,
    'react/react-in-jsx-scope': 0,

    /* REACT-HOOKS */
    'react-hooks/rules-of-hooks': 'error', // Checks rules of Hooks
    'react-hooks/exhaustive-deps': 'warn' // Checks effect dependencies
  },
  plugins: ['prettier']
}
