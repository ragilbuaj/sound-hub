<template>
  <div class="flex flex-col">
    <label
      v-if="$props.label"
      :for="$props.for"
      class="w-full text-sm font-medium text-gray-900"
      >{{ $props.label }}</label
    >
    <select
      :id="$props.for"
      v-model="inputValue"
      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
      :placeholder="$props.placeholder"
      :required="$props.isRequired"
      @change="handleChange"
    >
      <option v-for="(item, index) in $props.data" :key="index" :value="item">
        {{ item }}
      </option>
    </select>
  </div>
</template>

<script setup lang="ts">
export interface Props {
  label?: string;
  for?: string;
  model: string | any;
  data: any;
  placeholder: string;
  isRequired: boolean;
}

const props = defineProps<Props>();
const inputValue = ref<string>("");
const emit = defineEmits(["update"]);

watch(
  () => props.model,
  (newValue) => {
    inputValue.value = newValue;
  }
);

const handleChange = (e: Event) => {
  const target = e.target as HTMLInputElement;
  emit("update", target.value);
};
</script>
