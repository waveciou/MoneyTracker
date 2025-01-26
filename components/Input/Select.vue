<template>
  <div class="relative">
    <div
      class="after-font-material relative overflow-hidden rounded border border-solid border-white after:pointer-events-none after:absolute after:right-0 after:top-0 after:flex after:h-full after:w-9 after:items-center after:justify-center after:content-['\e5cf']"
    >
      <select
        :id="props.id"
        v-model="contextValue"
        class="block w-full cursor-pointer appearance-none truncate bg-black-base py-1.5 pl-2.5 pr-9 text-base text-white focus:outline-none"
        :disabled="props.disabled"
      >
        <option v-for="item in props.options" :key="item.id" :value="item.id">
          {{ item.name }}
        </option>
      </select>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { v4 as uuidv4 } from 'uuid';
  import type { IInputSelectOption } from '@/assets/types/element';

  const props = withDefaults(
    defineProps<{
      id?: string;
      modelValue: string | number;
      options: IInputSelectOption[];
      disabled?: boolean;
    }>(),
    {
      id: uuidv4(),
      disabled: false,
    }
  );

  const emits = defineEmits<{
    (e: 'update:modelValue', value: string | number): void;
  }>();

  const contextValue = ref<string | number>(props.modelValue);

  watch(
    () => props.modelValue,
    (value: string | number) => {
      contextValue.value = value;
    }
  );

  watch(
    () => contextValue.value,
    (value: string | number) => {
      emits('update:modelValue', value);
    }
  );
</script>
