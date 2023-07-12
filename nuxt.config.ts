//@ts-nocheck
export default defineNuxtConfig({
  alias: {
    'class-validator': 'class-validator/cjs/index.js',
  },
  devtools: { enabled: true },
  css: ['@mdi/font/css/materialdesignicons.min.css', 'vuetify/lib/styles/main.sass'],
  build: {
    transpile: ['vuetify'],
  },
  vite: {
    define: {
      'process.env.DEBUG': false,
    },
    optimizeDeps: {
      exclude: ['class-validator']
    },
  },
})

