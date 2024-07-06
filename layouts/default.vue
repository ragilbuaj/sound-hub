<template>
  <LoadingIndicator :show-wave="useAuthStore.isLoading" />
  <NuxtLoadingIndicator
    v-if="useProductStore.isLoading || useWishlistStore.isLoading"
  />
  <div class="w-full h-dvh bg-[#1f2937]">
    <SideBar />
  </div>
</template>

<script setup lang="ts">
const useAuthStore = authStore();
const useProductStore = productStore();
const useWishlistStore = wishlistStore();
const router = useRouter();
const route = useRoute();
</script>
