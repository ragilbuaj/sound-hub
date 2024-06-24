<template>
  <transition name="fade">
    <div v-if="props.showToast" class="absolute bottom-10 right-10 shadow-2xl">
      <div
        id="toast-simple"
        class="flex items-center w-full max-w-xs p-4 space-x-4 rtl:space-x-reverse text-gray-500 bg-white divide-x rtl:divide-x-reverse divide-gray-200 rounded-lg shadow dark:text-gray-400 dark:divide-gray-700 space-x dark:bg-gray-800"
        role="alert"
      >
        <svg
          class="w-6 h-6 text-[#702cec] dark:text-[#702cec] rotate-45"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 18 20"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="m9 17 8 2L9 1 1 19l8-2Zm0 0V9"
          />
        </svg>
        <div class="ps-4 text-md font-bold text-[#702cec]">
          {{ $props.message }}
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
export interface Props {
  showToast: boolean;
  message: string;
}

const props = defineProps<Props>();
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
