<template>
  <div v-if="$props.isShow" class="dropdown dropdown-hover dropdown-end">
    <div tabindex="0" role="button" class="avatar hidden lg:block">
      <div class="w-12 rounded-full">
        <img
          v-if="
            useAuthStore.authData.user_image_url &&
            useAuthStore.authData.user_image_url?.length > 0
          "
          :src="useAuthStore.authData.user_image_url"
          alt="user-image"
        />
        <img
          v-else
          :src="`https://ui-avatars.com/api/?name=${useAuthStore.authData.username.replace(
            / /g,
            '+'
          )}&background=0D8ABC&color=fff`"
          alt="avatar"
        />
      </div>
    </div>
    <ul
      tabindex="0"
      class="dropdown-content menu w-max bg-neutral-300 font-medium text-gray-900 rounded-box z-[1] shadow"
    >
      <li @click="handleClickSignOut()" class="text-xs"><a>Sign Out</a></li>
    </ul>
  </div>
</template>

<script setup lang="ts">
export interface Props {
  isShow: boolean;
}

const props = defineProps<Props>();
const useAuthStore = authStore();
const router = useRouter();

const handleClickSignOut = async () => {
  await useAuthStore.userLogOut();
  router.push("/");
};
</script>
