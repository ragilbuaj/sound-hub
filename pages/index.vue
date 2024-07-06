<template>
  <div
    v-if="useProductStore.isLoading"
    class="w-full flex flex-wrap justify-center bg-inherit p-20 my-10 lg:gap-10"
  >
    <span class="loading loading-dots loading-lg"></span>
  </div>
  <div
    v-else
    ref="container"
    class="w-full h-full grid grid-cols-2 lg:grid-cols-4 gap-4 p-2 bg-inherit my-2 lg:my-10 overflow-auto no-scrollbar"
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
      v-else-if="useProductStore.datas?.length <= 0"
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
const config = useRuntimeConfig();
const container = ref<HTMLElement | null>(null);

const isLoadingMore = ref(false);
const isEndOfList = ref(false);

const fetchProducts = async () => {
  if (!isEndOfList.value && !isLoadingMore.value) {
    try {
      isLoadingMore.value = true;
      useProductStore.page += 1;

      const { data: products, error } = await useAsyncData(
        "products",
        () =>
          $fetch(`${config.public.apiBase}/products`, {
            method: "get",
            query: { page: useProductStore.page, size: useProductStore.size },
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
        console.log(products.value);
        useProductStore.datas.push(...products.value);
      }

      if (useProductStore.datas?.length === 0) {
        isEndOfList.value = true;
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      isLoadingMore.value = false;
    }
  }
};

onMounted(async () => {
  if (!useProductStore.datas) {
    await useProductStore.getAllProducts();
  }
});

useInfiniteScroll(container, fetchProducts, {
  distance: 10,
});
</script>
