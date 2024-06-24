<template>
  <div class="w-full h-dvh flex items-center justify-center">
    <Toast :show-toast="isShowToast" :message="toastMessage" />
    <LoadingIndicator :show-wave="useAuthStore.isLoading" />
    <div
      class="w-full h-full flex flex-col justify-center gap-3 p-8 lg:justify-normal lg:p-20"
      :class="useAuthStore.isLoading ? 'blur-sm' : ''"
    >
      <MainLogo />
      <button
        type="button"
        class="flex items-center mt-10"
        @click="handleClickBack()"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1.5em"
          height="1.5em"
          viewBox="0 0 24 24"
        >
          <path
            fill="#7d2ac0"
            d="m3.55 12l7.35 7.35q.375.375.363.875t-.388.875t-.875.375t-.875-.375l-7.7-7.675q-.3-.3-.45-.675T.825 12t.15-.75t.45-.675l7.7-7.7q.375-.375.888-.363t.887.388t.375.875t-.375.875z"
          ></path>
        </svg>
        <span class="font-bold text-[#702cec]">Back</span>
      </button>
      <h1 class="text-4xl font-bold mt-20">Forgot your password?</h1>
      <p>
        Enter the email for your account so we can send you a link to reset your
        password.
      </p>
      <form
        @submit.prevent="handleClickResetPassword()"
        class="w-full flex flex-col gap-3"
      >
        <div class="w-full mt-8 flex flex-col gap-4">
          <InputText
            :model="useAuthStore.resetPasswordData.email"
            :placeholder="'email@gmail.com'"
            :width="'full lg:w-3/4'"
            :is-required="true"
            @input="handleInputText($event)"
            :is-error="isError"
            :err-message="errMessage"
          />
        </div>
        <button
          type="submit"
          class="w-full lg:w-1/4 xl:w-1/6 mt-10 text-white bg-[#702cec] hover:bg-purple-950 focus:ring-4 focus:ring-purple-400 font-medium rounded-lg text-md px-4 py-2 me-2 dark:bg-[#702cec] dark:hover:bg-purple-950 focus:outline-none dark:focus:ring-purple-400"
        >
          Send Email
        </button>
      </form>
    </div>
    <div
      class="w-full h-full bg-[url('/assets/login-image.svg')] bg-center bg-no-repeat bg-cover hidden lg:block"
      :class="useAuthStore.isLoading ? 'blur-sm' : ''"
    ></div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: false,
});

const useAuthStore = authStore();

const isError = ref<boolean>(false);
const errMessage = ref<string>("");
const isShowToast = ref<boolean>(false);
const toastMessage = ref<string>("");

const router = useRouter();

const handleInputText = (e: string) => {
  useAuthStore.resetPasswordData.email = e;
};

const handleClickResetPassword = async () => {
  await useAuthStore.resetPassword();
  isShowToast.value = true;
  toastMessage.value = "Email sent successfully";
  useAuthStore.resetPasswordData.email = "";

  setTimeout(() => {
    isShowToast.value = false;
    toastMessage.value = "";
  }, 2000);
};

const handleClickBack = () => {
  router.back();
};
</script>
