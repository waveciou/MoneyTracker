<template>
  <div class="relative">
    <div
      class="after-font-material relative border border-white border-solid rounded overflow-hidden after:content-['\e5cf'] after:w-9 after:h-full after:flex after:justify-center after:items-center after:absolute after:top-0 after:right-0 after:pointer-events-none"
    >
      <select
        :id="props.id"
        v-model="contextValue"
        class="w-full py-1.5 pl-2.5 pr-9 block text-white text-base truncate bg-black-base appearance-none cursor-pointer focus:outline-none"
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
  import { watch } from 'vue';
  import { v4 as uuidv4 } from 'uuid';
  import { IInputSelectOption } from '@/assets/interfaces/element';

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
