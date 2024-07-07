<template>
  <div class="">
    <label
      v-if="$props.label"
      :for="$props.for"
      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >Select a number:</label
    >
    <input
      type="number"
      :id="$props.for"
      v-model="$props.model"
      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
      :placeholder="$props.placeholder"
      :min="0"
      :required="$props.isRequired"
    />
  </div>
</template>

<script setup lang="ts">
export interface Props {
  label?: string;
  for?: string;
  model: number | any;
  placeholder: string;
  isRequired: boolean;
}

const props = defineProps<Props>();
</script>
