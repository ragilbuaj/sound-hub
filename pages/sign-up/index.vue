<template>
  <div class="w-full h-dvh flex items-center justify-center">
    <LoadingIndicator :show-wave="useAuthStore.isLoading" />
    <div
      class="w-full h-full flex flex-col justify-center gap-3 p-8 lg:justify-normal lg:p-20"
      :class="useAuthStore.isLoading ? 'blur-sm' : ''"
    >
      <MainLogo />
      <p class="mt-20">Welcome to SoundHub</p>
      <h1 class="text-4xl font-bold">Create your account</h1>
      <p>
        Already have an account?
        <a href="/login" class="text-[#702cec] font-bold hover:text-purple-950"
          >Sign In</a
        >
      </p>
      <form
        @submit.prevent="handleClickRegister()"
        class="w-full flex flex-col gap-3"
      >
        <div class="w-full mt-8 flex flex-col gap-4">
          <InputText
            :model="useAuthStore.registData.username"
            :placeholder="'your name'"
            :width="'full lg:w-3/4'"
            :label="'Your Name'"
            :for="'username'"
            :is-required="true"
            @input="handleInputText($event, 'username')"
            :is-error="isError"
            :err-message="errMessage"
          />
          <InputText
            :model="useAuthStore.registData.email"
            :placeholder="'example@gmail.com'"
            :width="'full lg:w-3/4'"
            :label="'Your Email'"
            :for="'email'"
            :is-required="true"
            @input="handleInputText($event, 'email')"
          />
          <InputText
            :model="useAuthStore.registData.password"
            :is-password="true"
            :placeholder="'your password'"
            :label="'Password'"
            :for="'password'"
            :width="'full lg:w-3/4'"
            :is-required="true"
            @input="handleInputText($event, 'password')"
          />
        </div>
        <button
          type="submit"
          class="w-full lg:w-2/6 xl:w-1/4 mt-10 text-white bg-[#702cec] hover:bg-purple-950 focus:ring-4 focus:ring-purple-400 font-medium rounded-lg text-md px-4 py-2 me-2 dark:bg-[#702cec] dark:hover:bg-purple-950 focus:outline-none dark:focus:ring-purple-400"
        >
          Register Now
        </button>
      </form>
    </div>
    <div
      class="w-full h-full bg-[url('/assets/register-image.svg')] bg-center bg-no-repeat bg-cover hidden lg:block"
      :class="useAuthStore.isLoading ? 'blur-sm' : ''"
    ></div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: false,
});

import InputText from "@/components/Input/InputText.vue";

const useAuthStore = authStore();
const router = useRouter();
const route = useRoute();
const isError = ref<boolean>(false);
const errMessage = ref<string>("");

if (route.query.role === "admin") {
  useAuthStore.registData.role = "admin";
} else {
  useAuthStore.registData.role = "user";
}

const handleInputText = (e: string, model: string) => {
  if (model == "username") {
    useAuthStore.registData.username = e;
  } else if (model == "email") {
    useAuthStore.registData.email = e;
  } else if (model == "password") {
    useAuthStore.registData.password = e;
  }
};

const handleClickRegister = async () => {
  const user: any = await useAuthStore.signUpUser();

  if (user?.error.value?.data?.status === 409) {
    isError.value = true;
    errMessage.value = "Email has been used";
  } else if (user?.error.value?.data?.status === 500) {
    isError.value = true;
    errMessage.value = "An error occurred while registering the user";
  } else {
    useAuthStore.resetRegistData();
    isError.value = false;
    errMessage.value = "";
    router.push("/login");
  }
};
</script>
