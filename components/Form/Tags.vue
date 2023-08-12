<template>
  <div>
    <label :for="id" class="block text-base mb-2">Tags</label>
    <InputHashTags
      :id="id"
      v-model="contextValue"
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
  const contextValue = ref<string[]>([...props.modelValue]);

  watch(
    () => contextValue.value,
    (value: string[]) => {
      emits('update:modelValue', [...value]);
    },
    {
      deep: true,
    }
  );
</script>
