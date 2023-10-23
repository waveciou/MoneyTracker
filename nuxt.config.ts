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
        { property: 'og:title', content: 'Money Tracker' },
        {
          property: 'og:description',
          content: 'This is a side project for accounting application.',
        },
        {
          property: 'twitter:description',
          content: 'This is a side project for accounting application.',
        },
        {
          name: 'DC.Description',
          content: 'This is a side project for accounting application.',
        },
      ],
      link: [
        {
          rel: 'apple-touch-icon',
          sizes: '180x180',
          href: '/favicon/apple-touch-icon.png',
        },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '32x32',
          href: '/favicon/favicon-32x32.png',
        },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '16x16',
          href: '/favicon/favicon-16x16.png',
        },
        {
          rel: 'manifest',
          href: '/manifest.json',
        },
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
