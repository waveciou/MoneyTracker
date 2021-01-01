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
    title: 'Money Tracker',
    meta: [
      { charset: 'utf-8' },
      { 'http-equiv': 'Content-Type', charset: 'text/html; charset=utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1' },
      { 'http-equiv': 'X-UA-Compatible', content: 'ie=edge'},
      { name: 'format-detection', content: 'telephone=no'},
      { name: 'msapplication-TileColor', content: '#ffffff' },
      { name: 'msapplication-TileImage', content: './_resources/favicon/ms-icon-144x144.png'},
      { name: 'theme-color', content: '#ffffff'}
    ],
    link: [
      { rel: 'apple-touch-icon', sizes: '57x57', href: './_resources/favicon/apple-icon-57x57.png' },
      { rel: 'apple-touch-icon', sizes: '60x60', href: './_resources/favicon/apple-icon-60x60.png' },
      { rel: 'apple-touch-icon', sizes: '72x72', href: './_resources/favicon/apple-icon-72x72.png' },
      { rel: 'apple-touch-icon', sizes: '76x76', href: './_resources/favicon/apple-icon-76x76.png' },
      { rel: 'apple-touch-icon', sizes: '114x114', href: './_resources/favicon/apple-icon-114x114.png' },
      { rel: 'apple-touch-icon', sizes: '120x120', href: './_resources/favicon/apple-icon-120x120.png' },
      { rel: 'apple-touch-icon', sizes: '144x144', href: './_resources/favicon/apple-icon-144x144.png' },
      { rel: 'apple-touch-icon', sizes: '152x152', href: './_resources/favicon/apple-icon-152x152.png' },
      { rel: 'apple-touch-icon', sizes: '180x180', href: './_resources/favicon/apple-icon-180x180.png' },
      { rel: 'icon', type:'image/png', sizes: '192x192',  href: './_resources/favicon/android-icon-192x192.png' },
      { rel: 'icon', type:'image/png', sizes: '32x32', href: './_resources/favicon/favicon-32x32.png' },
      { rel: 'icon', type:'image/png', sizes: '96x96', href: './_resources/favicon/favicon-96x96.png' },
      { rel: 'icon', type:'image/png', sizes: '16x16', href: './_resources/favicon/favicon-16x16.png' },
      { rel: 'manifest', href: './_resources/favicon/manifest.json' }
    ]
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
    '@nuxtjs/dayjs'
  ],
  axios: {},
  dayjs: {
    locales: ['en', 'ja'],
    defaultLocale: 'en',
    plugins: ['utc']
  },
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