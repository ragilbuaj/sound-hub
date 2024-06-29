<template>
  <div class="drawer">
    <input id="my-drawer" type="checkbox" class="drawer-toggle lg:hidden" />
    <div class="drawer-content lg:flex">
      <!-- Page content here -->
      <div class="w-max p-2 lg:hidden">
        <label for="my-drawer" class="drawer-button">
          <svg
            class="h-10 w-10"
            fill="none"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              clip-rule="evenodd"
              d="M3 6a1 1 0 0 1 1-1h16a1 1 0 1 1 0 2H4a1 1 0 0 1-1-1zm0 6a1 1 0 0 1 1-1h10a1 1 0 1 1 0 2H4a1 1 0 0 1-1-1zm0 6a1 1 0 0 1 1-1h5a1 1 0 1 1 0 2H4a1 1 0 0 1-1-1z"
              fill="#6d31edff"
              fill-rule="evenodd"
            />
          </svg>
        </label>
      </div>
      <div class="hidden h-full w-max py-8 pl-8 pr-2 lg:block">
        <ul
          class="menu box-border w-max flex gap-2 bg-neutral-300 text-base text-black p-4 shadow-md shadow-neutral-500 lg:rounded-lg lg:py-8"
        >
          <!-- Sidebar content here -->
          <li class="mb-5 lg:mb-12"><SideBarLogo /></li>
          <li @click="handleClickSideBarMenu('/')">
            <a :class="route.path == '/' ? 'active' : ''">
              <svg
                class="h-5 w-5"
                viewBox="0 0 64 64"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M32 0C16.561 0 4 12.561 4 28v17c0 3.35 2.072 6.221 5 7.411v2.1A6.496 6.496 0 0 0 15.489 61h11.653c.447 1.72 2 3 3.858 3 2.206 0 4-1.794 4-4s-1.794-4-4-4c-1.858 0-3.411 1.28-3.858 3H15.489A4.494 4.494 0 0 1 11 54.511v-1.58c.328.041.661.069 1 .069h4c0 1.103.897 2 2 2h7c1.103 0 2-.897 2-2V29c0-1.103-.897-2-2-2h-7c-1.103 0-2 .897-2 2h-4v-1c0-1.409.15-2.782.429-4.11a.98.98 0 0 0 .258-.164c2.016-1.907 9.431-8.097 20.279-7.727 9.549.328 16.011 5.512 18.346 7.726a.978.978 0 0 0 .259.162A20.06 20.06 0 0 1 52 28v1h-4c0-1.103-.897-2-2-2h-7c-1.103 0-2 .897-2 2v24c0 1.103.897 2 2 2h7c1.103 0 2-.897 2-2h4c4.411 0 8-3.589 8-8V28C60 12.561 47.439 0 32 0zm-1 58c1.103 0 2 .897 2 2s-.897 2-2 2-2-.897-2-2 .897-2 2-2zM6 28C6 13.664 17.664 2 32 2s26 11.664 26 26v8.899A5.009 5.009 0 0 1 54 32v-4c0-12.131-9.869-22-22-22s-22 9.869-22 22v4a5.008 5.008 0 0 1-4 4.899zm12 1h2v8a1 1 0 0 0 2 0v-8h3l.001 24H22V42a1 1 0 0 0-2 0v11h-2V30zm-2 2v20h-4c-3.309 0-6-2.691-6-6v-6.08c3.387-.488 6-3.401 6-6.92v-1zm17.034-17c-9.126-.317-15.968 3.701-19.537 6.432C16.488 13.148 23.65 8 32 8c8.341 0 15.498 5.136 18.494 12.409-3.409-2.634-9.401-6.132-17.46-6.409zM46 53h-2V42a1 1 0 0 0-2 0v11h-3V29h3v8a1 1 0 0 0 2 0v-8h2v23zm6-2h-4V31h4v1c0 3.519 2.613 6.432 6 6.92V45c0 3.309-2.691 6-6 6z"
                  fill="#6d31edff"
                  data-original-color="#000000ff"
                />
              </svg>
              Products
            </a>
          </li>
          <li @click="handleClickSideBarMenu('wishlist')">
            <a :class="route.path == 'wishlist' ? 'active' : ''">
              <svg
                class="h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 369.486 369.486"
                style="enable-background: new 0 0 369.486 369.486"
                xml:space="preserve"
              >
                <path
                  d="M184.743 357.351a12.503 12.503 0 0 1-9.164-3.998l-147.67-159.16a12.628 12.628 0 0 1-.113-.123C9.871 174.223 0 147.921 0 120.008c0-27.914 9.871-54.215 27.796-74.061l2.244-2.484c18.246-20.201 42.608-31.327 68.599-31.327s50.354 11.126 68.601 31.328l17.503 19.38 17.503-19.379c18.246-20.202 42.608-31.328 68.6-31.328s50.354 11.126 68.601 31.329l2.241 2.478c17.928 19.851 27.799 46.152 27.799 74.065s-9.872 54.215-27.796 74.061a4.544 4.544 0 0 1-.113.125l-147.671 159.16a12.513 12.513 0 0 1-9.164 3.996zM46.295 177.252l138.448 149.219 138.448-149.22c28.485-31.603 28.467-82.97-.055-114.549l-2.239-2.478c-13.449-14.891-31.224-23.09-50.051-23.09-18.828 0-36.603 8.199-50.048 23.085l-26.778 29.65a12.496 12.496 0 0 1-18.551 0L148.69 60.221c-13.446-14.887-31.22-23.086-50.048-23.086S62.039 45.333 48.594 60.22l-2.244 2.484c-28.522 31.579-28.541 82.946-.055 114.548z"
                  fill="#6d31edff"
                  data-original-color="#000000ff"
                />
              </svg>
              Wishlist
            </a>
          </li>
          <li @click="handleClickSideBarMenu('compare')">
            <a :class="route.path == 'compare' ? 'active' : ''">
              <svg
                class="h-5 w-5"
                viewBox="0 0 32 32"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g data-name="pro and cons" fill="#6d31edff">
                  <path
                    d="M28 32H4a3.003 3.003 0 0 1-3-3V3a3.003 3.003 0 0 1 3-3h24a3.003 3.003 0 0 1 3 3v26a3.003 3.003 0 0 1-3 3zM4 2a1.001 1.001 0 0 0-1 1v26a1.001 1.001 0 0 0 1 1h24a1.001 1.001 0 0 0 1-1V3a1.001 1.001 0 0 0-1-1z"
                    data-original-color="#000000ff"
                  />
                  <path
                    d="M16 32a1 1 0 0 1-1-1V1.17a1 1 0 1 1 2 0V31a1 1 0 0 1-1 1zM8.013 7.987a1.001 1.001 0 0 1-.707-.293l-.987-.987a1 1 0 0 1 1.415-1.414l.28.28 1.279-1.28a1 1 0 1 1 1.414 1.414L8.72 7.694a1 1 0 0 1-.707.293zM22.013 7.987a1 1 0 0 1-.707-1.707l1.987-1.987a1 1 0 1 1 1.414 1.414L22.72 7.694a.996.996 0 0 1-.707.293z"
                    data-original-color="#000000ff"
                  />
                  <path
                    d="M24 7.987a.996.996 0 0 1-.707-.293l-1.987-1.987a1 1 0 1 1 1.414-1.414l1.987 1.987A1 1 0 0 1 24 7.987zM6 12H5a1 1 0 0 1 0-2h1a1 1 0 0 1 0 2zM13 12H9a1 1 0 0 1 0-2h4a1 1 0 0 1 0 2zM6 16H5a1 1 0 0 1 0-2h1a1 1 0 0 1 0 2zM13 16H9a1 1 0 0 1 0-2h4a1 1 0 0 1 0 2zM6 20H5a1 1 0 0 1 0-2h1a1 1 0 0 1 0 2zM13 20H9a1 1 0 0 1 0-2h4a1 1 0 0 1 0 2zM6 24H5a1 1 0 0 1 0-2h1a1 1 0 0 1 0 2zM13 24H9a1 1 0 0 1 0-2h4a1 1 0 0 1 0 2zM6 28H5a1 1 0 0 1 0-2h1a1 1 0 0 1 0 2zM13 28H9a1 1 0 0 1 0-2h4a1 1 0 0 1 0 2zM20 12h-1a1 1 0 0 1 0-2h1a1 1 0 0 1 0 2zM27 12h-4a1 1 0 0 1 0-2h4a1 1 0 0 1 0 2zM20 16h-1a1 1 0 0 1 0-2h1a1 1 0 0 1 0 2zM27 16h-4a1 1 0 0 1 0-2h4a1 1 0 0 1 0 2zM20 20h-1a1 1 0 0 1 0-2h1a1 1 0 0 1 0 2zM27 20h-4a1 1 0 0 1 0-2h4a1 1 0 0 1 0 2zM20 24h-1a1 1 0 0 1 0-2h1a1 1 0 0 1 0 2zM27 24h-4a1 1 0 0 1 0-2h4a1 1 0 0 1 0 2zM20 28h-1a1 1 0 0 1 0-2h1a1 1 0 0 1 0 2zM27 28h-4a1 1 0 0 1 0-2h4a1 1 0 0 1 0 2z"
                    data-original-color="#000000ff"
                  />
                </g>
              </svg>
              Compare
            </a>
          </li>
          <li @click="handleClickSideBarMenu('community-hub')">
            <a :class="route.path == 'community-hub' ? 'active' : ''">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="#6d31edff"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 19v-6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2zm0 0V9a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v10m-6 0a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2m0 0V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2z"
                />
              </svg>
              Community Hub
            </a>
          </li>
        </ul>
      </div>
      <div class="flex flex-col pt-8 pr-6">
        <button
          v-if="useAuthStore.authData.user_id.length <= 0"
          type="button"
          class="w-1/6 self-end text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          @click="handleClickLoginButton"
        >
          Login
        </button>
        <NuxtPage />
      </div>
    </div>
    <div class="drawer-side">
      <label
        for="my-drawer"
        aria-label="close sidebar"
        class="drawer-overlay lg:hidden"
      ></label>
      <ul
        class="menu flex gap-2 bg-neutral-300 text-base text-black min-h-full w-3/4 p-4"
      >
        <!-- Sidebar content here -->
        <li class="mb-5"><SideBarLogo /></li>
        <li @click="handleClickSideBarMenu('/')">
          <a :class="route.path == '/' ? 'active' : ''">
            <svg
              class="h-5 w-5"
              viewBox="0 0 64 64"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M32 0C16.561 0 4 12.561 4 28v17c0 3.35 2.072 6.221 5 7.411v2.1A6.496 6.496 0 0 0 15.489 61h11.653c.447 1.72 2 3 3.858 3 2.206 0 4-1.794 4-4s-1.794-4-4-4c-1.858 0-3.411 1.28-3.858 3H15.489A4.494 4.494 0 0 1 11 54.511v-1.58c.328.041.661.069 1 .069h4c0 1.103.897 2 2 2h7c1.103 0 2-.897 2-2V29c0-1.103-.897-2-2-2h-7c-1.103 0-2 .897-2 2h-4v-1c0-1.409.15-2.782.429-4.11a.98.98 0 0 0 .258-.164c2.016-1.907 9.431-8.097 20.279-7.727 9.549.328 16.011 5.512 18.346 7.726a.978.978 0 0 0 .259.162A20.06 20.06 0 0 1 52 28v1h-4c0-1.103-.897-2-2-2h-7c-1.103 0-2 .897-2 2v24c0 1.103.897 2 2 2h7c1.103 0 2-.897 2-2h4c4.411 0 8-3.589 8-8V28C60 12.561 47.439 0 32 0zm-1 58c1.103 0 2 .897 2 2s-.897 2-2 2-2-.897-2-2 .897-2 2-2zM6 28C6 13.664 17.664 2 32 2s26 11.664 26 26v8.899A5.009 5.009 0 0 1 54 32v-4c0-12.131-9.869-22-22-22s-22 9.869-22 22v4a5.008 5.008 0 0 1-4 4.899zm12 1h2v8a1 1 0 0 0 2 0v-8h3l.001 24H22V42a1 1 0 0 0-2 0v11h-2V30zm-2 2v20h-4c-3.309 0-6-2.691-6-6v-6.08c3.387-.488 6-3.401 6-6.92v-1zm17.034-17c-9.126-.317-15.968 3.701-19.537 6.432C16.488 13.148 23.65 8 32 8c8.341 0 15.498 5.136 18.494 12.409-3.409-2.634-9.401-6.132-17.46-6.409zM46 53h-2V42a1 1 0 0 0-2 0v11h-3V29h3v8a1 1 0 0 0 2 0v-8h2v23zm6-2h-4V31h4v1c0 3.519 2.613 6.432 6 6.92V45c0 3.309-2.691 6-6 6z"
                fill="#6d31edff"
                data-original-color="#000000ff"
              />
            </svg>
            Products
          </a>
        </li>
        <li @click="handleClickSideBarMenu('wishlist')">
          <a :class="route.path == 'wishlist' ? 'active' : ''">
            <svg
              class="h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 369.486 369.486"
              style="enable-background: new 0 0 369.486 369.486"
              xml:space="preserve"
            >
              <path
                d="M184.743 357.351a12.503 12.503 0 0 1-9.164-3.998l-147.67-159.16a12.628 12.628 0 0 1-.113-.123C9.871 174.223 0 147.921 0 120.008c0-27.914 9.871-54.215 27.796-74.061l2.244-2.484c18.246-20.201 42.608-31.327 68.599-31.327s50.354 11.126 68.601 31.328l17.503 19.38 17.503-19.379c18.246-20.202 42.608-31.328 68.6-31.328s50.354 11.126 68.601 31.329l2.241 2.478c17.928 19.851 27.799 46.152 27.799 74.065s-9.872 54.215-27.796 74.061a4.544 4.544 0 0 1-.113.125l-147.671 159.16a12.513 12.513 0 0 1-9.164 3.996zM46.295 177.252l138.448 149.219 138.448-149.22c28.485-31.603 28.467-82.97-.055-114.549l-2.239-2.478c-13.449-14.891-31.224-23.09-50.051-23.09-18.828 0-36.603 8.199-50.048 23.085l-26.778 29.65a12.496 12.496 0 0 1-18.551 0L148.69 60.221c-13.446-14.887-31.22-23.086-50.048-23.086S62.039 45.333 48.594 60.22l-2.244 2.484c-28.522 31.579-28.541 82.946-.055 114.548z"
                fill="#6d31edff"
                data-original-color="#000000ff"
              />
            </svg>
            Wishlist
          </a>
        </li>
        <li @click="handleClickSideBarMenu('compare')">
          <a :class="route.path == 'compare' ? 'active' : ''">
            <svg
              class="h-5 w-5"
              viewBox="0 0 32 32"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g data-name="pro and cons" fill="#6d31edff">
                <path
                  d="M28 32H4a3.003 3.003 0 0 1-3-3V3a3.003 3.003 0 0 1 3-3h24a3.003 3.003 0 0 1 3 3v26a3.003 3.003 0 0 1-3 3zM4 2a1.001 1.001 0 0 0-1 1v26a1.001 1.001 0 0 0 1 1h24a1.001 1.001 0 0 0 1-1V3a1.001 1.001 0 0 0-1-1z"
                  data-original-color="#000000ff"
                />
                <path
                  d="M16 32a1 1 0 0 1-1-1V1.17a1 1 0 1 1 2 0V31a1 1 0 0 1-1 1zM8.013 7.987a1.001 1.001 0 0 1-.707-.293l-.987-.987a1 1 0 0 1 1.415-1.414l.28.28 1.279-1.28a1 1 0 1 1 1.414 1.414L8.72 7.694a1 1 0 0 1-.707.293zM22.013 7.987a1 1 0 0 1-.707-1.707l1.987-1.987a1 1 0 1 1 1.414 1.414L22.72 7.694a.996.996 0 0 1-.707.293z"
                  data-original-color="#000000ff"
                />
                <path
                  d="M24 7.987a.996.996 0 0 1-.707-.293l-1.987-1.987a1 1 0 1 1 1.414-1.414l1.987 1.987A1 1 0 0 1 24 7.987zM6 12H5a1 1 0 0 1 0-2h1a1 1 0 0 1 0 2zM13 12H9a1 1 0 0 1 0-2h4a1 1 0 0 1 0 2zM6 16H5a1 1 0 0 1 0-2h1a1 1 0 0 1 0 2zM13 16H9a1 1 0 0 1 0-2h4a1 1 0 0 1 0 2zM6 20H5a1 1 0 0 1 0-2h1a1 1 0 0 1 0 2zM13 20H9a1 1 0 0 1 0-2h4a1 1 0 0 1 0 2zM6 24H5a1 1 0 0 1 0-2h1a1 1 0 0 1 0 2zM13 24H9a1 1 0 0 1 0-2h4a1 1 0 0 1 0 2zM6 28H5a1 1 0 0 1 0-2h1a1 1 0 0 1 0 2zM13 28H9a1 1 0 0 1 0-2h4a1 1 0 0 1 0 2zM20 12h-1a1 1 0 0 1 0-2h1a1 1 0 0 1 0 2zM27 12h-4a1 1 0 0 1 0-2h4a1 1 0 0 1 0 2zM20 16h-1a1 1 0 0 1 0-2h1a1 1 0 0 1 0 2zM27 16h-4a1 1 0 0 1 0-2h4a1 1 0 0 1 0 2zM20 20h-1a1 1 0 0 1 0-2h1a1 1 0 0 1 0 2zM27 20h-4a1 1 0 0 1 0-2h4a1 1 0 0 1 0 2zM20 24h-1a1 1 0 0 1 0-2h1a1 1 0 0 1 0 2zM27 24h-4a1 1 0 0 1 0-2h4a1 1 0 0 1 0 2zM20 28h-1a1 1 0 0 1 0-2h1a1 1 0 0 1 0 2zM27 28h-4a1 1 0 0 1 0-2h4a1 1 0 0 1 0 2z"
                  data-original-color="#000000ff"
                />
              </g>
            </svg>
            Compare
          </a>
        </li>
        <li @click="handleClickSideBarMenu('community-hub')">
          <a :class="route.path == 'community-hub' ? 'active' : ''">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="#6d31edff"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 19v-6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2zm0 0V9a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v10m-6 0a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2m0 0V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2z"
              />
            </svg>
            Community Hub
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
// export interface Props {
//   activeTab: string;
// }

// const props = defineProps<Props>();
const router = useRouter();
const route = useRoute();
const useAuthStore = authStore();

const handleClickLoginButton = () => {
  router.push("/login");
};

const handleClickSideBarMenu = (path: string) => {
  router.push(path);
};
</script>
