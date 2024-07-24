import { defineStore } from "pinia";
import { useRuntimeConfig } from "#imports";
const cookieAccessToken = useCookie("access_token", { maxAge: 3600 });
const cookieRefreshToken = useCookie("refresh_token", {
  maxAge: 3600,
});
const cookieUsername = useCookie("username", { maxAge: 3600 });
const cookieEmail = useCookie("email", { maxAge: 3600 });
const cookiePassword = useCookie("password", { maxAge: 3600 });

export const authStore = defineStore("auth", {
  state: () => ({
    isLoading: false,
    authData: {
      user_id: "",
      username: "",
      email: "",
      user_image_url: "",
      access_token: "",
      refresh_token: "",
      token_expiry: null,
      email_verified: null,
      role: "",
    } as AuthUser,
    registData: {
      username: "",
      email: "",
      password: "",
      role: "",
    } as Register,
    signInData: {
      email: "",
      password: "",
    },
    resetPasswordData: {
      email: "",
    },
  }),
  persist: {
    storage: sessionStorage,
    paths: ["authData"],
  },
  actions: {
    async getUser() {
      try {
        this.isLoading = true;

        const { data } = await useFetch<any>(
          `${useRuntimeConfig().public.apiBase}/user`,
          {
            method: "get",
            headers: {
              Authorization: "Bearer " + this.authData.access_token,
            },
            query: { user_id: this.authData.user_id },
          }
        );

        if (data.value.data) {
          const user = data.value.data;
          this.authData.role = user?.role as string;
        }
      } catch (error) {
        console.log(error);
      } finally {
        this.isLoading = false;
      }
    },
    async signInUser() {
      try {
        this.isLoading = true;

        const { data } = await useFetch<any>(
          `${useRuntimeConfig().public.apiBase}/sign-in`,
          {
            method: "post",
            body: JSON.stringify({
              email: this.signInData.email,
              password: this.signInData.password,
            }),
          }
        );

        if (data.value.data) {
          const user = data.value.data;

          this.authData.user_id = user?.user_id as string;
          this.authData.username = user?.username as string;
          this.authData.email = user?.email as string;
          this.authData.user_image_url = user?.user_image_url as string;
          this.authData.access_token = user?.access_token as string;
          this.authData.refresh_token = user?.refresh_token as string;
          this.authData.token_expiry = user?.token_expiry as number;
          this.authData.email_verified = user?.email_verified as boolean;
          this.authData.role = user?.role as string;

          cookieAccessToken.value = user?.access_token as string;
          cookieRefreshToken.value = user?.refresh_token as string;
          cookieUsername.value = user?.username as string;
          cookieEmail.value = user?.email as string;
        }
      } catch (error) {
        console.log(error);
      } finally {
        this.isLoading = false;
      }
    },
    async signUpUser() {
      try {
        this.isLoading = true;

        const data = await useFetch(
          `${useRuntimeConfig().public.apiBase}/user`,
          {
            method: "post",
            body: JSON.stringify(this.registData),
          }
        );

        cookieEmail.value = this.registData.email;
        cookiePassword.value = this.registData.password;

        return data;
      } catch (error: any) {
        console.log(error);
      } finally {
        this.isLoading = false;
      }
    },
    async resetPassword() {
      try {
        this.isLoading = true;

        await useFetch<any>(
          `${useRuntimeConfig().public.apiBase}/reset-password`,
          {
            method: "post",
            body: {
              email: this.resetPasswordData.email,
            },
          }
        );
      } catch (error) {
        console.log(error);
      } finally {
        this.isLoading = false;
      }
    },
    async userLogOut() {
      try {
        this.isLoading = true;

        await useFetch(`${useRuntimeConfig().public.apiBase}/sign-out`, {
          method: "post",
        });

        this.resetAuthData();
        cookieAccessToken.value = null;
        cookieRefreshToken.value = null;
        cookieEmail.value = null;
        cookiePassword.value = null;
        cookieUsername.value = null;
      } catch (error) {
        console.log(error);
      } finally {
        this.isLoading = false;
      }
    },
    async getUserInfo() {
      try {
        const { data } = await useFetch<any>(
          `${useRuntimeConfig().public.apiBase}/user-info`,
          {
            method: "get",
            query: { email: this.authData.email },
          }
        );

        if (data.value.data) {
          const user = data.value.data;
          this.authData.user_id = user?.user_id;
          this.authData.email = user?.email;
          this.authData.username = user?.username;
          this.authData.email_verified = user?.email_verified;
          this.authData.role = user?.role;
          this.authData.user_image_url = user?.user_image_url;
        }
      } catch (error) {
        console.log(error);
      }
    },
    async refreshToken() {
      try {
        const { data } = await useFetch<any>(
          `${useRuntimeConfig().public.apiBase}/refresh-token`,
          {
            method: "post",
            body: {
              refresh_token: cookieRefreshToken.value,
            },
          }
        );

        if (data.value) {
          cookieAccessToken.value = data.value.access_token;
          this.authData.access_token = data.value.access_token;
        }

        return;
      } catch (error) {
        console.error("Error refresh token:", error);
      }
    },
    async resendVerification() {
      try {
        await useFetch<any>(
          `${useRuntimeConfig().public.apiBase}/resend-verification`,
          {
            method: "post",
            body: JSON.stringify({
              email: cookieEmail.value,
              password: cookiePassword.value,
            }),
          }
        );
      } catch (error) {
        console.log(error);
      }
    },
    resetRegistData() {
      this.registData.username = "";
      this.registData.email = "";
      this.registData.password = "";
    },
    resetSignInData() {
      this.signInData.email = "";
      this.signInData.password = "";
    },
    resetAuthData() {
      this.authData.user_id = "";
      this.authData.username = "";
      this.authData.email = "";
      this.authData.user_image_url = "";
      this.authData.access_token = "";
      this.authData.email_verified = null;
      this.authData.role = "";
    },
  },
});
