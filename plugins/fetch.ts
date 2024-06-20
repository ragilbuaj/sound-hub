import { defineNuxtPlugin } from "#app";
import { useFetch as useNuxtFetch } from "#imports";

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();
  const baseURL = config.public.apiBaseUrl;

  const useFetch = (url: string, options: any = {}) => {
    options.baseURL = baseURL;
    return useNuxtFetch(url, options);
  };

  nuxtApp.provide("useFetch", useFetch);
});
