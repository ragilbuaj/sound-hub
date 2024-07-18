import { authStore } from "~/stores/auth";

export default defineNuxtRouteMiddleware(async (to, from) => {
  const useAuthStore = authStore();
  const cookieEmail = useCookie("email");
  const cookieAccessToken = useCookie("access_token");
  const cookieRefreshToken = useCookie("refresh_token");
  const config = useRuntimeConfig();

  try {
    const { data } = await useFetch<any>(`${config.public.apiBase}/user-info`, {
      method: "get",
      headers: {
        Authorization: "Bearer " + cookieAccessToken.value,
      },
      query: { email: cookieEmail.value },
    });

    if (data.value?.data) {
      const user = data.value.data;
      useAuthStore.authData.user_id = user?.user_id;
      useAuthStore.authData.email = user?.email;
      useAuthStore.authData.username = user?.username;
      useAuthStore.authData.email_verified = user?.email_verified;
      useAuthStore.authData.role = user?.role;
      useAuthStore.authData.user_image_url = user?.user_image_url;
      useAuthStore.authData.access_token = cookieAccessToken.value as string;
      useAuthStore.authData.refresh_token = cookieRefreshToken.value as string;
    } else {
      useAuthStore.authData.user_id = "";
      useAuthStore.authData.email = "";
      useAuthStore.authData.username = "";
      useAuthStore.authData.email_verified = null;
      useAuthStore.authData.role = "";
      useAuthStore.authData.user_image_url = "";
      useAuthStore.authData.access_token = "";
      useAuthStore.authData.refresh_token = "";
    }

    return;
  } catch (error) {
    console.error("Error fetching user info:", error);
    if (to.path == "/wishlist" || to.path == "/community-hub") {
      return navigateTo("/");
    }
  }
});
