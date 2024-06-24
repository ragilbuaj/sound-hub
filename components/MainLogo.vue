<template>
  <div class="w-max flex gap-1 cursor-pointer" @click="handleClickLogo()">
    <img src="~/assets/logo.svg" alt="logo-soundhub" class="w-14 h-14" />
    <div class="flex flex-col justify-center">
      <h2 class="text-lg font-bold">SoundHub</h2>
      <p>Unleash the Sound, Share the Experience.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
const router = useRouter();

const handleClickLogo = () => {
  router.push("/");
};
</script>
