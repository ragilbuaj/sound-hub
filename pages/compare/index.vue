<template>
  <div class="w-full h-min flex justify-center lg:my-10">
    <table
      class="w-full bg-white table table-pin-rows rounded-none"
      :class="selectedOptionLength == 1 ? 'lg:w-1/4' : 'lg:w-1/3'"
    >
      <thead>
        <tr class="w-full border bg-white">
          <th
            v-for="(item, index) in useSearchStore.selectedOption"
            class="relative p-2 border"
            :class="
              selectedOptionLength == 1
                ? 'w-full '
                : `w-1/${selectedOptionLength} lg:w-${selectedOptionLength}/6`
            "
          >
            <button
              class="absolute top-1 right-1 btn btn-sm rounded-full bg-transparent z-10 hover:bg-gray-100"
              @click="handleDropProduct(index)"
            >
              X
            </button>
            <div class="flex flex-col justify-center items-center">
              <img
                class="rounded max-w-32"
                :src="item.product_image_url"
                :alt="`${item.name} Image`"
              />
              <a class="text-[0.6rem] text-gray-900">{{ item.name }}</a>
            </div>
          </th>
        </tr>
      </thead>
      <tbody class="overflow-y-scroll h-full max-h-40">
        <tr class="w-full">
          <td
            v-for="item in useSearchStore.selectedOption"
            class="text-[0.6rem] text-gray-900 text-center border"
          >
            Rp{{ formatRupiah(item.price) }}
          </td>
        </tr>
        <tr class="w-full bg-gray-300">
          <td
            v-for="(item, index) in useSearchStore.selectedOption"
            class="text-[0.6rem] text-gray-900 bg-gray-300"
          >
            <span class="font-bold" :class="index !== 0 ? 'invisible' : ''">{{
              index == 0 ? "Shape" : ""
            }}</span>
          </td>
        </tr>
        <tr class="w-full">
          <td
            v-for="item in useSearchStore.selectedOption"
            class="text-[0.6rem] text-gray-900 text-center border"
          >
            {{ item.shape }}
          </td>
        </tr>
        <tr class="w-full bg-gray-300">
          <td
            v-for="(item, index) in useSearchStore.selectedOption"
            class="text-[0.6rem] text-gray-900 bg-gray-300"
          >
            <span class="font-bold" :class="index !== 0 ? 'invisible' : ''">{{
              index == 0 ? "Controls" : ""
            }}</span>
          </td>
        </tr>
        <tr class="w-full">
          <td
            v-for="item in useSearchStore.selectedOption"
            class="text-[0.6rem] text-gray-900 text-center border"
          >
            {{ item.controls }}
          </td>
        </tr>
        <tr class="w-full bg-gray-300">
          <td
            v-for="(item, index) in useSearchStore.selectedOption"
            class="text-[0.6rem] text-gray-900 bg-gray-300"
          >
            <span class="font-bold" :class="index !== 0 ? 'invisible' : ''">{{
              index == 0 ? "Features" : ""
            }}</span>
          </td>
        </tr>
        <tr class="w-full">
          <td
            v-for="item in useSearchStore.selectedOption"
            class="text-[0.6rem] text-gray-900 border"
          >
            <div v-for="feat in item.features?.split(', ')" class="flex">
              {{ `☑ ${feat}` }}
            </div>
          </td>
        </tr>
        <tr class="w-full bg-gray-300">
          <td
            v-for="(item, index) in useSearchStore.selectedOption"
            class="text-[0.6rem] text-gray-900 bg-gray-300"
          >
            <span class="font-bold" :class="index !== 0 ? 'invisible' : ''">{{
              index == 0 ? "Eartip" : ""
            }}</span>
          </td>
        </tr>
        <tr class="w-full">
          <td
            v-for="item in useSearchStore.selectedOption"
            class="text-[0.6rem] text-gray-900 text-center border"
          >
            {{ item.eartip }}
          </td>
        </tr>
        <tr class="w-full bg-gray-300">
          <td
            v-for="(item, index) in useSearchStore.selectedOption"
            class="text-[0.6rem] text-gray-900 bg-gray-300"
          >
            <span class="font-bold" :class="index !== 0 ? 'invisible' : ''">{{
              index == 0 ? "Battery life, buds only" : ""
            }}</span>
          </td>
        </tr>
        <tr class="w-full">
          <td
            v-for="item in useSearchStore.selectedOption"
            class="text-[0.6rem] text-gray-900 text-center border"
          >
            {{ item.batt_life_bud }} hr
          </td>
        </tr>
        <tr class="w-full bg-gray-300">
          <td
            v-for="(item, index) in useSearchStore.selectedOption"
            class="text-[0.6rem] text-gray-900 bg-gray-300"
          >
            <span class="font-bold" :class="index !== 0 ? 'invisible' : ''">{{
              index == 0 ? "Battery life, incld. case" : ""
            }}</span>
          </td>
        </tr>
        <tr class="w-full">
          <td
            v-for="item in useSearchStore.selectedOption"
            class="text-[0.6rem] text-gray-900 text-center border"
          >
            {{ item.batt_life_case }} hr
          </td>
        </tr>
        <tr class="w-full bg-gray-300">
          <td
            v-for="(item, index) in useSearchStore.selectedOption"
            class="text-[0.6rem] text-gray-900 bg-gray-300"
          >
            <span class="font-bold" :class="index !== 0 ? 'invisible' : ''">{{
              index == 0 ? "Charging port" : ""
            }}</span>
          </td>
        </tr>
        <tr class="w-full">
          <td
            v-for="item in useSearchStore.selectedOption"
            class="text-[0.6rem] text-gray-900 text-center border"
          >
            {{ item.charging_port }}
          </td>
        </tr>
        <tr class="w-full bg-gray-300">
          <td
            v-for="(item, index) in useSearchStore.selectedOption"
            class="text-[0.6rem] text-gray-900 bg-gray-300"
          >
            <span class="font-bold" :class="index !== 0 ? 'invisible' : ''">{{
              index == 0 ? "Wingtips" : ""
            }}</span>
          </td>
        </tr>
        <tr class="w-full">
          <td
            v-for="item in useSearchStore.selectedOption"
            class="text-[0.6rem] text-gray-900 text-center border"
          >
            {{ item.wingtips }}
          </td>
        </tr>
        <tr class="w-full bg-gray-300">
          <td
            v-for="(item, index) in useSearchStore.selectedOption"
            class="text-[0.6rem] text-gray-900 bg-gray-300"
          >
            <span class="font-bold" :class="index !== 0 ? 'invisible' : ''">{{
              index == 0 ? "Release year" : ""
            }}</span>
          </td>
        </tr>
        <tr class="w-full">
          <td
            v-for="item in useSearchStore.selectedOption"
            class="text-[0.6rem] text-gray-900 text-center border"
          >
            {{ item.release_year }}
          </td>
        </tr>
        <tr class="w-full bg-gray-300">
          <td
            v-for="(item, index) in useSearchStore.selectedOption"
            class="text-[0.6rem] text-gray-900 bg-gray-300"
          >
            <span class="font-bold" :class="index !== 0 ? 'invisible' : ''">{{
              index == 0 ? "Water & dust resistance" : ""
            }}</span>
          </td>
        </tr>
        <tr class="w-full">
          <td
            v-for="item in useSearchStore.selectedOption"
            class="text-[0.6rem] text-gray-900 text-center border"
          >
            {{ item.water_dust_resist }}
          </td>
        </tr>
        <tr class="w-full bg-gray-300">
          <td
            v-for="(item, index) in useSearchStore.selectedOption"
            class="text-[0.6rem] text-gray-900 bg-gray-300"
          >
            <span class="font-bold" :class="index !== 0 ? 'invisible' : ''">{{
              index == 0 ? "Supported codecs" : ""
            }}</span>
          </td>
        </tr>
        <tr class="w-full">
          <td
            v-for="item in useSearchStore.selectedOption"
            class="text-[0.6rem] text-gray-900 text-center border"
          >
            <div v-for="codec in item.codecs?.split('.')" class="flex">
              {{ `☑ ${codec}` }}
            </div>
          </td>
        </tr>
        <tr class="w-full bg-gray-300">
          <td
            v-for="(item, index) in useSearchStore.selectedOption"
            class="text-[0.6rem] text-gray-900 bg-gray-300"
          >
            <span class="font-bold" :class="index !== 0 ? 'invisible' : ''">{{
              index == 0 ? "Minimum latency" : ""
            }}</span>
          </td>
        </tr>
        <tr class="w-full">
          <td
            v-for="item in useSearchStore.selectedOption"
            class="text-[0.6rem] text-gray-900 text-center border"
          >
            {{ item.min_latency || "No info" }}
          </td>
        </tr>
        <tr class="w-full bg-gray-300">
          <td
            v-for="(item, index) in useSearchStore.selectedOption"
            class="text-[0.6rem] text-gray-900 bg-gray-300"
          >
            <span class="font-bold" :class="index !== 0 ? 'invisible' : ''">{{
              index == 0 ? "Company" : ""
            }}</span>
          </td>
        </tr>
        <tr class="w-full">
          <td
            v-for="item in useSearchStore.selectedOption"
            class="text-[0.6rem] text-gray-900 text-center border"
          >
            {{ item.company }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
const useSearchStore = searchStore();
const config = useRuntimeConfig();
const selectedOptionLength = computed(() => {
  return useSearchStore.selectedOption.length;
});

watch(
  () => useSearchStore.filter.name,
  async (newValue) => {
    if (newValue.length > 0) {
      const { data: products }: any = await useAsyncData(
        "search-products",
        () =>
          $fetch(`${config.public.apiBase}/product/filter`, {
            method: "get",
            query: { page: 1, size: 10, name: newValue },
          })
      );

      if (products.value.data.items) {
        useSearchStore.autocompleteOption = products.value.data.items;
      }
    } else {
      useSearchStore.autocompleteOption = [];
    }
  },
  { immediate: true }
);

const handleDropProduct = (index: number) => {
  useSearchStore.selectedOption.splice(index, 1);
};
</script>
