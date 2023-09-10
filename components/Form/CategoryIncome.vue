<template>
  <div>
    <label class="block text-base mb-2">Category</label>
    <InputSelect
      v-model="selectedID"
      :options="optionCategory"
      class="w-full"
    />
  </div>
</template>

<script setup lang="ts">
  import { computed, watch } from 'vue';
  import { storeToRefs } from 'pinia';
  import { useCategoriesStore } from '@/stores/categoriesStore';
  import { IInputSelectOption } from '@/assets/interfaces/element';
  import { EnumAccountType } from '@/assets/enums/record';

  const props = defineProps<{ modelValue: string }>();
  const emits = defineEmits<{
    (e: 'update:modelValue', value: string): void;
  }>();

  const categoriesStore = useCategoriesStore();
  const { income } = storeToRefs(categoriesStore);

  const provideDefaultID = (categoryID: string): string => {
    if (useValidCategory(categoryID) !== EnumAccountType.INCOME) {
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

<style scoped></style>
