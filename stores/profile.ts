import { defineStore } from "pinia";

export const profileStore = defineStore("profile", {
  state: () => ({
    isLoading: false,
    profileDetail: {} as any,
    form: {
      user_image: null as any,
      username: "",
      profile_information: "",
    },
  }),
  actions: {
    async getOneUser() {
      try {
        this.isLoading = true;

        const { data, error }: any = await useAsyncData("user", () =>
          $fetch(`${useRuntimeConfig().public.apiBase}/user`, {
            method: "get",
            headers: {
              Authorization: "Bearer " + authStore().authData.access_token,
            },
            query: { user_id: authStore().authData.user_id },
          })
        );

        if (data.value.data) {
          this.profileDetail = data.value.data;
        }
      } catch (e) {
        throw e;
      } finally {
        this.isLoading = false;
      }
    },
    async changeProfilePicture() {
      try {
        this.isLoading = true;

        const formData = new FormData();

        formData.append("user_image", this.form.user_image);
        const { data, error }: any = await useAsyncData("update-user", () =>
          $fetch(`${useRuntimeConfig().public.apiBase}/user`, {
            method: "patch",
            headers: {
              Authorization: "Bearer " + authStore().authData.access_token,
            },
            query: { user_id: authStore().authData.user_id },
            body: formData,
          })
        );
      } catch (e) {
        throw e;
      } finally {
        this.isLoading = false;
      }
    },
    async updateProfile() {
      try {
        this.isLoading = true;

        const formData = new FormData();

        formData.append("username", this.form.username);
        formData.append("profile_information", this.form.profile_information);
        const { data, error }: any = await useAsyncData("update-user", () =>
          $fetch(`${useRuntimeConfig().public.apiBase}/user`, {
            method: "patch",
            headers: {
              Authorization: "Bearer " + authStore().authData.access_token,
            },
            query: { user_id: authStore().authData.user_id },
            body: formData,
          })
        );
      } catch (e) {
        throw e;
      } finally {
        this.isLoading = false;
      }
    },
  },
});
