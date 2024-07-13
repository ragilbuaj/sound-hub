<template>
  <Swiper
    :modules="[SwiperNavigation, SwiperPagination]"
    :slides-per-view="4"
    :spaceBetween="10"
    :navigation="true"
    class="my-swiper w-full h-full max-h-44"
  >
    <SwiperSlide
      v-for="(item, index) in $props.data"
      :key="index"
      class="flex justify-center items-center lg:max-h-48 bg-white rounded-md"
    >
      <img
        :src="item.product_image_url"
        :alt="item.name + 'image'"
        class="cursor-pointer w-full max-h-16 lg:max-h-20 rounded-t-md"
      />
      <div class="p-1 h-full flex flex-col gap-1">
        <p class="text-[0.6rem] md:text-xs text-black font-semibold">
          {{ item.name }}
        </p>
        <p class="text-[0.6rem] md:text-xs text-black">
          Rp{{ formatRupiah(item.price) }}
        </p>
      </div>
    </SwiperSlide>
  </Swiper>
</template>

<script setup lang="ts">
export interface Props {
  data: any;
}

const props = defineProps<Props>();
</script>

<style></style>
