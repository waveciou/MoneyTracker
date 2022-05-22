module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:vue/essential',
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'vue',
  ],
  rules: {
    indent: [
      'error',
      2,
    ],
    quotes: [
      'error',
      'single',
    ],
    semi: [
      'error',
      'always',
    ],
    'linebreak-style': [
      'off',
      'unix',
    ],
    'no-unused-vars': ['off'],
    'no-plusplus': ['off'],
    'no-undef': ['off'],
    'max-len': ['off'],
    'vue/script-indent': [
      'error',
      2,
      {
        baseIndent: 1,
      },
    ],
    'vue/require-default-prop': ['off'],
    'vue/order-in-components': ['error', {
      order: [
        'el',
        ['template', 'render'],
        'renderError',
        'data',
        'name',
        'head',
        'key',
        'parent',
        'functional',
        ['delimiters', 'comments'],
        ['components', 'directives', 'filters'],
        'extends',
        'mixins',
        ['provide', 'inject'],
        'ROUTER_GUARDS',
        'layout',
        'middleware',
        'validate',
        'scrollToTop',
        'transition',
        'loading',
        'inheritAttrs',
        'model',
        ['props', 'propsData'],
        'emits',
        'setup',
        'asyncData',
        'fetch',
        'LIFECYCLE_HOOKS',
        'methods',
        'computed',
        'watch',
        'watchQuery',
      ],
    }],
    'vue/multi-word-component-names': ['off'],
  },
  overrides: [
    {
      files: [
        '*.vue',
        'ruke',
      ],
      rules: {
        indent: 'off',
      },
    },
  ],
};
