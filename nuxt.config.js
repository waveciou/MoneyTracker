export default {
  mode: 'universal',
  vue: {
    config: {
      devtools: true
    }
  },
  router: {
    base: '/MoneyTracker/'
  },
  generate: {
    fallback: false,
    minify: {
      collapseWhitespace: false
    }
  },
  head: {
    htmlAttrs: {
      lang: 'zh-Hant-TW'
    },
    title: 'MoneyTracker',
    meta: [
      { charset: 'utf-8' },
      { 'http-equiv': 'Content-Type', charset: 'text/html; charset=utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1' },
      { 'http-equiv': 'X-UA-Compatible', content: 'ie=edge'},
      { name: 'format-detection', content: 'telephone=no'},
    ],
    link: []
  },
  css: [
    { src: '~/assets/scss/main.scss', lang: 'scss' },
  ],
  plugins: [
    { src: '~/plugins/mixin.js' },
  ],
  components: true,
  buildModules: [],
  modules: [
    '@nuxtjs/axios',
  ],
  axios: {},
  build: {
    extend(config, { isDev, isClient }) {
      if (!isDev) {
        config.output.publicPath = './_nuxt/';
      }
      return config;
    },
    filenames: {
      app: () => '[name].js',
      chunk: () => '[name].js'
    }
  }
};