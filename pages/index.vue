<template>
  <Toast
    :show-toast="useProductStore.showToast"
    :message="useProductStore.messageToast"
    :isWishlist="true"
    :type-changes="useProductStore.changesToast"
  />
  <Filter />
  <div
    v-if="useProductStore.isLoading"
    class="w-full flex flex-wrap justify-center bg-inherit p-20 my-10 lg:gap-10"
  >
    <span class="loading loading-dots loading-lg"></span>
  </div>
  <div
    v-else
    ref="container"
    class="w-full h-full grid grid-cols-2 lg:grid-cols-4 gap-4 p-2 bg-inherit my-2 overflow-auto no-scrollbar"
  >
    <ProductCard
      v-if="useProductStore.datas?.length > 0"
      v-for="(product, index) in useProductStore.datas"
      :key="product.id"
      :productId="product.id"
      :productIndex="index"
    />

    <div v-if="isLoadingMore" class="col-span-2 lg:col-span-4">
      <span class="loading loading-dots loading-lg"></span>
    </div>

    <div
      v-else-if="useProductStore.datas?.length <= 0 || !useProductStore.datas"
      class="col-span-2 lg:col-span-4"
    >
      <p
        class="text-xs text-center text-black md:text-base lg:text-lg dark:text-white"
      >
        Sorry, it looks like the product you are looking for is not available.
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
const useProductStore = productStore();
const useWishlistStore = wishlistStore();
const useSearchStore = searchStore();
const config = useRuntimeConfig();
const route = useRoute();
const container = ref<HTMLElement | null>(null);

const isLoadingMore = ref(false);
const isEndOfList = ref(false);
const previousFilter = ref({ ...useSearchStore.filter });

const resetState = () => {
  useProductStore.datas = [];
  useSearchStore.page = 0;
  isEndOfList.value = false;
  isLoadingMore.value = false;
};

const fetchProducts = async () => {
  if (!isEndOfList.value && !isLoadingMore.value) {
    try {
      isLoadingMore.value = true;
      isEndOfList.value = false;

      useSearchStore.page += 1;

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
        page: useSearchStore.page,
        size: useSearchStore.size,
        name: useSearchStore.filter.name,
        brand: useSearchStore.filter.brand,
        min_price: useSearchStore.filter.minPrice,
        max_price: useSearchStore.filter.maxPrice,
        year: useSearchStore.filter.year,
      });

      let products = [];

      try {
        const { data, error }: any = await useAsyncData(
          "products",
          async () =>
            await $fetch(`${config.public.apiBase}/product/filter`, {
              method: "get",
              query: dynamicQueryParams,
            }),
          {
            transform: (data: any) => {
              return data.data.items.map((product: any) => ({
                id: product.id,
                name: product.name,
                price: product.price,
                product_image_url: product.product_image_url,
                wishlist: product.wishlist,
              }));
            },
          }
        );

        products = data.value || [];
      } catch (error: any) {
        if (error.response && error.response.status === 404) {
          console.error("Error 404: Data not found");
          isEndOfList.value = true;
        } else {
          console.error("Error fetching products:", error);
        }
        return;
      }

      if (products.length > 0) {
        const existingProductIds = new Set(
          useProductStore.datas.map((p: any) => p.id)
        );
        const newProducts = products.filter(
          (product: any) => !existingProductIds.has(product.id)
        );

        if (newProducts.length > 0) {
          useProductStore.datas.push(...newProducts);
        } else {
          isEndOfList.value = true;
        }
      } else {
        isEndOfList.value = true;
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      isLoadingMore.value = false;
    }
  }
};

watch(
  () => useSearchStore.filter,
  async (newFilter, oldFilter) => {
    if (route.path == "/") {
      if (JSON.stringify(newFilter) !== JSON.stringify(previousFilter.value)) {
        previousFilter.value = { ...newFilter };
        resetState();
        await fetchProducts();
      }
    }
  },
  { deep: true }
);

onMounted(async () => {
  useProductStore.datas = [];
  await useSearchStore.filterProductsByName();
  await useSearchStore.fetchFilterDrowdown();
});

useInfiniteScroll(container, fetchProducts, {
  distance: 10,
});
</script>
