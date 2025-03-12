// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['@nuxt/ui', '@nuxt/fonts'],
  colorMode: {
    preference: "system"
  },
  runtimeConfig: {
    apiKey: process.env.NUXT_FIREBASE_API_KEY,
    authDomain: process.env.NUXT_FIREBASE_AUTH_DOMAIN,
    messagingSenderId: process.env.NUXT_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NUXT_FIREBASE_APP_ID,
    measurementId: process.env.NUXT_FIREBASE_MEASUREMENT_ID,
    public: {
      storage: process.env.NUXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
      projectId: process.env.NUXT_PUBLIC_FIREBASE_PROJECT_ID
    }
  }
})