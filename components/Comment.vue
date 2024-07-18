<template>
  <div class="comment mb-2 p-2 border border-gray-300 rounded-lg">
    <div class="flex items-center mb-2">
      <div class="avatar">
        <div class="w-10 h-10 rounded-full">
          <img
            v-if="
              comment?.user?.user_image_url &&
              comment?.user?.user_image_url?.length > 0
            "
            :src="comment?.user?.user_image_url"
            alt="user-image"
          />
          <img
            v-else
            :src="`https://ui-avatars.com/api/?name=${comment?.user?.username?.replace(
              / /g,
              '+'
            )}&background=0D8ABC&color=fff`"
            alt="avatar"
          />
        </div>
      </div>
      <div class="ml-2">
        <p class="font-bold">{{ comment?.user?.username }}</p>
        <p class="text-sm text-gray-500">
          {{ getTimeAgo(comment?.created_at) }}
        </p>
      </div>
    </div>
    <p>{{ comment?.text }}</p>
    <div class="mt-2" v-if="canReply">
      <button
        class="btn btn-sm bg-purple-700 text-white"
        @click="handleClickWrite('reply', comment?.id)"
      >
        Reply
      </button>
    </div>
    <div v-if="comment?.replies && comment?.replies.length" class="ml-8 mt-4">
      <Comment
        v-for="reply in visibleReplies"
        :key="reply.id"
        :comment="reply"
        :maxDepth="maxDepth - 1"
      />
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
          placeholder="Write your reply..."
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
import { defineProps, ref, computed } from "vue";
import { useRoute } from "vue-router";

const MAX_DEPTH = 3;

const props = defineProps({
  comment: Object,
  maxDepth: {
    type: Number,
    default: MAX_DEPTH,
  },
});

const useCommentStore = commentStore();
const route = useRoute();
const modalOpen = ref("");

const canReply = computed(() => props.maxDepth > 0);
const visibleReplies = computed(() => props.comment?.replies || []);

const getTimeAgo = (createdAt: string): string => {
  const { value, unit } = getTimeDifference(createdAt);
  return `${value} ${unit} ago`;
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
</script>
