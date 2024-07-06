import { defineStore } from "pinia";
const config = useRuntimeConfig();
const cookieAccessToken = useCookie("access_token");

export const wishlistStore = defineStore("wishlist", {
  state: () => ({
    isLoading: false,
    datas: null as null | Wishlist[],
    page: 1,
    size: 8,
  }),
  actions: {
    async getWishlistByUserId() {
      try {
        this.isLoading = true;

        const { data } = await useFetch<any>(
          `${config.public.apiBase}/wishlist`,
          {
            method: "get",
            headers: {
              Authorization: "Bearer " + cookieAccessToken.value,
            },
            query: {
              page: this.page,
              size: this.size,
              user_id: authStore().authData.user_id,
            },
          }
        );

        if (data.value.data) {
          this.datas = data.value.data.items;
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
              Authorization: "Bearer " + cookieAccessToken.value,
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
              Authorization: "Bearer " + cookieAccessToken.value,
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
