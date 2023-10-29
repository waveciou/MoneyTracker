<template>
  <div>
    <label class="block text-base font-bold mb-2">Category</label>
    <div class="flex items-center">
      <div class="flex-1 mr-[0.3125rem]">
        <InputSelect
          v-model="contextMainCategory"
          :options="optionMainCategory"
          class="w-full"
        />
      </div>
      <div class="flex-1 ml-[0.3125rem]">
        <InputSelect
          v-model="contextSubCategory"
          :options="optionSubCategory"
          class="w-full"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { computed, watch } from 'vue';
  import { storeToRefs } from 'pinia';
  import { useCategoriesStore } from '@/stores/categoriesStore';
  import { IInputSelectOption } from '@/assets/interfaces/element';
  import { EnumRecordType } from '@/assets/enums/record';

  interface ISelectedID {
    main: string;
    sub: string;
  }

  const props = defineProps<{ modelValue: string }>();
  const emits = defineEmits<{
    (e: 'update:modelValue', value: string): void;
  }>();

  const categoriesStore = useCategoriesStore();
  const { expense } = storeToRefs(categoriesStore);

  // Validate & Getting Default Main Category ID

  const provideDefaultMainID = (subCategoryID: string): string => {
    if (useCategoryValidator(subCategoryID) !== EnumRecordType.EXPENSE) {
      return expense.value[0].id || '';
    }
    const mainItem = expense.value.find(({ subcategories }) => {
      return subcategories.some(({ id }) => id === subCategoryID);
    });
    return mainItem ? mainItem.id : '';
  };

  // Validate & Getting Default Sub Category ID

  const provideDefaultSubID = (subCategoryID: string): string => {
    if (useCategoryValidator(subCategoryID) !== EnumRecordType.EXPENSE) {
      return expense.value[0].subcategories[0].id || '';
    }
    return subCategoryID;
  };

  const selectedItem = ref<ISelectedID>({
    main: provideDefaultMainID(props.modelValue),
    sub: provideDefaultSubID(props.modelValue),
  });

  const contextMainCategory = computed({
    get(): string {
      return selectedItem.value.main;
    },
    set(value) {
      selectedItem.value.main = value;
      const mainItem = expense.value.find(({ id }) => value === id);
      selectedItem.value.sub = mainItem?.subcategories[0].id || '';
    },
  });

  const contextSubCategory = computed({
    get(): string {
      return selectedItem.value.sub;
    },
    set(value) {
      selectedItem.value.sub = value;
    },
  });

  const optionMainCategory = computed((): IInputSelectOption[] => {
    return categoriesStore.optionsExpenseMainCategory;
  });

  const optionSubCategory = computed((): IInputSelectOption[] => {
    const mainItem = expense.value.find(
      ({ id }) => selectedItem.value.main === id
    );
    return mainItem?.subcategories.map(({ id, name }) => ({ id, name })) || [];
  });

  watch(
    () => selectedItem.value,
    (value) => {
      emits('update:modelValue', value.sub);
    },
    { immediate: true, deep: true }
  );
</script>
