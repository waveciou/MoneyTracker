<template>
  <div>
    <InputSelect
      v-model="selectedID"
      :options="optionCategory"
      class="w-full"
    />
  </div>
</template>

<script setup lang="ts">
  import type { IInputSelectOption } from '@/assets/types/element';
  import { EnumRecordType } from '@/assets/types/record';
  import { useCategoriesStore } from '@/stores/categoriesStore';

  const props = defineProps<{ modelValue: string }>();
  const emits = defineEmits<{
    (e: 'update:modelValue', value: string): void;
  }>();

  const categoriesStore = useCategoriesStore();

  const selectedID = ref<string>(props.modelValue);

  const optionCategory = computed((): IInputSelectOption[] => {
    return [
      { id: EnumRecordType.EXPENSE, name: 'All Expense' },
      { id: EnumRecordType.INCOME, name: 'All Income' },
      ...categoriesStore.optionsExpenseMainCategory,
    ];
  });

  watch(
    () => selectedID.value,
    (value) => {
      emits('update:modelValue', value);
    },
    { immediate: true, deep: true }
  );
</script>
