<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<style>
body {
  font-family: "Manrope", sans-serif;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  font-family: "Lexend", sans-serif; /* Headings */
}
</style>

<script setup lang="ts">
useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `SoundHub - ${titleChunk}` : "SoundHub";
  },
});
</script>
