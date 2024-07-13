import { defineStore, getActivePinia } from "pinia";
const config = useRuntimeConfig();
const cookieAccessToken = useCookie("access_token");
// const useAuthStore = authStore(getActivePinia());

export const reviewStore = defineStore("review", {
  state: () => ({
    isLoading: false,
    datas: [] as any[],
    form: {
      id: "",
      user_id: "",
      product_id: "",
      review_id: "",
      review_content: "",
      like: false,
      dislike: false,
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
              body: JSON.stringify({
                user_id: this.form.user_id,
                product_id: this.form.product_id,
                review_content: this.form.review_content,
              }),
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
    async rateReview(type: string) {
      try {
        this.isLoading = true;

        let body;
        if (this.form.id.length > 0) {
          body = {
            id: this.form.id,
            review_id: this.form.review_id,
            user_id: this.form.user_id,
            like: this.form.like,
            dislike: this.form.dislike,
          };
        } else {
          body = {
            review_id: this.form.review_id,
            user_id: this.form.user_id,
            like: this.form.like,
            dislike: this.form.dislike,
          };
        }

        const { data: rateReview, error }: any = await useAsyncData(
          "rate-review",
          () =>
            $fetch(`${config.public.apiBase}/review/rate`, {
              method: "post",
              query: { type: type },
              headers: {
                Authorization: "Bearer " + authStore().authData.access_token,
              },
              body: JSON.stringify(body),
            })
        );

        if (rateReview.value) {
          return rateReview.value.data[0];
        }
      } catch (e) {
        throw e;
      } finally {
        this.isLoading = false;
      }
    },
    async deleteReview(id: string) {
      try {
        this.isLoading = true;

        const { data: review, error }: any = await useAsyncData(
          "delete-review",
          () =>
            $fetch(`${config.public.apiBase}/review`, {
              method: "delete",
              query: { review_id: id },
              headers: {
                Authorization: "Bearer " + authStore().authData.access_token,
              },
            })
        );

        if (review.value) {
          console.log(review.value);
        }
      } catch (e) {
        throw e;
      } finally {
        this.isLoading = false;
      }
    },
    async reportReview(id: string) {
      try {
        this.isLoading = true;

        const { data: report, error }: any = await useAsyncData(
          "report-review",
          () =>
            $fetch(`${config.public.apiBase}/review/report`, {
              method: "patch",
              query: { review_id: id },
              headers: {
                Authorization: "Bearer " + authStore().authData.access_token,
              },
            })
        );

        if (report.value) {
          console.log(report.value);
        }
      } catch (e) {
        throw e;
      } finally {
        this.isLoading = false;
      }
    },
    resetForm() {
      this.form.id = "";
      this.form.user_id = "";
      this.form.review_id = "";
      this.form.product_id = "";
      this.form.review_content = "";
      this.form.like = false;
      this.form.dislike = false;
    },
  },
});
