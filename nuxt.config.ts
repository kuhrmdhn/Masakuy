import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  css: ['~/assets/css/tailwind.css'],
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
  modules: ['shadcn-nuxt', '@pinia/nuxt', '@nuxt/fonts', '@nuxt/icon', '@nuxt/image', '@nuxtjs/color-mode'],
  shadcn: {
    prefix: '',
    componentDir: './components/ui',
  },
  components: {
    dirs: ['./components']
  },
  colorMode: {
    classSuffix: ''
  },
  runtimeConfig: {
    firebaseAdmin: {
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY,
      projectId: process.env.FIREBASE_PROJECT_ID,
    },
    public: {
      firebaseClient: {
        projectId: process.env.FIREBASE_PROJECT_ID,
        apiKey: process.env.FIREBASE_API_KEY,
        authDomain: process.env.FIREBASE_AUTH_DOMAIN,
        messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
        appId: process.env.FIREBASE_APP_ID,
        measurementId: process.env.FIREBASE_MEASUREMENT_ID,
        storage: process.env.FIREBASE_STORAGE_BUCKET,
      }
    }
  }
})