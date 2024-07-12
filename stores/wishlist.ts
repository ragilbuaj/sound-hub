import { defineStore } from "pinia";
import { authStore } from "#imports";
const config = useRuntimeConfig();
const cookieAccessToken = useCookie("access_token");

export const wishlistStore = defineStore("wishlist", {
  state: () => ({
    isLoading: false,
    datas: null as any | Wishlist[],
    page: 1,
    size: 8,
  }),
  actions: {
    async getWishlistByUserId() {
      try {
        this.isLoading = true;
        this.datas = [];

        const { data: wishlists, error }: any = await useAsyncData(
          "wishlist",
          () =>
            $fetch(`${config.public.apiBase}/wishlist`, {
              method: "get",
              headers: {
                Authorization: "Bearer " + authStore().authData.access_token,
              },
              query: {
                page: this.page,
                size: this.size,
                user_id: authStore().authData.user_id,
              },
            })
        );

        if (wishlists.value.data) {
          this.datas = wishlists.value.data.items;
        }
      } catch (error) {
        return;
      } finally {
        this.isLoading = false;
      }
    },
    async addWishlist(wishlist: Wishlist) {
      try {
        const { data } = await useFetch<any>(
          `${config.public.apiBase}/wishlist`,
          {
            method: "post",
            headers: {
              Authorization: "Bearer " + authStore().authData.access_token,
            },
            body: JSON.stringify(wishlist),
          }
        );

        if (data.value) {
          return data.value.data;
        }
      } catch (error) {
        return;
      }
    },
    async deleteWishlist(id: string) {
      try {
        const { data } = await useFetch<any>(
          `${config.public.apiBase}/wishlist`,
          {
            method: "delete",
            headers: {
              Authorization: "Bearer " + authStore().authData.access_token,
            },
            query: { wishlist_id: id },
          }
        );

        if (data.value) {
          return data.value.data;
        }
      } catch (error) {
        return;
      }
    },
  },
});
