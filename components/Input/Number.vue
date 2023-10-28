<template>
  <div class="relative">
    <input
      :id="props.id"
      v-model.number="quantity"
      type="number"
      pattern="\d*"
      inputmode="decimal"
      class="w-full py-1.5 px-2.5 block border border-white border-solid rounded text-white text-base truncate bg-black-base focus:border-yellow focus:outline-none focus:shadow-input"
      :placeholder="props.placeholder"
      :disabled="props.disabled"
      :readonly="props.readonly"
      @imput="handleInput"
      @blur="handleBlur"
      @focus="handleFocus"
    />
  </div>
</template>

<script setup lang="ts">
  import { watch } from 'vue';
  import { v4 as uuidv4 } from 'uuid';

  const props = withDefaults(
    defineProps<{
      id?: string;
      modelValue: number;
      placeholder?: string;
      disabled?: boolean;
      readonly?: boolean;
    }>(),
    {
      id: uuidv4(),
      modelValue: 0,
      placeholder: '',
      disabled: false,
      readonly: false,
    }
  );

  const emits = defineEmits<{
    (e: 'update:modelValue', value: number): void;
  }>();

  const quantity = ref<number>(0);

  watch(
    () => quantity.value,
    (value: number | string) => {
      if (typeof value === 'string') {
        emits('update:modelValue', 0);
      } else {
        emits('update:modelValue', value);
      }
    }
  );

  watch(
    () => props.modelValue,
    (value: number) => (quantity.value = value),
    { immediate: true }
  );

  const handleFocus = (): void => {
    if (quantity.value === 0) {
      quantity.value = '' as unknown as number;
    }
  };

  const handleBlur = (): void => {
    if (typeof quantity.value === 'number') {
      if (quantity.value <= 0) {
        quantity.value = 0;
      } else {
        const numberValue = quantity.value;
        quantity.value = 0;
        quantity.value = numberValue;
      }
    } else {
      quantity.value = 0;
    }
  };

  const handleInput = (): void => {
    if (typeof quantity.value === 'number') {
      if (quantity.value <= 0) {
        quantity.value = 0;
      }
    } else {
      quantity.value = 0;
    }
  };
</script>
