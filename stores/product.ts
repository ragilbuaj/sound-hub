import { defineStore } from "pinia";
const config = useRuntimeConfig();

export const productStore = defineStore("product", {
  state: () => ({
    isLoading: false,
    datas: null as any | Product[],
    productDetail: {} as Product,
    page: 1,
    size: 8,
    showToast: false,
    messageToast: "",
    changesToast: "",
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
    async getProductDetail(id: string) {
      try {
        this.isLoading = true;

        const { data: productDetail, error }: any = await useAsyncData(
          "product-detail",
          () =>
            $fetch(`${config.public.apiBase}/product`, {
              method: "get",
              query: { product_id: id },
            })
        );

        if (productDetail.value.data) {
          this.productDetail = productDetail.value.data;
        }
      } catch (e) {
        return;
      } finally {
        this.isLoading = false;
      }
    },
    async getRecommendationProduct(brand: string) {
      try {
        this.isLoading = true;

        const { data: productRecommendation, error } = await useAsyncData(
          "product-recommendations",
          () =>
            $fetch(`${config.public.apiBase}/product/recommendations`, {
              method: "get",
              query: { brand: brand },
            }),
          {
            transform: (productRecommendation: any) => {
              return productRecommendation.data.map((item: any) => ({
                id: item.id,
                name: item.name,
                price: item.price,
                product_image_url: item.product_image_url,
              }));
            },
          }
        );

        if (productRecommendation) {
          return productRecommendation.value;
        }
      } catch (e) {
        return;
      } finally {
        this.isLoading = false;
      }
    },
  },
});
