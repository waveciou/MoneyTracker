<template>
  <div class="w-full relative">
    <div
      class="after-font-material icon-arrow-down w-full relative border border-white border-solid rounded overflow-hidden after:w-9 after:h-full after:flex after:justify-center after:items-center after:absolute after:top-0 after:right-0"
    >
      <select
        :id="id"
        class="w-full py-1.5 pl-2.5 pr-9 block text-white text-base truncate bg-black-base appearance-none cursor-pointer focus:outline-none"
        :disabled="disabled"
        @input="handleInput"
      >
        <option v-for="item in options" :key="item.id" :value="item.id">
          {{ item.name }}
        </option>
      </select>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { v4 as uuidv4 } from 'uuid';
  import { IInputSelectOption } from '@/assets/interfaces/element';

  withDefaults(
    defineProps<{
      id?: string;
      modelValue: string;
      options: IInputSelectOption[];
      disabled?: boolean;
    }>(),
    {
      id: uuidv4(),
      disabled: false,
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

<style lang="scss" scoped>
  .icon-arrow-down::after {
    content: '\e5cf';
  }
</style>
