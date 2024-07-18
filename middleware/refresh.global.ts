import { authStore } from "~/stores/auth";

export default defineNuxtRouteMiddleware(async (to, from) => {
  const useAuthStore = authStore();
  const cookieEmail = useCookie("email");
  const cookieAccessToken = useCookie("access_token");
  const cookieRefreshToken = useCookie("refresh_token");
  const config = useRuntimeConfig();

  try {
    const { data } = await useFetch<any>(
      `${config.public.apiBase}/refresh-token`,
      {
        method: "post",
        body: {
          refresh_token: cookieRefreshToken.value,
        },
      }
    );

    if (data.value) {
      cookieAccessToken.value = data.value.access_token;
      useAuthStore.authData.access_token = data.value.access_token;
    }

    return;
  } catch (error) {
    console.error("Error refresh token:", error);
  }
});
