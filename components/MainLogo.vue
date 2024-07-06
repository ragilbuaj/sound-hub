<template>
  <div
    class="w-max flex items-center justify-center gap-1 cursor-pointer"
    @click="handleClickLogo()"
  >
    <img
      src="~/assets/logo.svg"
      alt="logo-soundhub"
      class="w-10 h-10 lg:w-14 lg:h-14"
    />
    <div class="flex flex-col justify-center">
      <h2 class="text-sm lg:text-lg font-bold">SoundHub</h2>
      <p class="text-sm lg:text-base">
        Unleash the Sound, Share the Experience.
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
const router = useRouter();

const handleClickLogo = () => {
  router.push("/");
};
</script>
