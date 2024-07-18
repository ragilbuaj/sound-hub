<template>
  <div class="w-full h-full flex justify-center gap-2 py-5">
    <div class="hidden 1/4 lg:block">
      <button
        type="button"
        class="btn btn-sm bg-white text-gray-900 rounded-full"
        @click="handleClickBack()"
      >
        Back
      </button>
    </div>
    <div class="w-full lg:w-3/4 flex flex-col gap-2">
      <div class="card card-compact bg-gray-50 w-full shadow-xl">
        <div class="card-body text-gray-900">
          <div class="flex justify-between">
            <div class="flex items-center gap-2">
              <div class="size-8">
                <img
                  v-if="
                    useThreadStore.threadDetail?.user?.user_image_url &&
                    useThreadStore.threadDetail?.user?.user_image_url?.length >
                      0
                  "
                  class="rounded-full"
                  :src="useThreadStore.threadDetail?.user.user_image_url"
                  alt="avatar"
                />
                <img
                  v-else
                  class="rounded-full"
                  :src="`https://ui-avatars.com/api/?name=${useThreadStore.threadDetail?.user?.username?.replace(
                    / /g,
                    '+'
                  )}&background=0D8ABC&color=fff`"
                  alt="avatar"
                />
              </div>
              <div class="font-semibold">
                {{ useThreadStore.threadDetail?.user?.username }}
              </div>
            </div>
          </div>
          <h2 class="card-title">{{ useThreadStore.threadDetail?.title }}</h2>
          <p class="font-semibold">
            {{ useThreadStore.threadDetail?.content }}
          </p>
          <figure>
            <img
              v-if="useThreadStore.threadDetail?.image_url"
              class="w-full h-40 lg:h-72 rounded"
              :src="useThreadStore.threadDetail?.image_url"
              alt="thread-image"
            />
          </figure>
        </div>
      </div>
      <div class="flex justify-between mt-4">
        <h2 class="lg:text-2xl">Comment</h2>
        <button
          type="button"
          class="btn btn-sm bg-purple-700 text-white"
          @click="handleClickWrite('comment', null)"
        >
          Write comment
        </button>
      </div>
      <div
        ref="container"
        class="comment-section w-full h-max max-h-96 mx-auto p-4 bg-white text-gray-900 shadow-md rounded-lg overflow-y-scroll no-scrollbar"
      >
        <Comment
          v-for="item in useCommentStore.datas"
          :key="item.id"
          :comment="item"
          :maxDepth="3"
        />
        <div v-if="isLoadingMore" class="w-full flex justify-center mt-4">
          <span class="loading loading-dots loading-lg"></span>
        </div>
        <div
          v-else-if="useCommentStore.datas.length <= 0"
          class="w-full flex justify-center mt-4"
        >
          <p class="text-sm text-center text-black dark:text-white">
            No comments yet.
          </p>
        </div>
      </div>
    </div>
  </div>
  <dialog
    id="comment-modal"
    class="modal modal-bottom lg:modal-middle text-white"
    :class="modalOpen"
  >
    <div class="modal-box">
      <form method="dialog">
        <button
          class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          @click="handleCloseModal()"
        >
          ✕
        </button>
      </form>
      <form @submit.prevent="handleSubmit()" class="p-2">
        <textarea
          v-model="useCommentStore.form.text"
          class="textarea textarea-bordered w-full"
          placeholder="Write your comment..."
          required
        ></textarea>
        <div class="text-right">
          <button type="submit" class="btn btn-sm bg-purple-700 text-white">
            Submit
          </button>
        </div>
      </form>
    </div>
  </dialog>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";

definePageMeta({
  layout: false,
});

const useThreadStore = threadStore();
const useCommentStore = commentStore();
const route = useRoute();
const config = useRuntimeConfig();
const modalOpen = ref("");
const container = ref<HTMLElement | null>(null);

const isLoadingMore = ref(false);
const isEndOfList = ref(false);

const fetchComments = async () => {
  if (!isEndOfList.value && !isLoadingMore.value) {
    try {
      isLoadingMore.value = true;
      isEndOfList.value = false;

      useCommentStore.page += 1;

      let comments = [];

      try {
        const { data: newComments, error }: any = await useAsyncData(
          "comments",
          () =>
            $fetch(`${config.public.apiBase}/comments-thread`, {
              method: "get",
              headers: {
                Authorization: "Bearer " + authStore().authData.access_token,
              },
              query: {
                thread_id: route.params.id,
                page: useCommentStore.page,
                size: useCommentStore.size,
              },
            })
        );

        comments = newComments.value?.data || [];
      } catch (error: any) {
        if (error.response && error.response.status === 404) {
          console.error("Error 404: Data not found");
          isEndOfList.value = true;
        } else {
          console.error("Error fetching comments:", error);
        }
        return;
      }

      if (comments.length > 0) {
        const existingCommentIds = new Set(
          useCommentStore.datas.map((c: any) => c.id)
        );
        const newCommentList = comments.filter(
          (comment: any) => !existingCommentIds.has(comment.id)
        );

        if (newCommentList.length > 0) {
          useCommentStore.datas.push(...newCommentList);
        } else {
          isEndOfList.value = true;
        }
      } else {
        isEndOfList.value = true;
      }
    } catch (error) {
      console.error("Error fetching comments:", error);
    } finally {
      isLoadingMore.value = false;
    }
  }
};

const handleClickBack = () => {
  navigateTo("/community-hub");
};

const handleClickWrite = (type: string, parent_id: any) => {
  useCommentStore.form.parent_id = parent_id;
  useCommentStore.form.thread_id = route.params.id as string;
  useCommentStore.form.user_id = authStore().authData.user_id;
  modalOpen.value = "modal-open";
};

const handleCloseModal = () => {
  useCommentStore.resetForm();
  modalOpen.value = "";
};

const handleSubmit = async () => {
  await useCommentStore.createComment();
  await useCommentStore.getCommentsByThreadId(route.params.id as string);
  modalOpen.value = "";
  useCommentStore.resetForm();
};

onMounted(async () => {
  await useThreadStore.getThreadById(route.params.id as string);
  useCommentStore.page = 1;
  await useCommentStore.getCommentsByThreadId(route.params.id as string);
});

useInfiniteScroll(container, fetchComments, {
  distance: 10,
});
</script>
