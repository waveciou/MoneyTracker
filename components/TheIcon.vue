<template>
  <div class="before-font-material" :class="provideIconClass" />
</template>

<script setup lang="ts">
  import { storeToRefs } from 'pinia';
  import { useCategoriesStore } from '@/stores/categoriesStore';
  import { IMainCategoriesItem } from '@/assets/interfaces/categories';
  import { EnumRecordType } from '@/assets/enums/record';

  const props = defineProps<{ categoryId: string }>();

  const provideIconClass = computed(() => {
    const categoriesStore = useCategoriesStore();
    const { expense } = storeToRefs(categoriesStore);

    const recordType = useCategoryValidator(props.categoryId);

    if (recordType === EnumRecordType.INCOME) {
      return `icon-${props.categoryId}`;
    }

    if (recordType === EnumRecordType.EXPENSE) {
      return expense.value.reduce(
        (prev: string, current: IMainCategoriesItem) => {
          if (prev === '') {
            const { id, subcategories } = current;
            const subcategoryItem = subcategories.find(
              (item) => item.id === props.categoryId
            );
            if (subcategoryItem) {
              return `icon-${id}`;
            }
          }
          return prev;
        },
        '' as string
      );
    }

    return '';
  });
</script>

<style lang="scss" scoped>
  // EXPENSE

  .icon-food::before {
    content: '\e56c';
  }

  .icon-traffic::before {
    content: '\e531';
  }

  .icon-recreation::before {
    content: '\ea65';
  }

  .icon-shopping::before {
    content: '\f1cc';
  }

  .icon-investment::before {
    content: '\e8e5';
  }

  .icon-medical::before {
    content: '\f109';
  }

  .icon-home::before {
    content: '\e587';
  }

  .icon-life::before {
    content: '\ea62';
  }

  .icon-learning::before {
    content: '\e0e0';
  }

  // INCOME

  .icon-salary::before {
    content: '\e263';
  }

  .icon-bonus::before {
    content: '\ef63';
  }

  .icon-allowance::before {
    content: '\f8ff';
  }

  .icon-interest::before {
    content: '\eb70';
  }

  .icon-investment-profit::before {
    content: '\e6e1';
  }
</style>
