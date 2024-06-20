<template>
  <div class="w-full h-dvh flex items-center justify-center">
    <LoadingIndicator :show-wave="useAuthStore.isLoading" />
    <div
      class="w-full h-full flex flex-col justify-center gap-3 p-8 lg:justify-normal lg:p-20"
      :class="useAuthStore.isLoading ? 'blur-sm' : ''"
    >
      <MainLogo />
      <h1 class="text-4xl font-bold mt-20">Hello,</h1>
      <h1 class="text-4xl font-bold">Welcome Back!</h1>
      <p>Log In to Your Sound Hub.</p>
      <div class="w-full mt-8 flex flex-col gap-4">
        <InputText
          :placeholder="'email@gmail.com'"
          :width="'full lg:w-3/4'"
          :is-required="true"
          @input="handleInputText($event, 'email')"
          @keyup.enter="handleClickSignIn"
          :is-error="isError"
          :err-message="errMessage"
        />
        <InputText
          :is-password="true"
          :placeholder="'your password'"
          :width="'full lg:w-3/4'"
          :is-required="true"
          @input="handleInputText($event, 'password')"
          @keyup.enter="handleClickSignIn"
        />
      </div>
      <div class="w-full lg:w-3/4 flex items-center justify-between">
        <InputCheckbox
          :label="'Remember me'"
          :for="'remember-me'"
          :is-required="false"
          @change="handleChangeRememberMe"
        />
        <a href="#" class="hover:text-[#702cec]">Forgot Password?</a>
      </div>
      <button
        type="button"
        class="w-full lg:w-1/4 xl:w-1/6 mt-10 text-white bg-[#702cec] hover:bg-purple-950 focus:ring-4 focus:ring-purple-400 font-medium rounded-lg text-md px-4 py-2 me-2 dark:bg-[#702cec] dark:hover:bg-purple-950 focus:outline-none dark:focus:ring-purple-400"
        @click="handleClickSignIn()"
        @keydown.enter="handleClickSignIn()"
      >
        Sign In
      </button>
      <p class="mt-16">
        Don't have an account?
        <a
          href="/sign-up"
          class="text-[#702cec] font-bold hover:text-purple-950"
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

const useAuthStore = authStore();
const email = ref<string>("");
const password = ref<string>("");
const checkbox = ref<boolean>(false);

const isError = ref<boolean>(false);
const errMessage = ref<string>("");

const router = useRouter();

const handleChangeRememberMe = (e: boolean) => {
  checkbox.value = e;
};

const handleInputText = (e: string, model: string) => {
  if (model == "email") {
    email.value = e;
  } else if (model == "password") {
    password.value = e;
  }
};

const handleClickSignIn = async () => {
  await useAuthStore.signInUser(email.value, password.value);

  if (useAuthStore.authData?.email_verified == true) {
    isError.value = false;
    errMessage.value = "";
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
