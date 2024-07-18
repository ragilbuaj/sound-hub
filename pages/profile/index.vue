<template>
  <div
    class="w-full lg:w-1/2 h-max mx-auto mt-10 p-10 bg-neutral-50 rounded-xl text-gray-900"
  >
    <div class="w-max flex flex-col gap-4">
      <div class="flex flex-col gap-1">
        <p class="">Profile picture</p>
        <div class="flex items-center gap-10">
          <div class="avatar">
            <div class="size-20 rounded-full">
              <img
                v-if="
                  useProfileStore.profileDetail?.user_image_url &&
                  useProfileStore.profileDetail?.user_image_url?.length > 0
                "
                :src="useProfileStore.profileDetail?.user_image_url"
                alt="user-image"
              />
              <img
                v-else
                :src="`https://ui-avatars.com/api/?name=${useProfileStore.profileDetail?.username?.replace(
                  / /g,
                  '+'
                )}&background=0D8ABC&color=fff`"
                alt="avatar"
              />
            </div>
          </div>
          <span
            v-if="useProfileStore.isLoading"
            class="loading loading-spinner loading-sm"
          ></span>
          <label v-else class="btn btn-sm bg-purple-800 text-white">
            Change picture
            <input
              type="file"
              accept="image/png, image/jpeg"
              @change="handleInputedFile"
              class="hidden"
            />
          </label>
        </div>
      </div>
      <form class="flex flex-col gap-3">
        <label>
          Username
          <p v-if="!isEditing" class="font-semibold text-lg">
            {{ useProfileStore.profileDetail?.username }}
          </p>
          <input
            v-if="isEditing"
            v-model="useProfileStore.form.username"
            type="text"
            placeholder="Type here"
            class="input input-bordered input-sm w-full max-w-xs bg-white"
          />
        </label>
        <label>
          Email
          <p class="font-semibold text-lg">
            {{ useProfileStore.profileDetail?.email }}
          </p>
        </label>
        <label class="flex flex-col gap-2">
          Bio
          <p v-if="!isEditing" class="font-semibold text-lg">
            {{ useProfileStore.profileDetail?.profile_information || "No bio" }}
          </p>
          <textarea
            v-if="isEditing"
            v-model="useProfileStore.form.profile_information"
            class="textarea textarea-bordered bg-white"
            placeholder="Bio"
          ></textarea>
        </label>
        <div class="flex gap-2">
          <button
            v-if="!isEditing"
            type="button"
            class="btn btn-sm text-white"
            @click="handleClickEdit()"
          >
            Edit profile
          </button>
          <button
            v-if="isEditing"
            type="button"
            class="btn btn-sm text-white bg-red-500 border-none"
            @click="() => (isEditing = false)"
          >
            Cancel
          </button>
          <button
            v-if="isEditing"
            type="button"
            class="btn btn-sm text-white bg-purple-800 border-none"
            @click="handleUpdateProfile()"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
const useProfileStore = profileStore();
const isEditing = ref<boolean>(false);

onMounted(async () => {
  await useProfileStore.getOneUser();
});

const handleInputedFile = async (e: Event) => {
  const target = e.target as HTMLInputElement;
  const file = target.files?.[0];
  if (file) {
    useProfileStore.form.user_image = file;

    await useProfileStore.changeProfilePicture();
    await useProfileStore.getOneUser();
  }
};

const handleClickEdit = () => {
  isEditing.value = true;
  useProfileStore.form.username = useProfileStore.profileDetail?.username;
  useProfileStore.form.profile_information =
    useProfileStore.profileDetail?.profile_information;
};

const handleUpdateProfile = async () => {
  await useProfileStore.updateProfile();
  await useProfileStore.getOneUser();
  isEditing.value = false;
};
</script>
