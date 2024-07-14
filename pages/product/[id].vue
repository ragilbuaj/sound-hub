<template>
  <div class="w-full h-full px-2 py-6 flex flex-col gap-2 lg:flex-row lg:gap-6">
    <ModalLogin :show-modal="showModal" @close-modal="handleCloseModal" />
    <div class="lg:w-2/5 lg:flex lg:flex-col lg:gap-4">
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
        <div class="overflow-auto">
          <Carousel
            :data="recommendationProduct.filter((item: any) => item.id !== useProductStore.productDetail.id)"
          />
        </div>
      </div>
    </div>

    <div class="flex flex-col gap-3 text-white lg:w-3/5">
      <div class="badge bg-[#6d31edff] text-white">
        {{ useProductStore.productDetail.company }}
      </div>
      <div class="flex justify-between gap-2">
        <h2 class="text-xl">
          {{ useProductStore.productDetail.name }}
        </h2>
        <button
          v-if="!userWishlist"
          class="hidden btn btn-sm rounded-full bg-white text-secondary text-xs lg:flex"
          @click="handleChangeWishList()"
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
        <button
          v-else
          class="hidden btn btn-sm rounded-full bg-white text-secondary text-xs lg:flex"
          @click="handleChangeWishList()"
        >
          <svg
            class="w-3 h-3 text-[#FF56A5] lg:w-4 lg:h-4"
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
          Drop from wishlist
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
          v-if="!userWishlist"
          class="btn btn-sm rounded-full bg-white text-secondary text-xs lg:hidden"
          @click="handleChangeWishList()"
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
        <button
          v-else
          class="btn btn-sm rounded-full bg-white text-secondary text-xs lg:hidden"
          @click="handleChangeWishList()"
        >
          <svg
            class="w-3 h-3 text-[#FF56A5] lg:w-4 lg:h-4"
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
          Drop from wishlist
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
              v-for="item in useProductStore.productDetail.codecs?.split('.')"
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
      <div class="flex flex-col gap-2 lg:hidden">
        <p>
          Product you might like from
          <span class="font-bold">{{
            useProductStore.productDetail.company
          }}</span>
        </p>
        <div class="overflow-auto">
          <Carousel
            :data="recommendationProduct.filter((item: any) => item.id !== useProductStore.productDetail.id)"
          />
        </div>
      </div>
      <div class="flex flex-col gap-6">
        <div class="flex flex-col gap-2">
          <h3 class="text-2xl font-bold">Reviews</h3>
          <div
            v-if="useReviewStore.datas.length > 0"
            ref="container"
            class="w-full h-full max-h-72 lg:max-h-96 flex flex-col gap-2 overflow-auto no-scrollbar"
          >
            <ChatBubble
              v-for="(review, index) in useReviewStore.datas"
              :key="review.id"
              :index="index"
              :user_id="review.user_id"
              :username="review.user.username"
              :user_image_url="review.user.user_image_url"
              :review_content="review.review_content"
              :id="review.id"
              :like_count="review.like_count"
              :dislike_count="review.dislike_count"
              :sentiment="review.sentiment"
              :created_at="review.created_at"
              :rated_review="review.rated_review"
              @clicked="handleClickThumbs($event)"
            />
          </div>
          <div v-else class="text-sm text-center">Theres no review yet</div>
          <div v-if="useReviewStore.isLoading" class="text-sm text-center">
            <span class="loading loading-dots loading-xs"></span>
          </div>
        </div>
        <div class="flex flex-col gap-2">
          <InputTextArea
            :model="useReviewStore.form.review_content"
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
const useWishlistStore = wishlistStore();
const useReviewStore = reviewStore();
const useAuthStore = authStore();
const route = useRoute();
const showModal = ref<string>("");
const recommendationProduct = ref([]);
const isLoadingMore = ref(false);
const isEndOfList = ref(false);
const config = useRuntimeConfig();
const container = ref<HTMLElement | null>(null);

onMounted(async () => {
  useReviewStore.datas = [];
  useReviewStore.page = 1;
  await Promise.all([
    useProductStore.getProductDetail(route.params.id as string),
    useReviewStore.getReviewsByProductId(route.params.id as string),
  ]);
  recommendationProduct.value = await useProductStore.getRecommendationProduct(
    useProductStore.productDetail.company
  );
});

const fetchProducts = async () => {
  if (!isEndOfList.value && !isLoadingMore.value) {
    try {
      isLoadingMore.value = true;
      isEndOfList.value = false;

      useReviewStore.page += 1;

      let reviews = [];

      try {
        const { data, error }: any = await useAsyncData("reviews", () =>
          $fetch(`${config.public.apiBase}/reviews/product-id`, {
            method: "get",
            query: {
              page: useReviewStore.page,
              size: useReviewStore.size,
              product_id: route.params.id,
            },
          })
        );

        reviews = data.value.data.items;
      } catch (error: any) {
        if (error.response && error.response.status === 404) {
          console.error("Error 404: Data not found");
          isEndOfList.value = true;
        } else {
          console.error("Error fetching reviews:", error);
        }
        return;
      }

      if (reviews.length > 0) {
        const existingReviews = new Set(
          useReviewStore.datas.map((p: any) => p.id)
        );
        const newReviews = reviews.filter(
          (review: any) => !existingReviews.has(review.id)
        );

        if (newReviews.length > 0) {
          useReviewStore.datas.push(...newReviews);
        } else {
          isEndOfList.value = true;
        }
      } else {
        isEndOfList.value = true;
      }
    } catch (error) {
      console.error("Error fetching reviews:", error);
    } finally {
      isLoadingMore.value = false;
    }
  }
};

useInfiniteScroll(container, fetchProducts, {
  distance: 10,
});

const userWishlist = computed(() => {
  return useProductStore.productDetail?.wishlist?.find(
    (wishlist: any) => wishlist.user_id == useAuthStore.authData.user_id
  );
});

const handleClickBack = () => {
  navigateTo("/");
};

const handleInputReview = (e: string) => {
  useReviewStore.form.review_content = e;
};

const handleClickSubmit = async () => {
  if (useReviewStore.form.review_content.length > 0) {
    if (useAuthStore.authData.user_id.length <= 0) {
      showModal.value = "modal-open";
    }

    useReviewStore.form.user_id = useAuthStore.authData.user_id;
    useReviewStore.form.product_id = route.params.id as string;
    const review = await useReviewStore.addReview();

    if (review) {
      useReviewStore.resetForm();
      await useReviewStore.getReviewsByProductId(route.params.id as string);
    }
  }
};

const handleCloseModal = () => {
  showModal.value = "";
};

const handleClickThumbs = (e: string) => {
  showModal.value = e;
};

const handleChangeWishList = async () => {
  if (useAuthStore.authData.user_id.length <= 0) {
    showModal.value = "modal-open";
  }

  if (userWishlist.value) {
    const data = await useWishlistStore.deleteWishlist(
      userWishlist.value?.id as string
    );

    if (data) {
      useProductStore.productDetail.wishlist =
        useProductStore.productDetail?.wishlist?.filter((item: any) => {
          item.id !== data.id;
        });
    }
  } else {
    const data = await useWishlistStore.addWishlist({
      user_id: useAuthStore.authData.user_id as string,
      product_id: useProductStore.productDetail.id,
    });

    if (data) {
      useProductStore.productDetail?.wishlist?.push({
        id: data.id,
        user_id: data.user_id,
      });
    }
  }
};
</script>
