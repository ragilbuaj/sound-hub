<template>
  <div
    v-if="useWishlistStore.isLoading"
    class="w-full flex flex-wrap justify-center bg-inherit p-20 my-10 lg:gap-10"
  >
    <span class="loading loading-dots loading-lg"></span>
  </div>
  <div
    v-else
    class="w-full h-full grid grid-cols-2 lg:grid-cols-4 gap-4 p-2 bg-inherit my-2 lg:my-10 overflow-auto no-scrollbar"
  >
    <ProductCard
      v-if="useWishlistStore.datas?.length > 0"
      v-for="(product, index) in useWishlistStore.datas"
      :key="product.id"
      :productId="product.product?.id as string"
      :productIndex="index"
      :isWishList="isWishList"
      @update="handleChangeWishList"
    />

    <div v-else class="col-span-2 lg:col-span-4">
      <p
        class="text-xs text-center text-black md:text-base lg:text-lg dark:text-white"
      >
        You don't have a wishlist.
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

useHead({
  title: "Wishlist",
});

const useWishlistStore = wishlistStore();

const isWishList = ref<boolean>(true);

const handleChangeWishList = (e: boolean) => {
  isWishList.value = e;
};

onMounted(async () => {
  const { data } = await useAsyncData("wishlists", () =>
    useWishlistStore.getWishlistByUserId()
  );
});
</script>
