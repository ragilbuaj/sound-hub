import { defineStore } from "pinia";

export const notificationStore = defineStore("notification", {
  state: () => ({
    datas: [] as any,
  }),
  actions: {
    async getAllNotificationsById(id: string) {
      try {
        const { data, error }: any = await useAsyncData("notifications", () =>
          $fetch(`${useRuntimeConfig().public.apiBase}/notifications`, {
            method: "get",
            query: {
              user_id: id,
            },
            headers: {
              Authorization: "Bearer " + authStore().authData.access_token,
            },
          })
        );

        if (data.value.data) {
          this.datas = data.value.data;
        }
      } catch (e) {
        console.log(e);
      }
    },
    async readNotifications(id: string) {
      try {
        const { data, error }: any = await useAsyncData(
          "read-notification",
          () =>
            $fetch(`${useRuntimeConfig().public.apiBase}/notification/read`, {
              method: "patch",
              query: {
                notification_id: id,
              },
              headers: {
                Authorization: "Bearer " + authStore().authData.access_token,
              },
            })
        );

        if (data.value.data) {
          return data.value.data;
        }
      } catch (e) {
        console.log(e);
      }
    },
  },
});
