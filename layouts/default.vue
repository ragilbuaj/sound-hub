<template>
  <LoadingIndicator
    :show-wave="useAuthStore.isLoading || useProductStore.isLoading"
  />
  <div class="w-full h-dvh">
    <SideBar />
  </div>
</template>

<script setup lang="ts">
const useAuthStore = authStore();
const useProductStore = productStore();
const router = useRouter();
const route = useRoute();

onMounted(async () => {
  await useAuthStore.getUser();
});
</script>
