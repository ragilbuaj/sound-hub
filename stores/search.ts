import { defineStore } from "pinia";
const config = useRuntimeConfig();

export const searchStore = defineStore("search", {
  state: () => ({
    page: 1,
    size: 8,
    filter: {
      name: "",
      minPrice: null as number | any,
      maxPrice: null as number | any,
      year: "",
      brand: "",
    },
    dropdown: {} as any,
    isFilter: false,
  }),
  persist: {
    storage: sessionStorage,
    paths: ["filter"],
  },
  actions: {
    async filterProductsByName() {
      try {
        productStore().isLoading = true;

        productStore().datas = null;

        const buildQueryParams = (params: Record<string, any>) => {
          return Object.keys(params)
            .filter(
              (key) =>
                params[key] !== null &&
                params[key] !== undefined &&
                params[key] !== "" &&
                params[key] !== 0
            )
            .reduce((acc, key) => {
              acc[key] = params[key];
              return acc;
            }, {} as Record<string, any>);
        };

        const dynamicQueryParams = buildQueryParams({
          page: this.page,
          size: this.size,
          name: this.filter.name,
          brand: this.filter.brand,
          min_price: this.filter.minPrice,
          max_price: this.filter.maxPrice,
          year: this.filter.year,
        });

        const { data: products } = await useAsyncData(
          "products",
          async () =>
            await $fetch(`${config.public.apiBase}/product/filter`, {
              method: "get",
              query: dynamicQueryParams,
            }),
          {
            transform: (products: any) => {
              return products.data.items.map((product: any) => ({
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
          productStore().datas = products.value;
        }
      } catch (error) {
        productStore().datas = [];
      } finally {
        productStore().isLoading = false;
      }
    },
    async fetchFilterDrowdown() {
      try {
        const { data: columnData, error } = await useAsyncData(
          "columns-data",
          async () => {
            const [company, release_year]: any = await Promise.all([
              $fetch(`${config.public.apiBase}/product/column`, {
                method: "get",
                query: { column_name: "company" },
              }),
              $fetch(`${config.public.apiBase}/product/column`, {
                method: "get",
                query: { column_name: "year" },
              }),
            ]);

            return {
              company: company.data,
              release_year: release_year.data,
            };
          },
          {
            transform: (columnData) => {
              return {
                company: columnData.company
                  .filter((item: any) => item.company !== null)
                  .map((item: any) => item.company),
                release_year: columnData.release_year
                  .filter((item: any) => item.release_year !== null)
                  .map((item: any) => item.release_year),
              };
            },
          }
        );

        if (columnData.value) {
          this.dropdown = columnData.value as any;
        }
      } catch (error) {
        return;
      }
    },
    resetFilter() {
      this.filter.name = "";
      this.filter.minPrice = null;
      this.filter.maxPrice = null;
      this.filter.year = "";
      this.filter.brand = "";
    },
  },
});
