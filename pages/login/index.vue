<template>
  <div class="w-full h-dvh flex items-center justify-center bg-[#1f2937]">
    <LoadingIndicator :show-wave="useAuthStore.isLoading" />
    <div
      class="w-full h-full flex flex-col justify-center gap-3 p-4 lg:justify-normal lg:p-16"
      :class="useAuthStore.isLoading ? 'blur-sm' : ''"
    >
      <MainLogo />
      <h1 class="text-2xl font-bold mt-10">Hello,</h1>
      <h1 class="text-2xl font-bold">Welcome Back!</h1>
      <p>Log In to Your Sound Hub.</p>
      <form
        @submit.prevent="handleClickSignIn()"
        class="w-full flex flex-col gap-3"
      >
        <div class="w-full mt-8 flex flex-col gap-4">
          <InputText
            :model="useAuthStore.signInData.email"
            :placeholder="'email@gmail.com'"
            :width="'full lg:w-3/4'"
            :is-required="true"
            @input="handleInputText($event, 'email')"
            :is-error="isError"
            :err-message="errMessage"
          />
          <InputText
            :model="useAuthStore.signInData.password"
            :is-password="true"
            :placeholder="'your password'"
            :width="'full lg:w-3/4'"
            :is-required="true"
            @input="handleInputText($event, 'password')"
          />
        </div>
        <div
          class="w-full flex items-center justify-end text-xs lg:text-sm lg:w-3/4"
        >
          <a href="/reset-password" class="hover:text-[#702cec]"
            >Forgot your password?</a
          >
        </div>
        <button
          type="submit"
          class="w-full lg:w-1/4 xl:w-1/6 mt-10 text-white bg-[#702cec] hover:bg-purple-950 focus:ring-4 focus:ring-purple-400 font-medium rounded-lg text-md px-4 py-2 me-2 focus:outline-none"
        >
          Sign In
        </button>
      </form>
      <p class="mt-5 lg:mt-16 text-sm lg:text-base">
        Don't have an account?
        <a
          href="/sign-up"
          class="text-white font-bold underline hover:text-purple-950"
          >Sign Up</a
        >
      </p>
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

useHead({
  title: "Login",
});

const useAuthStore = authStore();
const isError = ref<boolean>(false);
const errMessage = ref<string>("");

const router = useRouter();

const handleInputText = (e: string, model: string) => {
  if (model == "email") {
    useAuthStore.signInData.email = e;
  } else if (model == "password") {
    useAuthStore.signInData.password = e;
  }
};

const handleClickSignIn = async () => {
  await useAuthStore.signInUser();

  if (useAuthStore.authData?.email_verified == true) {
    isError.value = false;
    errMessage.value = "";
    useAuthStore.resetSignInData();
    router.push("/");
  } else if (useAuthStore.authData?.email_verified == false) {
    isError.value = true;
    errMessage.value = "Your email has not been verified";
  } else {
    isError.value = true;
    errMessage.value = "Incorrect email/password";
  }
};
</script>
