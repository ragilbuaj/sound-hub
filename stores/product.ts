import { defineStore } from "pinia";
const config = useRuntimeConfig();

export const productStore = defineStore("product", {
  state: () => ({
    isLoading: false,
    datas: null as any | Product[],
    page: 1,
    size: 8,
  }),
  actions: {
    async getAllProducts() {
      try {
        this.isLoading = true;
        this.datas = [];

        const { data: products, error } = await useAsyncData(
          "products",
          () =>
            $fetch(`${config.public.apiBase}/products`, {
              method: "get",
              query: { page: this.page, size: this.size },
            }),
          {
            transform: (products: any) => {
              return products.data.items.map((product: Product) => ({
                id: product.id,
                name: product.name,
                price: product.price,
                product_image_url: product.product_image_url,
                wishlist: product.wishlist,
              }));
            },
          }
        );

        if (products.value) {
          this.datas = products.value;
        }
      } catch (error) {
        return;
      } finally {
        this.isLoading = false;
      }
    },
  },
});
