<template>
  <div class="w-full h-full flex flex-col py-6 overflow-hidden">
    <div
      class="w-full h-full flex flex-wrap justify-between px-8 overflow-auto no-scrollbar md:justify-between md:gap-6"
    >
      <ProductCard
        v-for="product in useProductStore.datas"
        :key="product.id"
        :productId="product.id"
        :isWishList="isWishList"
        @update="handleChangeWishList($event)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const useAuthStore = authStore();
const useProductStore = productStore();
const router = useRouter();

onMounted(async () => {
  await useProductStore.getAllProducts();
});

const isWishList = ref<boolean>(false);

const handleChangeWishList = (e: boolean) => {
  isWishList.value = e;
};
</script>
