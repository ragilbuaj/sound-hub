<template>
  <div>
    <p v-if="$props.isError" class="mt-2 text-sm text-red-600 mb-2">
      {{ $props.errMessage }}
    </p>
    <label
      v-if="$props.label"
      :for="$props.for"
      class="block mb-2 text-sm font-medium"
      >{{ $props.label }}</label
    >
    <div
      class="relative flex items-center"
      :class="$props.width ? `w-${$props.width}` : 'w-full'"
    >
      <textarea
        :id="$props.for"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#702cec] focus:border-[#702cec] block p-2.5"
        :class="'w-full'"
        :placeholder="$props.placeholder"
        v-model="formattedModel"
        v-maska="isNumber ? vmaskaRupiah : ''"
        @input="handleInput"
        :required="$props.isRequired"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
export interface Props {
  model: string | any;
  label?: string;
  for?: string;
  placeholder: string;
  isNumber?: boolean;
  isRequired: boolean;
  width?: string;
  isError?: boolean;
  errMessage?: string;
}

const props = defineProps<Props>();

const emit = defineEmits(["input", "keyup.enter"]);
const visibility = ref<boolean>(true);
const formattedModel = ref(props.model?.toString());

watch(
  () => props.model,
  (newValue) => {
    formattedModel.value = newValue;
  }
);

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  let value = target.value;

  formattedModel.value = value;
  emit("input", formattedModel.value);
};

const handleChangeVisibility = () => {
  visibility.value = !visibility.value;
};
</script>
