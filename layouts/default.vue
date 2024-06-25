<template>
  <LoadingIndicator :show-wave="useAuthStore.isLoading" />
  <div
    class="relative flex flex-col lg:flex-row w-full h-dvh"
    :class="useAuthStore.isLoading ? 'blur-sm' : ''"
  >
    <SideBar :active-tab="route.path" :store="useProductStore" />
    <div class="h-full w-full flex flex-col">
      <div class="hidden lg:flex px-8 py-6 justify-between items-center">
        <InputSearch :store="useProductStore" />
        <button
          v-if="useAuthStore.authData.user_id.length <= 0"
          type="button"
          class="inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
          @click="handleClickLoginButton()"
        >
          <span
            class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0"
          >
            Login
          </span>
        </button v-else>
        <Avatar :is-show="useAuthStore.authData.user_id.length > 0" :username="useAuthStore.authData.username" :email="useAuthStore.authData.email" :user_img_url="useAuthStore.authData.user_image_url"/>
      </div>
      <slot />
    </div>
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

const handleClickLoginButton = () => {
  router.push("/login");
};
</script>
