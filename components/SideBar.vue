<template>
  <div class="lg:min-w-96 lg:flex">
    <div class="w-full flex items-center">
      <button
        data-drawer-target="logo-sidebar"
        data-drawer-toggle="logo-sidebar"
        aria-controls="logo-sidebar"
        type="button"
        class="h-max inline-flex px-6 py-7 text-sm text-gray-500 rounded-lg lg:h-full lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      >
        <span class="sr-only">Open sidebar</span>
        <svg
          class="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clip-rule="evenodd"
            fill-rule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          ></path>
        </svg>
      </button>
      <div class="lg:hidden">
        <InputSearch />
      </div>
    </div>

    <aside
      id="logo-sidebar"
      class="fixed top-0 left-0 z-40 h-screen max-w-96 transition-transform -translate-x-full lg:translate-x-0"
      aria-label="Sidebar"
    >
      <div class="h-max p-6 flex">
        <div
          class="h-full flex flex-col content-center gap-16 px-6 pt-12 pb-16 rounded-xl shadow-xl overflow-y-auto bg-neutral-300 dark:bg-gray-800"
        >
          <SideBarLogo />
          <div>
            <ul class="space-y-2 font-medium">
              <li>
                <div
                  class="flex items-center p-3 cursor-pointer hover:text-[#702cec] hover:bg-[#f5f1fe] dark:hover:bg-[#f5f1fe] rounded-lg group"
                  :class="
                    $props.activeTab == '/'
                      ? 'text-[#702cec] font-bold dark:text-[#702cec] bg-[#f5f1fe]'
                      : 'text-gray-900 dark:text-white bg-transparent'
                  "
                >
                  <svg
                    class="flex-shrink-0 w-6 h-6 transition duration-75 dark:text-gray-400 group-hover:text-[#702cec] dark:group-hover:text-white"
                    :class="
                      $props.activeTab == 'products'
                        ? 'text-[#702cec]'
                        : 'text-gray-500'
                    "
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M12 5a7 7 0 0 0-7 7v1.17c.313-.11.65-.17 1-.17h2a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1H6a3 3 0 0 1-3-3v-6a9 9 0 0 1 18 0v6a3 3 0 0 1-3 3h-2a1 1 0 0 1-1-1v-6a1 1 0 0 1 1-1h2c.35 0 .687.06 1 .17V12a7 7 0 0 0-7-7Z"
                      clip-rule="evenodd"
                    />
                  </svg>

                  <span class="flex-1 ms-3 whitespace-nowrap">Products</span>
                </div>
              </li>
              <li>
                <div
                  class="flex items-center p-3 cursor-pointer hover:text-[#702cec] hover:bg-[#f5f1fe] dark:hover:bg-[#f5f1fe] rounded-lg group"
                  :class="
                    $props.activeTab == 'wishlist'
                      ? 'text-[#702cec] font-bold dark:text-[#702cec] bg-[#f5f1fe]'
                      : 'text-gray-900 dark:text-white bg-transparent'
                  "
                >
                  <svg
                    class="flex-shrink-0 w-6 h-6 transition duration-75 dark:text-gray-400 group-hover:text-[#702cec] dark:group-hover:text-white"
                    :class="
                      $props.activeTab == 'wishlist'
                        ? 'text-[#702cec]'
                        : 'text-gray-500'
                    "
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2.5"
                      d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z"
                    />
                  </svg>
                  <span class="flex-1 ms-3 whitespace-nowrap">Wishlist</span>
                </div>
              </li>
              <li>
                <div
                  class="flex items-center p-3 cursor-pointer hover:text-[#702cec] hover:bg-[#f5f1fe] dark:hover:bg-[#f5f1fe] rounded-lg group"
                  :class="
                    $props.activeTab == 'compare'
                      ? 'text-[#702cec] font-bold dark:text-[#702cec]'
                      : 'text-gray-900 dark:text-white'
                  "
                >
                  <svg
                    class="flex-shrink-0 w-6 h-6 transition duration-75 dark:text-gray-400 group-hover:text-[#702cec] dark:group-hover:text-white"
                    :class="
                      $props.activeTab == 'compare'
                        ? 'text-[#702cec]'
                        : 'text-gray-500'
                    "
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2.5"
                      d="M5.5 21h13M12 21V7m0 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm2-1.8c3.073.661 2.467 2.8 5 2.8M5 8c3.359 0 2.192-2.115 5.012-2.793M7 9.556V7.75m0 1.806-1.95 4.393a.773.773 0 0 0 .37.962.785.785 0 0 0 .362.089h2.436a.785.785 0 0 0 .643-.335.776.776 0 0 0 .09-.716L7 9.556Zm10 0V7.313m0 2.243-1.95 4.393a.773.773 0 0 0 .37.962.786.786 0 0 0 .362.089h2.436a.785.785 0 0 0 .643-.335.775.775 0 0 0 .09-.716L17 9.556Z"
                    />
                  </svg>
                  <span class="flex-1 ms-3 whitespace-nowrap">Compare</span>
                </div>
              </li>
              <li>
                <div
                  class="flex items-center p-3 cursor-pointer hover:text-[#702cec] hover:bg-[#f5f1fe] dark:hover:bg-[#f5f1fe] rounded-lg group"
                  :class="
                    $props.activeTab == 'community-hub'
                      ? 'text-[#702cec] font-bold dark:text-[#702cec]'
                      : 'text-gray-900 dark:text-white'
                  "
                >
                  <svg
                    class="flex-shrink-0 w-6 h-6 transition duration-75 dark:text-gray-400 group-hover:text-[#702cec] dark:group-hover:text-white"
                    :class="
                      $props.activeTab == 'community-hub'
                        ? 'text-[#702cec]'
                        : 'text-gray-500'
                    "
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-width="2.5"
                      d="M4.37 7.657c2.063.528 2.396 2.806 3.202 3.87 1.07 1.413 2.075 1.228 3.192 2.644 1.805 2.289 1.312 5.705 1.312 6.705M20 15h-1a4 4 0 0 0-4 4v1M8.587 3.992c0 .822.112 1.886 1.515 2.58 1.402.693 2.918.351 2.918 2.334 0 .276 0 2.008 1.972 2.008 2.026.031 2.026-1.678 2.026-2.008 0-.65.527-.9 1.177-.9H20M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                  </svg>
                  <span class="flex-1 ms-3 whitespace-nowrap"
                    >Community Hub</span
                  >
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </aside>
  </div>
</template>

<script setup lang="ts">
export interface Props {
  activeTab: string;
}

const props = defineProps<Props>();
</script>
