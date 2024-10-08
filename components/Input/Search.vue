<template>
  <div class="relative">
    <input
      :id="props.id"
      ref="inputTextRef"
      type="text"
      class="w-full py-1.5 pl-2.5 pr-9 block border border-white border-solid rounded text-white text-base truncate bg-black-base focus:border-yellow focus:outline-none focus:shadow-input"
      :value="props.modelValue"
      :placeholder="props.placeholder"
      :disabled="props.disabled"
      :readonly="props.readonly"
      @input="handleInput"
    />
    <button
      class="before-font-material before:content-['\e8b6'] before:text-xl w-9 h-full absolute top-0 right-0 flex justify-center items-center"
      title="Search"
      @click="handleSearch"
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
      isOnceFocus?: boolean;
    }>(),
    {
      id: uuidv4(),
      placeholder: '',
      disabled: false,
      readonly: false,
      isOnceFocus: false,
    }
  );

  const emits = defineEmits<{
    (e: 'update:modelValue', value: string): void;
    (e: 'search', value: string): void;
  }>();

  const inputValue = ref<string>('');

  const inputTextRef = ref<HTMLInputElement>(
    null as unknown as HTMLInputElement
  );

  onMounted(() => {
    if (props.isOnceFocus) {
      inputTextRef?.value.focus();
    }
  });

  const handleInput = ($event: Event): void => {
    const value = ($event.target as HTMLInputElement).value;
    inputValue.value = value;
    emits('update:modelValue', value);
  };

  const handleSearch = (): void => {
    emits('search', inputValue.value);
  };
</script>
