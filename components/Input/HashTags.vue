<template>
  <div class="relative">
    <ul v-if="modelValue.length" class="flex flex-wrap items-center">
      <li v-for="tag in modelValue" :key="tag" class="max-w-full mr-2 mb-2">
        <button
          class="after-font-material icon-cancel w-full flex items-center py-1 pr-2 pl-2.5 rounded bg-black/40 leading-tight text-sm before:content-['#'] after:block after:ml-1"
          @click="handleDelete(tag)"
        >
          <span class="truncate" v-text="tag" />
        </button>
      </li>
    </ul>
    <div class="relative">
      <input
        :id="id"
        v-model.trim="inputValue"
        type="text"
        class="w-full py-1.5 pl-2.5 pr-9 block border border-white border-solid rounded text-white text-base truncate bg-black-base focus:border-yellow focus:outline-none focus:shadow-input"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
        @keyup.enter="handleCreate"
      />
      <button
        class="before-font-material icon-add-circle w-9 h-full absolute top-0 right-0 flex justify-center items-center"
        @click="handleCreate"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { v4 as uuidv4 } from 'uuid';

  const props = withDefaults(
    defineProps<{
      id?: string;
      modelValue: string[];
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
    (e: 'update:modelValue', value: string[]): void;
  }>();

  const inputValue = ref<string>('');

  const handleCreate = (): void => {
    if (inputValue.value !== '') {
      const tagsSet: Set<string> = new Set([...props.modelValue]);
      tagsSet.add(inputValue.value);
      emits('update:modelValue', [...tagsSet]);
      inputValue.value = '';
    }
  };

  const handleDelete = (payload: string): void => {
    if (payload !== '') {
      const tagsSet: Set<string> = new Set([...props.modelValue]);
      tagsSet.delete(payload);
      emits('update:modelValue', [...tagsSet]);
    }
  };
</script>

<style lang="scss" scoped>
  .icon-add-circle::before {
    content: '\e147';
    @apply text-lg;
  }

  .icon-cancel::after {
    content: '\e5c9';
    @apply text-xs;
  }
</style>
