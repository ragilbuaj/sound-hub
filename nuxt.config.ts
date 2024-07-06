// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    "@nuxtjs/tailwindcss",
    "@pinia/nuxt",
    "@nuxtjs/google-fonts",
    "@pinia-plugin-persistedstate/nuxt",
    "@nuxt/icon",
    "@vueuse/nuxt",
  ],
  ssr: false,
  app: {
    head: {
      link: [
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Lexend:wght@100..900&display=swap",
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Lexend:wght@100..900&family=Manrope:wght@200..800&display=swap",
        },
      ],
    },
  },
  runtimeConfig: {
    apiBaseUrl: process.env.APP_BASE_URL,
    public: {
      apiBase: process.env.APP_BASE_URL,
      apiKey: process.env.API_KEY,
      authDomain: process.env.AUTH_DOMAIN,
      projectId: process.env.PROJECT_ID,
      storageBucket: process.env.STORAGE_BUCKET,
      messagingSenderId: process.env.MESSAGING_SENDER_ID,
      appId: process.env.APP_ID,
    },
  },
  devServer: {
    port: 3000,
    host: "0.0.0.0",
  },
});
