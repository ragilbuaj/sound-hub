import { defineStore } from "pinia";

export const threadStore = defineStore("thread", {
  state: () => ({
    isLoading: false,
    datas: [] as Thread | any,
    threadDetail: {} as Thread,
    followedThread: [] as any,
    form: {
      title: "",
      content: "",
      image: null as File | Blob | null,
    },
    page: 1,
    size: 10,
  }),
  actions: {
    async getAllThreads() {
      try {
        this.isLoading = true;

        const { data: threads, error }: any = await useAsyncData(
          "threads",
          () =>
            $fetch(`${useRuntimeConfig().public.apiBase}/threads`, {
              method: "get",
              headers: {
                Authorization: "Bearer " + authStore().authData.access_token,
              },
              query: { page: this.page, size: this.size },
            })
        );

        if (threads.value) {
          this.datas = threads.value.data;
        }
      } catch (e) {
        throw e;
      } finally {
        this.isLoading = false;
      }
    },
    async getThreadById(id: string) {
      try {
        this.isLoading = true;

        const { data: thread, error }: any = await useAsyncData("thread", () =>
          $fetch(`${useRuntimeConfig().public.apiBase}/thread`, {
            method: "get",
            headers: {
              Authorization: "Bearer " + authStore().authData.access_token,
            },
            query: { id: id },
          })
        );

        if (thread.value) {
          this.threadDetail = thread.value.data;
        }
      } catch (e) {
        throw e;
      } finally {
        this.isLoading = false;
      }
    },
    async createThread() {
      try {
        this.isLoading = true;

        const formData = new FormData();

        formData.append("title", this.form.title);
        formData.append("content", this.form.content);
        formData.append("image", this.form.image as Blob);
        formData.append("user_id", authStore().authData.user_id);

        const { data, error } = await useAsyncData("create-thread", () =>
          $fetch(`${useRuntimeConfig().public.apiBase}/thread`, {
            method: "post",
            headers: {
              Authorization: "Bearer " + authStore().authData.access_token,
            },
            body: formData,
          })
        );

        if (data.value) {
          await this.getAllThreads();
        }
      } catch (e) {
        throw e;
      } finally {
        this.isLoading = false;
      }
    },
    async likeCount(
      id: string,
      threadId: string,
      userId: string,
      type: string
    ) {
      try {
        this.isLoading = true;

        const { data, error }: any = await useAsyncData("like-thread", () =>
          $fetch(`${useRuntimeConfig().public.apiBase}/thread/like`, {
            method: "post",
            headers: {
              Authorization: "Bearer " + authStore().authData.access_token,
            },
            query: { id: id, thread_id: threadId, user_id: userId, type: type },
          })
        );
      } catch (e) {
        throw e;
      } finally {
        this.isLoading = false;
      }
    },
    async getAllFollowedThreads() {
      try {
        this.isLoading = true;

        const { data, error }: any = await useAsyncData("followed-thread", () =>
          $fetch(`${useRuntimeConfig().public.apiBase}/follow`, {
            method: "get",
            headers: {
              Authorization: "Bearer " + authStore().authData.access_token,
            },
            query: { user_id: authStore().authData.user_id },
          })
        );

        if (data.value.data) {
          this.followedThread = data.value.data;
        }
      } catch (e) {
        throw e;
      } finally {
        this.isLoading = false;
      }
    },
    async followThread(threadId: string, userId: string) {
      try {
        this.isLoading = true;

        const { data, error }: any = await useAsyncData("follow-thread", () =>
          $fetch(`${useRuntimeConfig().public.apiBase}/follow`, {
            method: "post",
            headers: {
              Authorization: "Bearer " + authStore().authData.access_token,
            },
            body: { thread_id: threadId, user_id: userId },
          })
        );
      } catch (e) {
        throw e;
      } finally {
        this.isLoading = false;
      }
    },
    async unFollowThread(id: string) {
      try {
        this.isLoading = true;

        const { data, error }: any = await useAsyncData("follow-thread", () =>
          $fetch(`${useRuntimeConfig().public.apiBase}/unfollow`, {
            method: "post",
            headers: {
              Authorization: "Bearer " + authStore().authData.access_token,
            },
            query: { id: id },
          })
        );
      } catch (e) {
        throw e;
      } finally {
        this.isLoading = false;
      }
    },
    resetForm() {
      this.form.title = "";
      this.form.content = "";
      this.form.image = null;
    },
  },
});
