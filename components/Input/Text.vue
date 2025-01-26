<template>
  <div class="relative">
    <input
      :id="props.id"
      type="text"
      class="block w-full truncate rounded border border-solid border-white bg-black-base px-2.5 py-1.5 text-base text-white focus:border-yellow focus:shadow-input focus:outline-none"
      :value="props.modelValue"
      :placeholder="props.placeholder"
      :disabled="props.disabled"
      :readonly="props.readonly"
      @input="handleInput"
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
</script>
