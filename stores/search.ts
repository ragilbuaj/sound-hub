import { defineStore } from "pinia";
const config = useRuntimeConfig();

export const searchStore = defineStore("search", {
  state: () => ({
    filter: {
      name: "",
    },
    isFilter: false,
  }),
  actions: {
    async filterProductsByName() {
      try {
        productStore().isLoading = true;

        productStore().datas = null;

        const { data: products } = await useFetch<any>(
          `${config.public.apiBase}/product/filter`,
          {
            method: "get",
            query: { product_name: this.filter.name },
            transform: (products) => {
              return products.data.map((product: Product) => ({
                id: product.id,
                name: product.name,
                price: product.price,
                product_image_url: product.product_image_url,
                wishlist: product.wishlist,
              }));
            },
          }
        );

        if (this.filter.name == "") {
          this.isFilter = false;
        } else {
          this.isFilter = true;
        }

        if (products.value) {
          productStore().datas = products.value;
        }
      } catch (error) {
        productStore().datas = [];
      } finally {
        productStore().isLoading = false;
      }
    },
  },
});
