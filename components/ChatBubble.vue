<template>
  <div class="w-full flex flex-col gap-2 p-3 bg-white rounded-lg">
    <div class="flex justify-between">
      <div class="flex items-center gap-2">
        <div class="w-8">
          <img
            v-if="
              useAuthStore.authData.user_image_url &&
              useAuthStore.authData.user_image_url?.length > 0
            "
            :src="useAuthStore.authData.user_image_url"
            class="rounded-full"
            alt="user-image"
          />
          <img
            v-else
            :src="`https://ui-avatars.com/api/?name=${$props.username?.replace(
              / /g,
              '+'
            )}&background=0D8ABC&color=fff`"
            class="rounded-full"
            alt="avatar"
          />
        </div>
        <p class="text-black text-sm">
          {{ $props.username }}
        </p>
        <p class="text-gray-500 text-xs">
          {{ diffValue }}
        </p>
      </div>
      <div class="flex gap-1">
        <div
          class="badge bg-white border"
          :class="
            $props.sentiment == 'positive'
              ? 'text-green-700 border-green-700'
              : $props.sentiment == 'neutral'
              ? 'text-blue-700 border-blue-700'
              : $props.sentiment == 'negative'
              ? 'text-red-700 border-red-700'
              : ''
          "
        >
          {{ $props.sentiment }}
        </div>
        <div
          v-if="useAuthStore.authData.user_id.length > 0"
          class="dropdown dropdown-end"
        >
          <div tabindex="0" role="button" class="bg-transparent">
            <svg
              class="w-5 h-5"
              viewBox="0 0 32 32"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g data-name="Layer 2">
                <path
                  d="M16 7a2 2 0 1 1 2-2 2 2 0 0 1-2 2Zm0-2Zm0 0Zm0 0Zm0 0Zm0 0Zm0 0Zm0 0Zm0 0ZM16 18a2 2 0 1 1 2-2 2 2 0 0 1-2 2Zm0-2Zm0 0Zm0 0Zm0 0Zm0 0Zm0 0Zm0 0Zm0 0ZM16 29a2 2 0 1 1 2-2 2 2 0 0 1-2 2Zm0-2Zm0 0Zm0 0Zm0 0Zm0 0Zm0 0Zm0 0Zm0 0Z"
                />
              </g>
              <path style="fill: none" d="M0 0h32v32H0z" />
            </svg>
          </div>
          <ul
            tabindex="0"
            class="dropdown-content menu bg-base-100 rounded-md z-[1] w-max p-2 shadow"
          >
            <li>
              <button
                type="button"
                class="btn btn-sm"
                @click="handleClickReport($props.id)"
              >
                Report this review
              </button>
            </li>
            <li v-if="$props.user_id == useAuthStore.authData.user_id">
              <button
                type="button"
                class="btn btn-sm"
                @click="handleClickDelete($props.id)"
              >
                Delete
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="text-black text-sm text-pretty">
      {{ $props.review_content }}
    </div>
    <div class="flex items-center justify-between">
      <div class="text-gray-600 text-xs w-1/2">
        <p>No one has rated this review yet</p>
      </div>
      <div
        v-if="$props.user_id != useAuthStore.authData.user_id"
        class="w-1/2 flex justify-end"
      >
        <button
          type="button"
          class="btn bg-transparent border-none shadow-none outline-none rounded-full hover:bg-gray-200"
          @click="handleClickThumbs('like')"
        >
          <svg
            v-if="!userReview?.like"
            height="24"
            width="24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.653 21.126C7.293 21.653 6.687 22 6 22H4a2 2 0 0 1-2-2v-9a2 2 0 0 1 2-2h2a2 2 0 0 1 .57.083c1.074-1.565 4.685-5.509 5.65-6.71l.3-.374H13c.615 0 1.142.046 1.748.223C16.092 2.612 17 3.527 17 4.999c0 .52-.092 1.075-.262 1.69-.112.407-.25.819-.44 1.329l-.343.905-.028.076H19c1.87 0 3 1.318 3 3 0 5.944-1.245 10-4 10h-6.966a6.741 6.741 0 0 1-2.37-.382 4.885 4.885 0 0 1-1.01-.491ZM8 17.999c0 .902.452 1.419 1.337 1.735a4.81 4.81 0 0 0 1.626.266H18c1.015 0 2-3.21 2-8 0-.641-.309-1-1-1h-4c-1.195 0-1.444-.925-1.195-1.925.058-.235.144-.494.274-.845.057-.154.29-.765.344-.91.171-.46.293-.821.387-1.162.126-.457.19-.842.19-1.159 0-.45-.238-.69-.81-.857a3.501 3.501 0 0 0-.73-.128c-1.546 1.848-5.053 5.687-5.318 6.305-.098.227-.142.44-.142.68v7ZM4 11v9h2v-9H4Z"
              fill-rule="evenodd"
            />
          </svg>
          <svg
            v-else
            height="24"
            width="24"
            viewBox="0 0 512 512"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M128 447.1v-224c0-17.67-14.33-31.1-32-31.1H32c-17.67 0-32 14.33-32 31.1v223.1c0 17.67 14.33 31.1 32 31.1h64c17.7 1.8 32-11.7 32-30.2zm384-223c0-26.5-21.48-47.98-48-47.98H317.5c22.77-37.91 34.52-80.88 34.52-96.02C352 56.52 333.5 32 302.5 32c-63.13 0-26.36 76.15-108.2 141.6l-16.3 13c-11.8 9.5-17.8 23.4-17.9 37.4-.023.023 0 0 0 0l-.1 160c0 15.1 7.113 29.33 19.2 38.39l34.14 25.59C241 468.8 274.7 480 309.3 480H368c26.52 0 48-21.47 48-47.98 0-3.635-.48-7.143-1.246-10.55C434 415.2 448 397.4 448 376c0-9.148-2.697-17.61-7.139-24.88C463.1 347 480 327.5 480 304.1c0-12.5-4.893-23.78-12.72-32.32C492.2 270.1 512 249.5 512 224.1z"
            />
          </svg>
        </button>
        <button
          type="button"
          class="btn bg-transparent border-none shadow-none outline-none rounded-full hover:bg-gray-200"
          @click="handleClickThumbs('dislike')"
        >
          <svg
            v-if="!userReview?.dislike"
            height="24"
            width="24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6.57 14.917A2 2 0 0 1 6 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h2c.687 0 1.293.346 1.653.874.303-.197.642-.36 1.01-.492A6.702 6.702 0 0 1 11 2H18c2.755 0 4 4.056 4 10 0 1.682-1.13 3-3 3h-3.073l.028.076c.052.141.284.75.342.905.19.51.329.922.441 1.329.17.615.262 1.17.262 1.69 0 1.472-.908 2.386-2.252 2.778-.606.176-1.133.222-1.74.222h-.488l-.3-.374c-.964-1.201-4.574-5.144-5.65-6.709ZM8 13c0 .24.044.453.142.68.265.619 3.772 4.457 5.318 6.305.251-.019.488-.058.73-.128.572-.167.81-.406.81-.857 0-.317-.064-.702-.19-1.159a13.879 13.879 0 0 0-.387-1.162c-.054-.145-.287-.756-.344-.91a8.126 8.126 0 0 1-.274-.845c-.25-1 0-1.924 1.195-1.924h4c.691 0 1-.36 1-1 0-4.79-.985-8-2-8h-7.034a4.814 4.814 0 0 0-1.63.265C8.453 4.582 8 5.098 8 6v7ZM4 4v9h2V4H4Z"
              fill-rule="evenodd"
            />
          </svg>
          <svg
            v-else
            height="24"
            width="24"
            viewBox="0 0 512 512"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M96 32.04H32c-17.67 0-32 14.32-32 31.1v223.1c0 17.67 14.33 31.1 32 31.1h64c17.67 0 32-14.33 32-31.1V64.03c0-17.67-14.3-31.99-32-31.99zM467.3 240.2c7.8-8.5 12.7-19.8 12.7-32.3 0-23.47-16.87-42.92-39.14-47.09 4.44-7.21 7.14-15.71 7.14-25.71 0-21.32-14-39.18-33.25-45.43.75-2.55 1.25-6.06 1.25-9.69C416 53.47 394.5 32 368 32h-58.69c-34.61 0-68.28 11.22-95.97 31.98L179.2 89.57C167.1 98.63 160 112.9 160 127.1l.107 160s-.023-.023 0 0c.07 13.99 6.123 27.94 17.91 37.36l16.3 13.03C276.2 403.9 239.4 480 302.5 480c30.96 0 49.47-24.52 49.47-48.11 0-15.15-11.76-58.12-34.52-96.02H464c26.52 0 48-21.47 48-47.98 0-25.39-19.8-45.99-44.7-47.69z"
            />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import moment from "moment";

export interface Props {
  index: number;
  id: string;
  review_content: string;
  sentiment: string;
  like_count: number;
  dislike_count: number;
  created_at: string;
  user_id: string;
  username: string;
  user_image_url: string;
  rated_review: any;
}

const props = defineProps<Props>();
const useAuthStore = authStore();
const useReviewStore = reviewStore();
const userReview = computed(() => {
  return props.rated_review?.find(
    (review: any) => review.user_id == useAuthStore.authData.user_id
  );
});
const userReviewIndex = props.rated_review?.findIndex(
  (review: any) => review.user_id == useAuthStore.authData.user_id
);

const dateNow = moment();
const createdDate = moment(props.created_at);
const diffYears = dateNow.diff(createdDate, "years");
const diffMonths = dateNow.diff(createdDate, "months");
const diffWeeks = dateNow.diff(createdDate, "weeks");
const diffDays = dateNow.diff(createdDate, "days");
const diffHours = dateNow.diff(createdDate, "hours");
const diffMinutes = dateNow.diff(createdDate, "minutes");

let diffValue: string;
if (diffYears >= 1) {
  diffValue = `${diffYears} years ago`;
} else if (diffMonths >= 1) {
  diffValue = `${diffMonths} months ago`;
} else if (diffWeeks >= 1) {
  diffValue = `${diffWeeks} weeks ago`;
} else if (diffDays >= 1) {
  diffValue = `${diffDays} days ago`;
} else if (diffHours >= 1) {
  diffValue = `${diffHours} hours ago`;
} else if (diffMinutes >= 1) {
  diffValue = `${diffMinutes} minutes ago`;
} else {
  diffValue = `a moment ago`;
}

const emit = defineEmits(["clicked"]);

const handleClickThumbs = async (type: string) => {
  if (authStore().authData.user_id.length <= 0) {
    emit("clicked", "modal-open");
  } else {
    useReviewStore.form.review_id = props.id;
    useReviewStore.form.user_id = useAuthStore.authData.user_id;
    useReviewStore.form.id = userReview.value.id;

    let rate: any;

    if (type == "like") {
      useReviewStore.form.like = true;
      rate = await useReviewStore.rateReview("like");
      useReviewStore.resetForm();
    } else if (type == "dislike") {
      useReviewStore.form.dislike = true;
      rate = await useReviewStore.rateReview("dislike");
      useReviewStore.resetForm();
    }

    if (userReview) {
      useReviewStore.datas[props.index].rated_review[userReviewIndex] = rate;
    } else {
      useReviewStore.datas[props.index].rated_review.push(rate);
    }
  }
};

const handleClickReport = async (id: string) => {
  await useReviewStore.reportReview(id);
};

const handleClickDelete = async (id: string) => {
  await useReviewStore.deleteReview(id);
  useReviewStore.datas = useReviewStore.datas.filter(
    (review: any) => review.id !== props.id
  );
};
</script>
