<template>
  <div class="w-full h-full px-2 py-6 flex flex-col gap-2 lg:flex-row lg:gap-6">
    <ModalLogin :show-modal="showModal" @close-modal="handleCloseModal" />
    <div class="lg:w-1/2 lg:flex lg:flex-col lg:gap-4">
      <div class="hidden items-center gap-4 lg:flex">
        <button
          class="flex items-center gap-1 btn btn-sm bg-white text-[#6d31edff] rounded-full hover:bg-[#6d31edff] hover:text-white"
          @click="handleClickBack()"
        >
          <p class="font-bold text-base"><-</p>
          <p>Back</p>
        </button>
        <div class="flex items-center gap-2 text-sm">
          Dashboard
          <svg
            data-name="Layer 1"
            class="w-3 h-3"
            viewBox="0 0 512 512"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="m214.78 478-20.67-21.57L403.27 256 194.11 55.57 214.78 34l231.68 222Zm103.11-222L86.22 34 65.54 55.57 274.7 256 65.54 456.43 86.22 478Z"
              fill="#fff"
            />
          </svg>
          <span class="text-white">{{
            useProductStore.productDetail.name
          }}</span>
        </div>
      </div>
      <img
        :src="useProductStore.productDetail.product_image_url"
        :alt="`${useProductStore.productDetail.name} image`"
        class="w-full h-full max-w-full max-h-60 object-fill rounded-xl lg:max-h-80"
      />

      <div class="hidden lg:flex lg:flex-col lg:gap-2">
        <p class="text-lg">
          Product you might like from
          <span class="font-bold">{{
            useProductStore.productDetail.company
          }}</span>
        </p>
        <Carousel />
      </div>
    </div>

    <div class="flex flex-col gap-3 text-white lg:w-1/2">
      <div class="badge bg-[#6d31edff] text-white">
        {{ useProductStore.productDetail.company }}
      </div>
      <div class="flex justify-between gap-2">
        <h2 class="text-xl">
          {{ useProductStore.productDetail.name }}
        </h2>
        <button
          class="hidden btn btn-sm rounded-full bg-white text-secondary text-xs lg:flex"
        >
          <svg
            class="w-3 h-3 text-[#FF56A5] lg:w-4 lg:h-4"
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
          Add to wishlist
        </button>
      </div>
      <div class="flex items-center gap-2">
        <div
          class="badge bg-white font-semibold text-green-700 border border-green-700"
        >
          {{ useProductStore.productDetail.sentiment || "No review" }}
        </div>
        <p>5K+ Reviews</p>
      </div>
      <p class="text-pretty">
        {{ useProductStore.productDetail.description }}
      </p>
      <div class="flex justify-between">
        <h3 class="text-2xl">
          {{ `Rp${formatRupiah(useProductStore.productDetail.price)}` }}
        </h3>
        <button
          class="btn btn-sm rounded-full bg-white text-secondary text-xs lg:hidden"
        >
          <svg
            class="w-3 h-3 text-[#FF56A5] lg:w-4 lg:h-4"
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
            /></svg
          >Add to wishlist
        </button>
      </div>
      <hr class="w-1/2" />
      <div class="badge badge-neutral p-4 mt-2">
        {{ "Product details" }}
      </div>
      <div class="grid grid-cols-2 gap-2">
        <div class="flex flex-col gap-2">
          <div class="flex flex-col gap-1">
            <p class="font-semibold">Shape</p>
            <p>{{ useProductStore.productDetail.shape }}</p>
          </div>
          <div class="flex flex-col gap-1">
            <p class="font-semibold">Controls</p>
            <p>{{ useProductStore.productDetail.controls }}</p>
          </div>
          <div class="flex flex-col gap-1">
            <p class="font-semibold">Eartips</p>
            <p>{{ useProductStore.productDetail.eartip }}</p>
          </div>
          <div class="flex flex-col gap-1">
            <p class="font-semibold">Battery life, buds only</p>
            <p>{{ useProductStore.productDetail.batt_life_bud }} hr</p>
          </div>
          <div class="flex flex-col gap-1">
            <p class="font-semibold">Battery life, incl. case</p>
            <p>{{ useProductStore.productDetail.batt_life_case }} hr</p>
          </div>
        </div>
        <div class="flex flex-col gap-2">
          <div class="flex flex-col gap-1">
            <p class="font-semibold">Charging port</p>
            <p>{{ useProductStore.productDetail.charging_port }}</p>
          </div>
          <div class="flex flex-col gap-1">
            <p class="font-semibold">Wingtips</p>
            <p>{{ useProductStore.productDetail.wingtips }}</p>
          </div>
          <div class="flex flex-col gap-1">
            <p class="font-semibold">Release year</p>
            <p>{{ useProductStore.productDetail.release_year }}</p>
          </div>
          <div class="flex flex-col gap-1">
            <p class="font-semibold">Water dust resistance</p>
            <p>{{ useProductStore.productDetail.water_dust_resist }}</p>
          </div>
          <div class="flex flex-col gap-1">
            <p class="font-semibold">Minimum latency</p>
            <p>
              {{
                useProductStore.productDetail.min_latency == 0
                  ? useProductStore.productDetail.min_latency
                  : "No info"
              }}
            </p>
          </div>
        </div>
        <div class="flex flex-col gap-2 col-span-2">
          <p class="font-semibold">Features</p>
          <div class="flex flex-wrap gap-6">
            <div
              v-for="item in useProductStore.productDetail.features?.split(
                ', '
              )"
              class="flex items-center gap-2"
            >
              <svg height="18" width="18" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M16 0H2C.9 0 0 .9 0 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V2c0-1.1-.9-2-2-2ZM7 14 2 9l1.4-1.4L7 11.2l7.6-7.6L16 5l-9 9Z"
                  fill="#6d31edff"
                  fill-rule="evenodd"
                  class="fill-000000"
                />
              </svg>
              <p class="text-sm">{{ item }}</p>
            </div>
          </div>
        </div>
        <div class="flex flex-col col-span-2 gap-2">
          <p class="font-semibold">Codecs</p>
          <div class="flex flex-wrap gap-6">
            <div
              v-for="item in useProductStore.productDetail.codecs?.split(',')"
              class="flex items-center gap-2"
            >
              <svg height="18" width="18" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M16 0H2C.9 0 0 .9 0 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V2c0-1.1-.9-2-2-2ZM7 14 2 9l1.4-1.4L7 11.2l7.6-7.6L16 5l-9 9Z"
                  fill="#6d31edff"
                  fill-rule="evenodd"
                  class="fill-000000"
                />
              </svg>
              <p class="text-sm">{{ item }}</p>
            </div>
          </div>
        </div>
      </div>
      <hr class="w-1/2" />
      <div class="lg:hidden">
        <p>
          Other product from
          <span class="font-bold">{{
            useProductStore.productDetail.company
          }}</span>
        </p>
        <Carousel />
      </div>
      <div class="flex flex-col gap-6">
        <div class="">
          <h3 class="text-2xl font-bold">Reviews</h3>
          <div class="text-sm text-center">Theres no review yet</div>
        </div>
        <div class="flex flex-col gap-2">
          <InputTextArea
            :model="review"
            :for="'review'"
            :placeholder="'Share your review'"
            :is-required="false"
            @input="handleInputReview($event)"
          />
          <button
            class="btn btn-sm text-white bg-[#6d31edff] lg:w-1/5 lg:self-end"
            @click="handleClickSubmit()"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: false });

const useProductStore = productStore();
const route = useRoute();
const review = ref("");
const showModal = ref<string>("");

onMounted(async () => {
  await useProductStore.getProductDetail(route.params.id as string);
});

const handleClickBack = () => {
  navigateTo("/");
};

const handleInputReview = (e: string) => {
  review.value = e;
};

const handleClickSubmit = () => {
  if (review.value.length > 0) {
    if (authStore().authData.user_id.length <= 0) {
      showModal.value = "modal-open";
    }
  }
};

const handleCloseModal = () => {
  showModal.value = "";
};
</script>
