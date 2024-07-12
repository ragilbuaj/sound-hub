<template>
  <transition name="fade">
    <div
      v-if="props.showToast"
      class="absolute flex justify-center inset-x-0 top-5 lg:bottom-10 lg:right-10 shadow-2xl z-10"
    >
      <div
        id="toast-simple"
        class="flex items-center w-full max-w-xs p-4 space-x-4 rtl:space-x-reverse text-gray-500 bg-white divide-x rtl:divide-x-reverse divide-gray-200 rounded-lg shadow"
        role="alert"
      >
        <svg
          v-if="!$props.isError && !$props.isWishlist"
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
          v-if="$props.isWishlist && $props.typeChanges == 'add'"
          class="w-8 h-8 text-[#FF56A5] lg:w-7 lg:h-7"
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
        <svg
          v-if="$props.isWishlist && $props.typeChanges == 'delete'"
          class="w-8 h-8 text-[#FF56A5] lg:w-7 lg:h-7"
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
        <svg
          v-if="$props.isError"
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
  isError?: boolean;
  isWishlist?: boolean;
  typeChanges?: string;
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
