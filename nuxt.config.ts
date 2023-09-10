// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  app: {
    head: {
      htmlAttrs: {
        lang: 'en',
      },
      title: 'Money Tracker',
      meta: [
        { charset: 'utf-8' },
        { 'http-equiv': 'Content-Type', charset: 'text/html; charset=utf-8' },
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1, maximum-scale=1',
        },
        { 'http-equiv': 'X-UA-Compatible', content: 'ie=edge' },
        { name: 'format-detection', content: 'telephone=no' },
        { name: 'msapplication-TileColor', content: '#ffffff' },
        { name: 'theme-color', content: '#ffffff' },
        { property: 'og:title', content: 'Money Tracker 我的記帳日誌' },
        {
          property: 'og:description',
          content: '一個自製的記帳軟體 Side Project',
        },
        {
          property: 'twitter:description',
          content: '一個自製的記帳軟體 Side Project',
        },
        { name: 'DC.Description', content: '一個自製的記帳軟體 Side Project' },
      ],
    },
    pageTransition: { name: 'fade', mode: 'out-in' },
  },
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/eslint-module',
    '@pinia/nuxt',
    'dayjs-nuxt',
  ],
  css: ['@/assets/scss/main.scss'],
});
