<template>
  <div class="flex items-center mb-4">
    <button
      class="w-full flex-1 mr-[0.3125rem] py-1.5 px-2.5 block border border-solid rounded text-base truncate"
      :class="
        props.modelValue === EnumAccountType.EXPENSE
          ? 'bg-yellow border-yellow text-black-darker'
          : 'bg-black-base border-white text-white'
      "
      title="Expense"
      @click="handleClick(EnumAccountType.EXPENSE)"
    >
      EXPENSE
    </button>
    <button
      class="w-full flex-1 ml-[0.3125rem] py-1.5 px-2.5 block border border-solid rounded text-base truncate"
      :class="
        props.modelValue === EnumAccountType.INCOME
          ? 'bg-yellow border-yellow text-black-darker'
          : 'bg-black-base border-white text-white'
      "
      title="Income"
      @click="handleClick(EnumAccountType.INCOME)"
    >
      INCOME
    </button>
  </div>
</template>

<script setup lang="ts">
  import { EnumAccountType } from '@/assets/enums/record';

  const props = withDefaults(defineProps<{ modelValue: string }>(), {
    modelValue: EnumAccountType.EXPENSE,
  });

  const emits = defineEmits<{
    (e: 'update:modelValue', value: EnumAccountType): void;
  }>();

  const handleClick = (payload: EnumAccountType): void => {
    emits('update:modelValue', payload);
  };
</script>
