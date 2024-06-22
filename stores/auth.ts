import { defineStore } from "pinia";
import { json } from "stream/consumers";
const config = useRuntimeConfig();

export const authStore = defineStore("auth", {
  state: () => ({
    isLoading: false,
    authData: {
      user_id: "",
      username: "",
      email: "",
      user_image_url: "",
      access_token: "",
      email_verified: null,
    } as Auth,
    registData: {
      username: "",
      email: "",
      password: "",
    } as Register,
    signInData: {
      email: "",
      password: "",
    },
    resetPasswordData: {
      email: "",
    },
  }),
  actions: {
    async signInUser() {
      try {
        this.isLoading = true;

        const { data } = await useFetch<any>(
          `${config.public.apiBase}/sign-in`,
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
          this.authData.email_verified = user?.email_verified as boolean;
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

        const data = await useFetch(`${config.public.apiBase}/user`, {
          method: "post",
          body: JSON.stringify(this.registData),
        });

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

        await useFetch<any>(`${config.public.apiBase}/reset-password`, {
          method: "post",
          body: {
            email: this.resetPasswordData.email,
          },
        });
      } catch (error) {
        console.log(error);
      } finally {
        this.isLoading = false;
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
  },
});
