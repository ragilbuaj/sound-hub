<template>
  <ul
    class="w-full h-full flex flex-wrap justify-center gap-5 bg-inherit p-2 py-10 overflow-auto no-scrollbar lg:gap-10"
  >
    <li
      class="flex p-2"
      v-for="product in useProductStore.datas"
      :key="product.id"
    >
      <ProductCard
        :productId="product.id"
        :isWishList="isWishList"
        @update="handleChangeWishList($event)"
      />
    </li>
  </ul>
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
