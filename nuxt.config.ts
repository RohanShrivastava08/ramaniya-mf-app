// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  future: { compatibilityVersion: 4 },
  modules: ['@nuxtjs/tailwindcss'],
  css: ['~/assets/css/main.css'],

  // Runtime environment config — session secret for H3 sealed sessions
  runtimeConfig: {
    session: {
      password: process.env.SESSION_SECRET || 'ramaniya-session-secret-min-32-chars!!',
    },
    public: {}
  },

  // Transpile apexcharts for SSR compatibility
  build: {
    transpile: ['vue3-apexcharts']
  },

  // Nitro: tell Rollup not to try bundling Prisma — it relies on native binaries
  nitro: {
    externals: {
      inline: ['bcryptjs'],
      external: ['@prisma/client', '.prisma']
    }
  },

  // Vite: prevent Vite from trying to pre-bundle Prisma (it uses native binaries)
  vite: {
    optimizeDeps: {
      exclude: ['@prisma/client', '.prisma']
    }
  }
})
