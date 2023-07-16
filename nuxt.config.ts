// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', '@nuxtjs/eslint-module', '@pinia/nuxt'],
  css: ['@/assets/scss/main.scss'],
});
