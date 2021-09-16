module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: 2019,
    sourceType: 'module',
  },
  env: {
    commonjs: true,
    browser: true,
    node: true,
    es6: true,
  },
  plugins: ['svelte3', '@typescript-eslint'],
  extends: ['eslint:recommended', 'prettier'],
  overrides: [
    {
      files: ['*.svelte'],
      processor: 'svelte3/svelte3',
    },
    {
      files: ['**/*.ts', '**/*.svelte'],
      parser: '@typescript-eslint/parser',
      extends: [
        'plugin:@typescript-eslint/recommended',
      ],
    },
  ],
  rules: {
    // ...
  },
  settings: {
    // ...
  },
}
