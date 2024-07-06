<template>
  <transition name="fade">
    <div
      v-if="props.showToast"
      class="absolute bottom-10 lg:right-10 shadow-2xl"
    >
      <div
        id="toast-simple"
        class="flex items-center w-full max-w-xs p-4 space-x-4 rtl:space-x-reverse text-gray-500 bg-white divide-x rtl:divide-x-reverse divide-gray-200 rounded-lg shadow"
        role="alert"
      >
        <svg
          v-if="!$props.isError"
          class="w-4 h-4 lg:w-5 lg:h-5 text-[#702cec] rotate-45"
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
        <svg
          v-else
          height="32"
          style="overflow: visible; enable-background: new 0 0 32 32"
          width="32"
          xml:space="preserve"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="16" cy="16" r="16" style="fill: #d72828" />
          <path d="M14.5 25h3v-3h-3v3zm0-19v13h3V6h-3z" style="fill: #e6e6e6" />
        </svg>
        <div class="ps-2 text-sm lg:text-md font-bold text-[#702cec]">
          {{ !$props.isError ? $props.message : "Error sending request" }}
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
export interface Props {
  showToast: boolean;
  message: string;
  isError: boolean;
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
