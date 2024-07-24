<template>
  <div v-if="route.path == '/compare'" class="relative w-1/2 mx-auto flex-col">
    <label
      class="input input-bordered h-10 flex items-center gap-2 text-gray-900 bg-gray-50"
    >
      <input
        type="text"
        class="grow"
        :placeholder="
          useSearchStore.selectedOption.length == 3
            ? 'Max product 3'
            : 'Add product'
        "
        v-model="model"
        @input="handleInputSearch()"
        :disabled="useSearchStore.selectedOption.length == 3"
      />
    </label>

    <div
      class="absolute top-12 w-full max-h-40 bg-white rounded-md overflow-auto no-scrollbar z-20"
    >
      <div v-for="(item, index) in $props.data" class="cursor-pointer">
        <div
          class="flex items-center p-1 gap-2 lg:hover:bg-gray-500"
          @click="handleClickOption(item)"
        >
          <img
            class="w-8 rounded"
            :src="item.product_image_url"
            :alt="`${item.name} Image`"
          />
          <p class="text-[0.6rem] lg:text-sm text-gray-900">{{ item.name }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
export interface Props {
  data: any;
  model: any;
}

const props = defineProps<Props>();
const route = useRoute();

const useSearchStore = searchStore();
const model = ref(props.model);
const config = useRuntimeConfig();

watch(
  () => route.path,
  (newPath, oldPath) => {
    if (oldPath !== newPath) {
      model.value = "";
      useSearchStore.resetFilter();
    }
  }
);

watchEffect(() => {
  model.value = props.model;
});

const handleInputSearch = () => {
  useSearchStore.filter.name = model.value;
};

const handleClickOption = async (product: any) => {
  const { data: productDetail, error }: any = await useAsyncData(
    "product-detail",
    () =>
      $fetch(`${config.public.apiBase}/product`, {
        method: "get",
        query: { product_id: product.id },
      })
  );
  if (productDetail) {
    useSearchStore.selectedOption.push(productDetail.value.data);
    useSearchStore.autocompleteOption = [];
    useSearchStore.filter.name = "";
  }
};
</script>
