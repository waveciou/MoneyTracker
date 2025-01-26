module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  extends: ['@nuxt/eslint-config', 'plugin:nuxt/recommended', 'prettier'],
  rules: {
    indent: ['off'],
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
    'vue/multi-word-component-names': ['off'],
    'linebreak-style': ['off', 'unix'],
    'no-unused-vars': ['off'],
    'no-undef': ['off'],
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
  },
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 'latest',
  },
  plugins: ['simple-import-sort'],
};
