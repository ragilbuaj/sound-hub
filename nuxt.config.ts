// https://nuxt.com/docs/api/configuration/nuxt-config
// import * as dotenv from "dotenv";
// dotenv.config();

export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    "@nuxtjs/tailwindcss",
    "@pinia/nuxt",
    "@nuxtjs/google-fonts",
    "@pinia-plugin-persistedstate/nuxt",
    "@nuxt/icon"
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
    },
  },
});