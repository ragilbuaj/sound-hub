import { defineStore } from "pinia";

export const commentStore = defineStore("comment", {
  state: () => ({
    isLoading: false,
    datas: [] as any,
    form: {
      text: "",
      user_id: "",
      thread_id: "",
      parent_id: null,
    },
    page: 1,
    size: 10,
  }),
  actions: {
    async getCommentsByThreadId(id: string) {
      try {
        this.isLoading = true;

        const { data, error }: any = await useAsyncData("comments", () =>
          $fetch(`${useRuntimeConfig().public.apiBase}/comments-thread`, {
            method: "get",
            headers: {
              Authorization: "Bearer " + authStore().authData.access_token,
            },
            query: { thread_id: id, page: this.page, size: this.size },
          })
        );

        if (data.value.data) {
          this.datas = data.value.data;
        }
      } catch (e) {
        throw e;
      } finally {
        this.isLoading = false;
      }
    },
    async createComment() {
      try {
        const { data, error }: any = await useAsyncData("create-comment", () =>
          $fetch(`${useRuntimeConfig().public.apiBase}/comment`, {
            method: "post",
            headers: {
              Authorization: "Bearer " + authStore().authData.access_token,
            },
            body: JSON.stringify(this.form),
          })
        );

        if (error) {
          throw new Error(error);
        }

        return data;
      } catch (e) {
        throw e;
      }
    },
    resetForm() {
      this.form.text = "";
      this.form.user_id = "";
      this.form.thread_id = "";
      this.form.parent_id = null;
    },
  },
});
