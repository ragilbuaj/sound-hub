<template>
  <div>
    <p
      v-if="$props.isError"
      class="mt-2 text-sm text-red-600 mb-2 dark:text-red-500"
    >
      {{ $props.errMessage }}
    </p>
    <label
      v-if="$props.label"
      :for="$props.for"
      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >{{ $props.label }}</label
    >
    <div
      class="relative flex items-center"
      :class="$props.width ? `w-${$props.width}` : 'w-full'"
    >
      <input
        :type="$props.isPassword && visibility ? 'password' : 'text'"
        :id="$props.for"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#702cec] focus:border-[#702cec] block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-[#702cec] dark:focus:border-[#702cec]"
        :class="'w-full'"
        :placeholder="$props.placeholder"
        v-model="$props.model"
        @input="handleInput"
        :required="$props.isRequired"
      />
      <div
        class="absolute end-3 fill-current"
        @click="handleChangeVisibility()"
      >
        <svg
          v-if="visibility && $props.isPassword"
          xmlns="http://www.w3.org/2000/svg"
          width="1.25em"
          height="1.25em"
          viewBox="0 0 24 24"
        >
          <path
            fill="#4b535d"
            d="M12 16q1.875 0 3.188-1.312T16.5 11.5t-1.312-3.187T12 7T8.813 8.313T7.5 11.5t1.313 3.188T12 16m0-1.8q-1.125 0-1.912-.788T9.3 11.5t.788-1.912T12 8.8t1.913.788t.787 1.912t-.787 1.913T12 14.2m0 4.8q-3.65 0-6.65-2.037T1 11.5q1.35-3.425 4.35-5.462T12 4t6.65 2.038T23 11.5q-1.35 3.425-4.35 5.463T12 19m0-2q2.825 0 5.188-1.487T20.8 11.5q-1.25-2.525-3.613-4.012T12 6T6.813 7.488T3.2 11.5q1.25 2.525 3.613 4.013T12 17"
          ></path>
        </svg>

        <svg
          v-if="!visibility && $props.isPassword"
          xmlns="http://www.w3.org/2000/svg"
          width="1.25em"
          height="1.25em"
          viewBox="0 0 24 24"
        >
          <path
            fill="#4b535d"
            d="m19.1 21.9l-3.5-3.45q-.875.275-1.775.413T12 19q-3.35 0-6.125-1.8t-4.35-4.75q-.125-.225-.187-.462t-.063-.488t.063-.488t.187-.462q.55-.975 1.175-1.9T4.15 7L2.075 4.9Q1.8 4.625 1.8 4.213t.3-.713q.275-.275.7-.275t.7.275l17 17q.275.275.288.688t-.288.712q-.275.275-.7.275t-.7-.275M12 16q.275 0 .525-.025t.5-.1l-5.4-5.4q-.075.25-.1.5T7.5 11.5q0 1.875 1.313 3.188T12 16m0-12q3.35 0 6.138 1.813t4.362 4.762q.125.2.188.438t.062.487t-.05.488t-.175.437q-.475.925-1.062 1.75t-1.313 1.55q-.35.35-.825.325t-.825-.375l-2-2q-.175-.175-.225-.413t.025-.487q.1-.325.15-.625t.05-.65q0-1.875-1.312-3.187T12 7q-.35 0-.65.05t-.625.15q-.25.075-.5.025T9.8 7l-.825-.825q-.475-.475-.312-1.1t.787-.8q.625-.125 1.263-.2T12 4m1.975 5.65q.275.325.462.713t.238.812q.025.2-.15.275t-.325-.075l-2.05-2.05Q12 9.175 12.088 9t.287-.175q.475.05.875.263t.725.562"
          ></path>
        </svg>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
export interface Props {
  model: string | any;
  label?: string;
  for?: string;
  placeholder: string;
  isPassword?: boolean;
  isRequired: boolean;
  width?: string;
  isError?: boolean;
  errMessage?: string;
}

const props = defineProps<Props>();

const emit = defineEmits(["input", "keyup.enter"]);
const visibility = ref<boolean>(true);

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emit("input", target.value);
};

const handleChangeVisibility = () => {
  visibility.value = !visibility.value;
};
</script>
