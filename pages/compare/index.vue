<template></template>

<script setup lang="ts">
const useSearchStore = searchStore();
const config = useRuntimeConfig();

watch(
  () => useSearchStore.filter.name,
  async (newValue) => {
    if (newValue.length > 0) {
      const { data: products } = await useAsyncData(
        "search-products",
        async () =>
          await $fetch(`${config.public.apiBase}/product/filter`, {
            method: "get",
            query: { page: 1, size: 10, name: newValue },
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

      useSearchStore.autocompleteOption = products;
    } else {
      useSearchStore.autocompleteOption = [];
    }
  },
  { immediate: true }
);
</script>
