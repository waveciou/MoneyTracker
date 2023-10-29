<template>
  <div class="flex items-center mb-4">
    <button
      class="w-full flex-1 mr-[0.3125rem] py-1.5 px-2.5 block border border-solid rounded text-base font-bold truncate"
      :class="
        props.modelValue === EnumRecordType.EXPENSE
          ? 'bg-yellow border-yellow text-black-darker'
          : 'bg-black-base border-white text-white'
      "
      title="Expense"
      @click="handleClick(EnumRecordType.EXPENSE)"
    >
      EXPENSE
    </button>
    <button
      class="w-full flex-1 ml-[0.3125rem] py-1.5 px-2.5 block border border-solid rounded text-base font-bold truncate"
      :class="
        props.modelValue === EnumRecordType.INCOME
          ? 'bg-yellow border-yellow text-black-darker'
          : 'bg-black-base border-white text-white'
      "
      title="Income"
      @click="handleClick(EnumRecordType.INCOME)"
    >
      INCOME
    </button>
  </div>
</template>

<script setup lang="ts">
  import { EnumRecordType } from '@/assets/enums/record';

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
