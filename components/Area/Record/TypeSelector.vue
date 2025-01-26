<template>
  <div class="mb-4 flex items-center">
    <button
      class="mr-[0.3125rem] block w-full flex-1 truncate rounded border border-solid px-2.5 py-1.5 text-base font-bold"
      :class="
        props.modelValue === EnumRecordType.EXPENSE
          ? 'border-yellow bg-yellow text-black-darker'
          : 'border-white bg-black-base text-white'
      "
      title="Expense"
      @click="handleClick(EnumRecordType.EXPENSE)"
    >
      EXPENSE
    </button>
    <button
      class="ml-[0.3125rem] block w-full flex-1 truncate rounded border border-solid px-2.5 py-1.5 text-base font-bold"
      :class="
        props.modelValue === EnumRecordType.INCOME
          ? 'border-yellow bg-yellow text-black-darker'
          : 'border-white bg-black-base text-white'
      "
      title="Income"
      @click="handleClick(EnumRecordType.INCOME)"
    >
      INCOME
    </button>
  </div>
</template>

<script setup lang="ts">
  import { EnumRecordType } from '@/assets/types/record';

  const props = withDefaults(defineProps<{ modelValue: string }>(), {
    modelValue: EnumRecordType.EXPENSE,
  });

  const emits = defineEmits<{
    (e: 'update:modelValue', value: EnumRecordType): void;
  }>();

  const handleClick = (payload: EnumRecordType): void => {
    emits('update:modelValue', payload);
  };
</script>
