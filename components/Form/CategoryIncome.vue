<template>
  <div>
    <label class="mb-2 block text-base font-bold">Category</label>
    <InputSelect
      v-model="selectedID"
      :options="optionCategory"
      class="w-full"
    />
  </div>
</template>

<script setup lang="ts">
  import { storeToRefs } from 'pinia';
  import type { IInputSelectOption } from '@/assets/types/element';
  import { EnumRecordType } from '@/assets/types/record';
  import { useCategoriesStore } from '@/stores/categoriesStore';

  const props = defineProps<{ modelValue: string }>();
  const emits = defineEmits<{
    (e: 'update:modelValue', value: string): void;
  }>();

  const categoriesStore = useCategoriesStore();
  const { income } = storeToRefs(categoriesStore);

  const provideDefaultID = (categoryID: string): string => {
    if (useCategoryValidator(categoryID) !== EnumRecordType.INCOME) {
      return income.value[0].id || '';
    }
    return categoryID;
  };

  const selectedID = ref<string>(provideDefaultID(props.modelValue));

  const optionCategory = computed((): IInputSelectOption[] => {
    return categoriesStore.optionsIncomeMainCategory;
  });

  watch(
    () => selectedID.value,
    (value) => {
      emits('update:modelValue', value);
    },
    { immediate: true, deep: true }
  );
</script>
