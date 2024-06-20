<template>
  <div v-if="data" v-for="item in $props.data" class="flex items-center">
    <input
      :id="item.for"
      type="checkbox"
      class="w-4 h-4 text-[#702cec] bg-gray-100 border-gray-300 rounded focus:ring-[#702cec] dark:focus:ring-[#702cec] dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
      :required="$props.isRequired"
      @change="handleChange"
    />
    <label
      v-if="label"
      :for="item.for"
      class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
      >{{ item.label }}</label
    >
  </div>

  <div v-else class="flex items-center">
    <input
      :id="$props.for"
      type="checkbox"
      class="w-5 h-5 text-[#702cec] bg-gray-100 border-gray-300 rounded focus:ring-[#702cec] dark:focus:ring-[#702cec] dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
      :required="$props.isRequired"
      @change="handleChange"
    />
    <label
      v-if="label"
      :for="$props.for"
      class="ms-2 text-base font-medium text-gray-900 dark:text-gray-300"
      >{{ $props.label }}</label
    >
  </div>
</template>

<script setup lang="ts">
export interface Props {
  label?: string;
  for?: string;
  data?: Array<any>;
  isRequired: boolean;
}

const prop = defineProps<Props>();

const emit = defineEmits(["change"]);

const handleChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emit("change", target.checked);
};
</script>
