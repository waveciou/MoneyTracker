<template>
  <div class="w-full relative">
    <input
      v-model.number="contextQuantity"
      type="number"
      class="w-full py-1.5 px-2.5 block border border-white border-solid rounded text-white text-base truncate bg-black-base focus:border-yellow focus:outline-none focus:shadow-input"
      :placeholder="placeholder"
      :disabled="disabled"
      :readonly="readonly"
      @focus="handleFocus"
      @blur="handleBlur"
    />
  </div>
</template>

<script setup lang="ts">
  import { ref, computed, watch, onBeforeMount } from 'vue';

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

  const quantity = ref<number>(0);

  onBeforeMount(() => {
    quantity.value = Number(props.modelValue);
  });

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

  const contextQuantity = computed({
    get(): number {
      return quantity.value;
    },
    set(value: number): void {
      const reg = /^[0-9]*$/;
      const verification = !!reg.test(value as unknown as string);
      quantity.value = verification ? value : 0;
    },
  });

  const handleFocus = (): void => {
    if (quantity.value === 0) {
      quantity.value = '' as unknown as number;
    }
  };

  const handleBlur = (): void => {
    if (quantity.value === ('' as unknown as number)) {
      quantity.value = 0;
    }
  };
</script>

<style scoped></style>
