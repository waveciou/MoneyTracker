<template>
  <div class="relative">
    <ul v-if="props.modelValue.length" class="flex flex-wrap items-center">
      <li
        v-for="tag in props.modelValue"
        :key="tag"
        class="max-w-full mr-2 mb-2"
      >
        <button
          class="after-font-material w-full flex items-center py-1 pr-2 pl-2.5 rounded bg-black/40 leading-tight text-sm before:content-['#'] after:content-['\e5c9'] after:block after:ml-1 after:text-xs"
          title="Delete"
          @click="handleDelete(tag)"
        >
          <span class="truncate" v-text="tag" />
        </button>
      </li>
    </ul>
    <div class="relative">
      <input
        :id="props.id"
        v-model.trim="inputValue"
        type="text"
        class="w-full py-1.5 pl-2.5 pr-9 block border border-white border-solid rounded text-white text-base truncate bg-black-base focus:border-yellow focus:outline-none focus:shadow-input"
        :placeholder="props.placeholder"
        :disabled="props.disabled"
        :readonly="props.readonly"
        @keyup.enter="handleCreate"
      />
      <button
        class="before-font-material before:content-['\e147'] before:text-lg w-9 h-full absolute top-0 right-0 flex justify-center items-center"
        title="Create"
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
