<template>
  <div v-if="data" v-for="item in $props.data" class="flex items-center">
    <input
      :id="item.for"
      type="checkbox"
      class="w-4 h-4 text-[#702cec] bg-gray-100 border-gray-300 rounded focus:ring-[#702cec]"
      :required="$props.isRequired"
      :disabled="$props.isReadOnly"
      :checked="$props.isChecked"
      @change="handleChange"
    />
    <label :for="item.for" class="ms-2 text-sm font-medium">{{ item }}</label>
  </div>

  <div v-else class="flex items-center">
    <input
      :id="$props.for"
      type="checkbox"
      class="w-3 h-3 lg:w-5 lg:h-5 text-[#702cec] bg-gray-100 border-gray-300 rounded focus:ring-[#702cec] focus:ring-2"
      :required="$props.isRequired"
      @change="handleChange"
    />
    <label
      v-if="label"
      :for="$props.for"
      class="ms-2 text-xs lg:text-base font-medium"
      >{{ $props.label }}</label
    >
  </div>
</template>

<script setup lang="ts">
export interface Props {
  label?: string;
  for?: string;
  data?: Array<any>;
  isReadOnly?: boolean;
  isChecked?: boolean;
  isRequired: boolean;
}

const props = defineProps<Props>();

const emit = defineEmits(["change"]);

const handleChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emit("change", target.checked);
};
</script>
