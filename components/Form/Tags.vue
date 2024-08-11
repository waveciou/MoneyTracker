<template>
  <div>
    <label :for="id" class="block text-base font-bold mb-2">Tags</label>
    <InputHashTags
      :id="id"
      v-model="selectedValue"
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
      modelValue: string[];
      placeholder?: string;
      disabled?: boolean;
      readonly?: boolean;
    }>(),
    {
      placeholder: '',
      disabled: false,
      readonly: false,
    }
  );

  const emits = defineEmits<{
    (e: 'update:modelValue', value: string[]): void;
  }>();

  const id = ref<string>(uuidv4());
  const selectedValue = ref<string[]>([...props.modelValue]);

  watch(
    () => props.modelValue,
    (value: string[]) => {
      if (value.length <= 0) {
        selectedValue.value = [...value];
      }
    },
    { deep: true }
  );

  watch(
    () => selectedValue.value,
    (value: string[]) => {
      if (value.length > 0) {
        emits('update:modelValue', [...value]);
      }
    },
    { deep: true }
  );
</script>
