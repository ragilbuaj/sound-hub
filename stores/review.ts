import { defineStore, getActivePinia } from "pinia";
const config = useRuntimeConfig();
const cookieAccessToken = useCookie("access_token");
// const useAuthStore = authStore(getActivePinia());

export const reviewStore = defineStore("review", {
  state: () => ({
    isLoading: false,
    datas: [] as any[],
    form: {
      user_id: "",
      product_id: "",
      review_content: "",
    },
    page: 1,
    size: 8,
  }),
  actions: {
    async getReviewsByProductId(id: string) {
      try {
        this.datas = [];

        const { data: review, error }: any = await useAsyncData("reviews", () =>
          $fetch(`${config.public.apiBase}/reviews/product-id`, {
            method: "get",
            query: { page: this.page, size: this.size, product_id: id },
          })
        );

        if (review.value?.data) {
          this.datas = review.value.data.items;
        }
      } catch (e) {
        throw e;
      }
    },
    async addReview() {
      try {
        this.isLoading = true;

        const { data: review, error }: any = await useAsyncData(
          "added-review",
          () =>
            $fetch(`${config.public.apiBase}/review`, {
              method: "post",
              headers: {
                Authorization: "Bearer " + authStore().authData.access_token,
              },
              body: JSON.stringify(this.form),
            })
        );

        if (review.value.data[0]) {
          return review.value.data[0];
        }
      } catch (e) {
        throw e;
      } finally {
        this.isLoading = false;
      }
    },
    resetForm() {
      this.form.user_id = "";
      this.form.product_id = "";
      this.form.review_content = "";
    },
  },
});
