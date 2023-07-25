<template>
  <div class="w-full relative">
    <input
      :id="id"
      type="text"
      class="w-full py-1.5 pl-2.5 pr-9 block border border-white border-solid rounded text-white text-base truncate bg-black-base focus:border-yellow focus:outline-none focus:shadow-input"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :readonly="readonly"
      @input="handleInput"
    />
    <button
      class="before-font-material icon-clear w-9 h-full absolute top-0 right-0 flex justify-center items-center"
      @click="handleClear"
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

  const handleClear = (): void => {
    emits('update:modelValue', '');
  };
</script>

<style lang="scss" scoped>
  .icon-clear::before {
    content: '\e5c9';
    @apply text-lg;
  }
</style>
