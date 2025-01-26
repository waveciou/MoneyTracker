<template>
  <div class="relative">
    <ul v-if="props.modelValue.length" class="flex flex-wrap items-center">
      <li
        v-for="tag in props.modelValue"
        :key="tag"
        class="mb-2 mr-2 max-w-full"
      >
        <button
          class="after-font-material flex w-full items-center rounded bg-black/40 py-1 pl-2.5 pr-2 text-sm leading-tight before:content-['#'] after:ml-1 after:block after:text-xs after:content-['\e5c9']"
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
        class="block w-full truncate rounded border border-solid border-white bg-black-base py-1.5 pl-2.5 pr-9 text-base text-white focus:border-yellow focus:shadow-input focus:outline-none"
        :placeholder="props.placeholder"
        :disabled="props.disabled"
        :readonly="props.readonly"
        @keyup.enter="handleCreate"
      />
      <button
        class="before-font-material absolute right-0 top-0 flex h-full w-9 items-center justify-center before:text-lg before:content-['\e147']"
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
