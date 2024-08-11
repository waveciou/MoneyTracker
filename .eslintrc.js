module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  extends: [
    '@nuxtjs/eslint-config-typescript',
    'plugin:nuxt/recommended',
    'prettier',
  ],
  plugins: [],
  rules: {
    'vue/multi-word-component-names': ['off'],
    'linebreak-style': ['off', 'unix'],
    indent: ['off'],
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
    'no-unused-vars': ['off'],
    'no-undef': ['off'],
  },
};
