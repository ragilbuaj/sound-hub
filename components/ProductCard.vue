<template>
  <div
    v-if="product"
    class="product-card w-full h-full box-border max-h-62 max-w-80 flex flex-col justify-between mt-6 bg-neutral-300 border border-gray-200 rounded-lg shadow-md shadow-purple-800 cursor-pointer lg:max-h-96 lg:max-w-64 lg:transition lg:ease-in-out lg:hover:scale-[1.03] lg:hover:bg-purple-800 lg:hover:transform-origin-center dark:bg-neutral-300 dark:border-gray-700"
  >
    <img
      class="p-3 rounded-t-lg w-max lg:p-5"
      src="https://placehold.co/300"
      alt="product image"
    />
    <div class="h-full flex flex-col px-4 pb-2 lg:px-4 lg:justify-between">
      <a href="#" class="">
        <h5
          class="text-lg text-wrap font-semibold tracking-tighter text-gray-900 lg:text-base dark:text-black"
        >
          {{ product.name }}
        </h5>
      </a>
      <div class="flex justify-between items-center lg:h-1/6">
        <span
          class="text-base font-semibold text-gray-900 lg:text-base dark:text-black"
          >Rp{{ product.price }}</span
        >
      </div>
      <div class="h-full content-end self-end lg:h-2/6">
        <button type="button" @click="handleChangeWishList">
          <svg
            v-if="!$props.isWishList"
            class="w-10 h-10 text-[#FF56A5] lg:w-7 lg:h-7 dark:text-[#FF56A5]"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z"
            />
          </svg>

          <svg
            v-else
            class="w-10 h-10 text-[#FF56A5] lg:w-7 lg:h-7 dark:text-[#FF56A5]"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              d="m12.75 20.66 6.184-7.098c2.677-2.884 2.559-6.506.754-8.705-.898-1.095-2.206-1.816-3.72-1.855-1.293-.034-2.652.43-3.963 1.442-1.315-1.012-2.678-1.476-3.973-1.442-1.515.04-2.825.76-3.724 1.855-1.806 2.201-1.915 5.823.772 8.706l6.183 7.097c.19.216.46.34.743.34a.985.985 0 0 0 .743-.34Z"
            />
          </svg>
        </button>
      </div>
    </div>
  </div>
  <div v-else>Loading ...</div>
</template>

<script setup lang="ts">
export interface Props {
  isWishList: boolean;
  productId: string;
}

const props = defineProps<Props>();

const emit = defineEmits(["update"]);

const handleChangeWishList = () => {
  emit("update", !props.isWishList as boolean);
};

const useProductStore = productStore();

const product = computed(() => {
  return useProductStore.datas.find(
    (product) => product.id === props.productId
  );
});

onMounted(() => {
  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      observer.disconnect();
    }
  });

  observer.observe(document.querySelector(".product-card") as Element);
});
</script>
