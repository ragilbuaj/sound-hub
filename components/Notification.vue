<template>
  <div
    v-if="$props.isShow"
    class="flex items-center justify-center w-max relative dropdown dropdown-hover dropdown-bottom dropdown-end"
  >
    <svg
      class="size-8"
      tabindex="0"
      role="button"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 22a2.98 2.98 0 0 0 2.818-2H9.182A2.98 2.98 0 0 0 12 22zm7-7.414V10c0-3.217-2.185-5.927-5.145-6.742C13.562 2.52 12.846 2 12 2s-1.562.52-1.855 1.258C7.185 4.074 5 6.783 5 10v4.586l-1.707 1.707A.996.996 0 0 0 3 17v1a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1v-1a.996.996 0 0 0-.293-.707L19 14.586z"
        fill="#ffffff"
        class="fill-000000"
      ></path>
    </svg>
    <div
      v-if="count > 0"
      class="absolute -top-1 -right-2 badge badge-error badge-sm"
    >
      {{ count }}
    </div>
    <ul
      tabindex="0"
      class="dropdown-content menu bg-neutral-300 text-gray-900 text-xs font-medium rounded-box z-[1] w-64 p-2 shadow"
    >
      <li
        v-for="(item, index) in useNotificationStore.datas"
        :key="item.id"
        class="rounded"
        :class="item.is_read ? ' text-gray-500' : ''"
      >
        <a>{{ item.message }}</a>
      </li>
      <li
        class="btn btn-sm bg-purple-700 text-white"
        @click="handleClickReadAll()"
      >
        Mark all as read
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
export interface Props {
  isShow: boolean;
}

const props = defineProps<Props>();
const useNotificationStore = notificationStore();
const useAuthStore = authStore();
const count = computed(() => {
  return useNotificationStore.datas?.filter(
    (item: any) => item.is_read == false
  )?.length;
});

onMounted(async () => {
  await useNotificationStore.getAllNotificationsById(
    useAuthStore.authData.user_id
  );
});

const handleClickReadAll = async () => {
  useNotificationStore.datas.forEach(async (item: any) => {
    await useNotificationStore.readNotifications(item.id);
  });
  await useNotificationStore.getAllNotificationsById(
    useAuthStore.authData.user_id
  );
};
</script>
