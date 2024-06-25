<template>
  <div v-if="$props.isShow" class="relative">
    <img
      id="avatarButton"
      type="button"
      data-dropdown-toggle="userDropdown"
      data-dropdown-placement="bottom-start"
      class="w-16 h-16 rounded-full cursor-pointer"
      :src="$props.user_img_url"
      alt="User dropdown"
      @click="handleClickAvatar()"
    />

    <!-- Dropdown menu -->
    <div
      id="userDropdown"
      class="absolute right-0 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow-lg shadow-purple-400 w-44 dark:bg-gray-700 dark:divide-gray-600"
      :class="isDropdownShow ? 'block' : 'hidden'"
    >
      <div class="px-4 py-3 text-sm text-gray-900 dark:text-white">
        <div>{{ $props.username }}</div>
        <div class="font-medium truncate">{{ $props.email }}</div>
      </div>
      <ul
        class="py-2 text-sm text-gray-700 dark:text-gray-200"
        aria-labelledby="avatarButton"
      >
        <li>
          <a
            href="#"
            class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            >Dashboard</a
          >
        </li>
      </ul>
      <div class="py-1">
        <a
          href="#"
          class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
          @click="handleClickLogOut()"
          >Sign out</a
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
export interface Props {
  isShow: boolean;
  username: string;
  email: string;
  user_img_url: string;
}

const props = defineProps<Props>();
const useAuthStore = authStore();

const isDropdownShow = ref<boolean>(false);

const handleClickAvatar = () => {
  isDropdownShow.value = !isDropdownShow.value;
};

const handleClickLogOut = async () => {
  await useAuthStore.userLogOut();
  useRouter().push("/");
};
</script>
