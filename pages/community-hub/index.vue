<template>
  <div class="w-full h-full flex lg:pt-10 lg:pl-6 gap-4 overflow-y-hidden">
    <div
      class="w-full h-full flex flex-col items-center text-gray-900 gap-2 p-3 lg:p-0"
    >
      <div class="w-full flex justify-end">
        <button
          type="button"
          class="btn btn-sm max-w bg-purple-800 text-white"
          @click="handleClickCreate"
        >
          Create a thread
        </button>
      </div>
      <div
        ref="container"
        class="w-full flex flex-col gap-1 overflow-y-scroll no-scrollbar lg:gap-2"
      >
        <div
          v-for="(thread, index) in useThreadStore.datas"
          :key="thread.id"
          class="card card-compact bg-gray-50 w-full shadow-xl"
        >
          <div class="card-body">
            <div class="flex justify-between">
              <div class="flex items-center gap-2">
                <div class="size-8">
                  <img
                    :src="
                      thread.user.user_image_url?.length
                        ? thread.user.user_image_url
                        : `https://ui-avatars.com/api/?name=${thread.user?.username?.replace(
                            / /g,
                            '+'
                          )}&background=0D8ABC&color=fff`
                    "
                    class="rounded-full"
                    alt="avatar"
                  />
                </div>
                <div class="font-semibold">
                  {{ thread.user.username }}
                </div>
              </div>
              <button
                type="button"
                class="btn btn-sm capitalize"
                @click="handleClickFollow(thread, userFollow[index])"
              >
                {{ userFollow[index]?.user_id ? "Followed" : "Follow" }}
              </button>
            </div>
            <h2
              class="card-title cursor-pointer"
              @click="handleClickThread(thread.id)"
            >
              {{ thread.title }}
            </h2>
            <figure v-if="thread.image_url">
              <img
                class="w-full h-40 lg:h-72 rounded"
                :src="thread.image_url"
                alt="thread-image"
              />
            </figure>
            <div class="flex items-center">
              <button
                type="button"
                class="btn btn-sm w-max bg-transparent border-none hover:bg-transparent shadow-none"
              >
                <svg
                  @click="
                    handleClickLike(
                      userLikes[index]?.id,
                      thread.id,
                      useAuthStore.authData.user_id,
                      userLikes[index]?.type === 'like' ? 'dislike' : 'like'
                    )
                  "
                  class="w-7 h-7"
                  viewBox="0 0 512 512"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    :d="
                      userLikes[index]?.type === 'like'
                        ? 'M340.8 83C307 83 276 98.8 256 124.8c-20-26-51-41.8-84.8-41.8C112.1 83 64 131.3 64 190.7c0 27.9 10.6 54.4 29.9 74.6L245.1 418l10.9 11 10.9-11 148.3-149.8c21-20.3 32.8-47.9 32.8-77.5C448 131.3 399.9 83 340.8 83z'
                        : 'M340.8 98.4c50.7 0 91.9 41.3 91.9 92.3 0 26.2-10.9 49.8-28.3 66.6L256 407.1 105 254.6c-15.8-16.6-25.6-39.1-25.6-63.9 0-51 41.1-92.3 91.9-92.3 38.2 0 70.9 23.4 84.8 56.8 13.7-33.3 46.5-56.8 84.7-56.8m0-15.4C307 83 276 98.8 256 124.8c-20-26-51-41.8-84.8-41.8C112.1 83 64 131.3 64 190.7c0 27.9 10.6 54.4 29.9 74.6L245.1 418l10.9 11 10.9-11 148.3-149.8c21-20.3 32.8-47.9 32.8-77.5C448 131.3 399.9 83 340.8 83z'
                    "
                  />
                </svg>
              </button>
              <p>{{ thread.like_count }}</p>
            </div>
          </div>
        </div>
        <div v-if="isLoadingMore" class="w-full flex justify-center mt-4">
          <span class="loading loading-dots loading-lg"></span>
        </div>
        <div
          v-else-if="useThreadStore.datas.length <= 0"
          class="w-full flex justify-center mt-4"
        >
          <p class="text-sm text-center text-black dark:text-white">
            No threads yet.
          </p>
        </div>
      </div>
    </div>
    <div
      class="h-max card card-compact bg-gray-50 w-96 shadow-xl hidden lg:block"
    >
      <div class="card-body text-gray-900">
        <h2 class="card-title">Followed thread</h2>
        <p v-if="useThreadStore.followedThread.length <= 0">
          You haven't followed any thread
        </p>
        <div
          v-for="(item, index) in useThreadStore.followedThread"
          :key="item.thread_id"
          class="font-semibold hover:bg-gray-400 rounded p-2 cursor-pointer"
          @click="handleClickThread(item.thread_id)"
        >
          <p>
            {{ index + 1 }}. <span>{{ item.thread.title }}</span>
          </p>
        </div>
      </div>
    </div>
  </div>

  <dialog
    id="create-modal"
    class="modal modal-bottom lg:modal-middle"
    :class="modalOpen ? 'modal-open' : ''"
  >
    <div class="modal-box">
      <form method="dialog">
        <button
          class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          @click="handleClickCloseModal"
        >
          ✕
        </button>
      </form>
      <form @submit.prevent="handleSubmit()" class="flex flex-col gap-2">
        <h3 class="text-lg font-bold">New thread</h3>
        <div class="flex flex-col gap-2">
          <InputText
            :model="useThreadStore.form.title"
            label="Title"
            placeholder="title"
            :isRequired="true"
            @input="handleInputText($event, 'title')"
          />
          <InputTextArea
            :model="useThreadStore.form.content"
            label="Content"
            placeholder="Start a thread..."
            :isRequired="true"
            @input="handleInputText($event, 'content')"
          />
        </div>
        <div v-if="showImage" class="flex items-center">
          <img
            :src="showImage"
            alt="uploaded-image"
            class="rounded size-32 lg:size-56"
          />
        </div>
        <label
          type="button"
          class="w-max btn btn-sm bg-transparent border-none shadow-none hover:bg-transparent"
        >
          <input
            type="file"
            accept="image/png, image/jpeg"
            class="hidden"
            @change="handleInputedFile"
          />
          <svg
            class="w-5 h-5"
            viewBox="0 0 16 16"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="m7.646 13.646.707.707 6-6a4.04 4.04 0 0 0 0-5.707 4.039 4.039 0 0 0-5.707 0l-6.5 6.5a3.332 3.332 0 0 0 0 4.707c.648.648 1.501.974 2.354.974s1.705-.325 2.354-.974l6-6c.495-.495.767-1.153.767-1.853s-.272-1.358-.768-1.854c-.99-.99-2.717-.99-3.707 0l-5.5 5.5.707.707 5.5-5.5c.611-.611 1.682-.611 2.293 0 .306.306.475.713.475 1.147s-.169.841-.475 1.146l-6 6c-.908.908-2.385.908-3.293 0s-.908-2.385 0-3.293l6.5-6.5c1.184-1.184 3.109-1.184 4.293 0s1.184 3.109 0 4.293l-6 6z"
              fill="#fff"
              class="fill-000000"
            />
          </svg>
        </label>
        <button type="submit" class="btn btn-sm bg-purple-800 text-white">
          Post
        </button>
      </form>
    </div>
  </dialog>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";

const useThreadStore = threadStore();
const useAuthStore = authStore();
const router = useRouter();
const modalOpen = ref(false);
const showImage = ref("");
const container = ref<HTMLElement | null>(null);

const isLoadingMore = ref(false);
const isEndOfList = ref(false);

const userLikes = computed(() => {
  return (
    useThreadStore.datas?.map((thread: any) => {
      return (
        thread.thread_likes?.find(
          (like: any) => like.user_id === useAuthStore.authData.user_id
        ) || {}
      );
    }) || []
  );
});

const userFollow = computed(() => {
  return (
    useThreadStore.datas?.map((thread: any) => {
      return (
        thread.follow_thread?.find(
          (follow: any) => follow.user_id === useAuthStore.authData.user_id
        ) || {}
      );
    }) || []
  );
});

const fetchThreads = async (initial = false) => {
  if (initial) {
    useThreadStore.page = 1;
    useThreadStore.datas = []; // Reset state sebelum fetch data baru
    isEndOfList.value = false; // Reset end of list state
  }

  if (!isEndOfList.value && !isLoadingMore.value) {
    try {
      isLoadingMore.value = true;
      isEndOfList.value = false;

      const { data: newThreads, error }: any = await useAsyncData(
        "threads",
        () =>
          $fetch(`${useRuntimeConfig().public.apiBase}/threads`, {
            method: "get",
            headers: {
              Authorization: "Bearer " + useAuthStore.authData.access_token,
            },
            query: { page: useThreadStore.page, size: useThreadStore.size },
          })
      );

      if (newThreads?.value?.data?.length) {
        useThreadStore.datas.push(...newThreads.value.data);
        useThreadStore.page += 1;
      } else {
        isEndOfList.value = true;
      }
    } catch (error) {
      console.error("Error fetching threads:", error);
      isEndOfList.value = true;
    } finally {
      isLoadingMore.value = false;
    }
  }
};

const handleClickThread = (id: string) => {
  router.push(`/community-hub/${id}`);
};

const handleClickCreate = () => {
  modalOpen.value = true;
};

const handleClickCloseModal = () => {
  modalOpen.value = false;
  useThreadStore.resetForm();
};

const handleInputedFile = (e: Event) => {
  const target = e.target as HTMLInputElement;
  const file = target.files?.[0];
  if (file) {
    useThreadStore.form.image = file;
    showImage.value = URL.createObjectURL(file);
  }
};

const handleSubmit = async () => {
  await useThreadStore.createThread();
  modalOpen.value = false;
  useThreadStore.resetForm();
  await fetchThreads(true); // Fetch threads setelah membuat thread baru dimulai dari page 1
};

const handleClickLike = async (
  id: string,
  thread_id: string,
  user_id: string,
  type: string
) => {
  await useThreadStore.likeCount(id, thread_id, user_id, type);
  await fetchThreads(true); // Fetch threads untuk update like counts dimulai dari page 1
};

const handleClickFollow = async (thread: any, user: any) => {
  if (user.user_id) {
    await useThreadStore.unFollowThread(user.id);
  } else {
    await useThreadStore.followThread(thread.id, useAuthStore.authData.user_id);
  }
  await fetchThreads(true); // Fetch threads untuk update follow status dimulai dari page 1
  await useThreadStore.getAllFollowedThreads();
};

const handleInputText = (e: string, fields: string) => {
  if (fields == "title") {
    useThreadStore.form.title = e;
  } else if (fields == "content") {
    useThreadStore.form.content = e;
  }
};

onMounted(async () => {
  await fetchThreads(true);
  await useThreadStore.getAllFollowedThreads();
});

useInfiniteScroll(container, () => fetchThreads());
</script>
