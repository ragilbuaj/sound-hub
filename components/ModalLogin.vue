<template>
  <dialog class="modal" :class="$props.showModal">
    <div class="modal-box bg-white">
      <h3 class="text-lg text-black font-bold">Hello!</h3>
      <p class="py-4 text-black">You need to log in to access this tab.</p>
      <div class="modal-action flex gap-2">
        <button
          class="btn bg-[#6d31edff] text-white border-none hover:bg-neutral-500"
          @click="handleClickLoginButton()"
        >
          Login
        </button>
        <button
          class="btn bg-white text-black hover:bg-neutral-500"
          @click="$emit('closeModal')"
        >
          Close
        </button>
      </div>
    </div>
  </dialog>
</template>

<script setup lang="ts">
export interface Props {
  showModal: string;
}

const props = defineProps<Props>();
const router = useRouter();

const handleClickLoginButton = () => {
  router.push("/login");
};
</script>
