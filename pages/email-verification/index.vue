<template>
  <div
    class="w-screen h-dvh flex flex-col items-center bg-[#1f2937] text-white"
  >
    <Toast
      :show-toast="isShowToast"
      :message="toastMessage"
      :is-error="isToastError"
    />
    <div class="w-40 h-40 lg:h-80 lg:w-80">
      <img src="~/assets/email.svg" alt="email-logo" />
    </div>
    <div class="lg:h-2/3 flex flex-col gap-3">
      <h1 class="text-xl text-center font-bold lg:text-2xl">
        We have sent you an email
      </h1>
      <p class="text-sm text-center lg:text-lg">
        Click on the email verification link sent to you on
        {{ cookieEmail }}.
      </p>
      <p class="text-sm text-center lg:text-base">
        Didn't receive the email yet?
        <span
          class="font-bold underline decoration-white decoration-2 cursor-pointer"
          @click="handleClickResend()"
          >Send Again</span
        >
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: false,
});

useHead({
  title: "Email Verification",
});

const useAuthStore = authStore();
const isShowToast = ref<boolean>(false);
const isToastError = ref<boolean>(false);
const toastMessage = ref<string>("");

const cookieEmail = useCookie("email");

const handleClickResend = async () => {
  try {
    await useAuthStore.resendVerification();
    isShowToast.value = true;
    toastMessage.value = "Email verification sent successfully";

    setTimeout(() => {
      isShowToast.value = false;
      toastMessage.value = "";
    }, 2000);
  } catch (e) {
    isShowToast.value = true;
    isToastError.value = true;

    setTimeout(() => {
      isShowToast.value = false;
      isToastError.value = false;
    }, 2000);
  }
};
</script>
