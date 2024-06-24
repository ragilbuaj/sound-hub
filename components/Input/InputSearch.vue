<template>
  <form class="w-full lg:max-w-md 2xl:max-w-xl">
    <label
      for="default-search"
      class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
      >Search</label
    >
    <div class="relative w-full pr-5">
      <div
        class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none"
      >
        <svg
          class="w-3 h-3 lg:w-4 lg:h-4 text-gray-500 dark:text-gray-400"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 20 20"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
          />
        </svg>
      </div>
      <input
        type="search"
        id="default-search"
        class="block w-full p-2 ps-10 lg:ps-12 lg:p-4 text-sm text-gray-900 border border-purple-500 rounded-lg bg-gray-50 focus:ring-[#702cec] focus:border-[#702cec] dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-[#702cec] dark:focus:border-[#702cec]"
        placeholder="Search products"
        required
      />
    </div>
  </form>
</template>

<script setup lang="ts"></script>
