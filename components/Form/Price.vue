<template>
  <div>
    <label :for="id" class="block text-base mb-2">Price</label>
    <InputNumber
      :id="id"
      v-model.number="contextValue"
      :placeholder="props.placeholder"
      :disabled="props.disabled"
      :readonly="props.readonly"
    />
  </div>
</template>

<script setup lang="ts">
  import { watch } from 'vue';
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
  const contextValue = ref<number>(props.modelValue);

  watch(
    () => props.modelValue,
    (value: number) => {
      contextValue.value = value;
    }
  );

  watch(
    () => contextValue.value,
    (value: number) => {
      emits('update:modelValue', value);
    }
  );
</script>
