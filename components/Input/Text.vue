<template>
  <div class="relative">
    <input
      :id="id"
      type="text"
      class="w-full py-1.5 px-2.5 block border border-white border-solid rounded text-white text-base truncate bg-black-base focus:border-yellow focus:outline-none focus:shadow-input"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :readonly="readonly"
      @input="handleInput"
    />
  </div>
</template>

<script setup lang="ts">
  import { v4 as uuidv4 } from 'uuid';

  withDefaults(
    defineProps<{
      id?: string;
      modelValue: string;
      placeholder?: string;
      disabled?: boolean;
      readonly?: boolean;
    }>(),
    {
      id: uuidv4(),
      placeholder: '',
      disabled: false,
      readonly: false,
    }
  );

  const emits = defineEmits<{
    (e: 'update:modelValue', value: string): void;
  }>();

  const handleInput = ($event: Event): void => {
    const value = ($event.target as HTMLInputElement).value;
    emits('update:modelValue', value);
  };
</script>
