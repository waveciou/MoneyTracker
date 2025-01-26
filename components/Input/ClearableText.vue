<template>
  <div class="relative">
    <input
      :id="props.id"
      type="text"
      class="block w-full truncate rounded border border-solid border-white bg-black-base py-1.5 pl-2.5 pr-9 text-base text-white focus:border-yellow focus:shadow-input focus:outline-none"
      :value="props.modelValue"
      :placeholder="props.placeholder"
      :disabled="props.disabled"
      :readonly="props.readonly"
      @input="handleInput"
    />
    <button
      class="before-font-material absolute right-0 top-0 flex h-full w-9 items-center justify-center before:text-lg before:content-['\e5c9']"
      title="Clear"
      @click="handleClear"
    />
  </div>
</template>

<script setup lang="ts">
  import { v4 as uuidv4 } from 'uuid';

  const props = withDefaults(
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
