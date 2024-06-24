import { defineStore } from "pinia";
const config = useRuntimeConfig();

export const productStore = defineStore("product", {
  state: () => ({
    datas: [] as Product[],
  }),
  actions: {
    async getAllProducts() {
      const { data } = await useFetch<any>(
        `${config.public.apiBase}/products`,
        {
          method: "get",
        }
      );

      if (data.value.data) {
        this.datas = data.value.data;
      }
    },
  },
});
