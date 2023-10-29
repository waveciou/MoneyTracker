<template>
  <div>
    <label :for="id" class="block text-base font-bold mb-2">Note</label>
    <InputTextArea
      :id="id"
      v-model.trim="selectedValue"
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
      modelValue: string;
      placeholder?: string;
      disabled?: boolean;
      readonly?: boolean;
    }>(),
    {
      modelValue: '',
      placeholder: '',
      disabled: false,
      readonly: false,
    }
  );

  const emits = defineEmits<{
    (e: 'update:modelValue', value: string): void;
  }>();

  const id = ref<string>(uuidv4());
  const selectedValue = ref<string>(props.modelValue);

  watch(
    () => props.modelValue,
    (value: string) => {
      selectedValue.value = value;
    }
  );

  watch(
    () => selectedValue.value,
    (value: string) => {
      emits('update:modelValue', value);
    }
  );
</script>
