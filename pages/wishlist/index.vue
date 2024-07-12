<template>
  <Toast
    :show-toast="productStore().showToast"
    :message="productStore().messageToast"
    :isWishlist="true"
    :type-changes="productStore().changesToast"
  />
  <div
    v-if="useWishlistStore.isLoading"
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
      v-if="useWishlistStore.datas?.length > 0"
      v-for="(product, index) in useWishlistStore.datas"
      :key="product.id"
      :productId="product.product?.id as string"
      :productIndex="index"
      :isWishList="isWishList"
      @update="handleChangeWishList"
    />

    <div v-if="isLoadingMore" class="col-span-2 lg:col-span-4">
      <span class="loading loading-dots loading-lg"></span>
    </div>

    <div
      v-else-if="useWishlistStore.datas?.length <= 0 || !useWishlistStore.datas"
      class="col-span-2 lg:col-span-4"
    >
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

useHead({
  title: "Wishlist",
});

const useWishlistStore = wishlistStore();
const isWishList = ref<boolean>(true);
const config = useRuntimeConfig();
const cookieAccessToken = useCookie("access_token");
const route = useRoute();
const container = ref<HTMLElement | null>(null);

const isLoadingMore = ref(false);
const isEndOfList = ref(false);

const fetchProducts = async () => {
  if (!isEndOfList.value && !isLoadingMore.value) {
    try {
      isLoadingMore.value = true;
      isEndOfList.value = false;

      useWishlistStore.page += 1;

      let wishlist = [];

      try {
        const { data: wishlists, error }: any = await useAsyncData(
          "wishlist",
          () =>
            $fetch(`${config.public.apiBase}/wishlist`, {
              method: "get",
              headers: {
                Authorization: "Bearer " + cookieAccessToken.value,
              },
              query: {
                page: useWishlistStore.page,
                size: useWishlistStore.size,
                user_id: authStore().authData.user_id,
              },
            })
        );

        wishlist = wishlists.value?.data?.items || [];
      } catch (error: any) {
        if (error.response && error.response.status === 404) {
          console.error("Error 404: Data not found");
          isEndOfList.value = true;
        } else {
          console.error("Error fetching wishlists:", error);
        }
        return;
      }

      if (wishlist.length > 0) {
        const existingProductIds = new Set(
          useWishlistStore.datas.map((p: any) => p.id)
        );
        const newWishlist = wishlist.filter(
          (product: any) => !existingProductIds.has(product.id)
        );

        if (newWishlist.length > 0) {
          useWishlistStore.datas.push(...newWishlist);
        } else {
          isEndOfList.value = true;
        }
      } else {
        isEndOfList.value = true;
      }
    } catch (error) {
      console.error("Error fetching wishlists:", error);
    } finally {
      isLoadingMore.value = false;
    }
  }
};

const handleChangeWishList = (e: boolean) => {
  isWishList.value = e;
};

onMounted(async () => {
  useWishlistStore.page = 1;
  await useWishlistStore.getWishlistByUserId();
});

useInfiniteScroll(container, fetchProducts, {
  distance: 10,
});
</script>
