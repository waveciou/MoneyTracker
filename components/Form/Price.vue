<template>
  <div>
    <label :for="id" class="block text-base font-bold mb-2">Price</label>
    <InputNumber
      :id="id"
      v-model.number="selectedValue"
      :placeholder="props.placeholder"
      :disabled="props.disabled"
      :readonly="props.readonly"
    />
  </div>
</template>

<script setup lang="ts">
  import { v4 as uuidv4 } from 'uuid';

  const props = withDefaults(
    defineProps<{
      modelValue: number;
      placeholder?: string;
      disabled?: boolean;
      readonly?: boolean;
    }>(),
    {
      modelValue: 0,
      placeholder: '',
      disabled: false,
      readonly: false,
    }
  );

  const emits = defineEmits<{
    (e: 'update:modelValue', value: number): void;
  }>();

  const id = ref<string>(uuidv4());
  const selectedValue = ref<number>(props.modelValue);

  watch(
    () => props.modelValue,
    (value: number) => {
      selectedValue.value = value;
    }
  );

  watch(
    () => selectedValue.value,
    (value: number) => {
      emits('update:modelValue', value);
    }
  );
</script>
