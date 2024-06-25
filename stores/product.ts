import { defineStore } from "pinia";
const config = useRuntimeConfig();

export const productStore = defineStore("product", {
  state: () => ({
    isLoading: false,
    datas: [] as Product[],
    filter: {
      name: "",
    },
  }),
  actions: {
    async getAllProducts() {
      try {
        this.isLoading = true;

        const { data } = await useFetch<any>(
          `${config.public.apiBase}/products`,
          {
            method: "get",
          }
        );

        if (data.value.data) {
          this.datas = data.value.data;
        }
      } catch (error) {
        return;
      } finally {
        this.isLoading = false;
      }
    },
    async filterByName() {
      try {
        this.isLoading = true;

        const { data } = await useFetch<any>(
          `${config.public.apiBase}/product/filter`,
          {
            method: "get",
            query: { product_name: this.filter.name },
          }
        );

        if (data.value.data) {
          this.datas = data.value.data;
        }
      } catch (error) {
        this.datas = [];
      } finally {
        this.isLoading = false;
      }
    },
    setFilterName(name: string) {
      this.filter.name = name;
    },
  },
});
