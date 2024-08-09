<template>
  <div class="before-font-material" :class="provideIconClass" />
</template>

<!-- eslint-disable quotes -->
<script setup lang="ts">
  import { storeToRefs } from 'pinia';
  import { useCategoriesStore } from '@/stores/categoriesStore';
  import type { IMainCategoriesItem } from '@/assets/interfaces/categories';
  import { EnumRecordType } from '@/assets/enums/record';

  const props = defineProps<{ categoryId: string }>();

  const incomeIcons = [
    'salary',
    'bonus',
    'allowance',
    'interest',
    'investment-profit',
  ];

  const contextIncomeIcons = computed((): string[] => {
    return incomeIcons.reduce((prev, current) => {
      return [...prev, current, `income_${current}`];
    }, [] as string[]);
  });

  const provideIconClass = computed(() => {
    const categoriesStore = useCategoriesStore();
    const { expense } = storeToRefs(categoriesStore);

    const recordType = useCategoryValidator(props.categoryId);

    if (recordType === EnumRecordType.INCOME) {
      if (contextIncomeIcons.value.includes(props.categoryId)) {
        return `icon-${props.categoryId}`;
      }
      return "bg-[url('@/assets/images/icon.svg')]";
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

    return "bg-[url('@/assets/images/icon.svg')]";
  });
</script>

<style lang="scss" scoped>
  // EXPENSE

  .icon-expense_food::before {
    content: '\e56c';
  }

  .icon-expense_traffic::before {
    content: '\e531';
  }

  .icon-expense_recreation::before {
    content: '\ea65';
  }

  .icon-expense_shopping::before {
    content: '\f1cc';
  }

  .icon-expense_investment::before {
    content: '\e8e5';
  }

  .icon-expense_medical::before {
    content: '\f109';
  }

  .icon-expense_home::before {
    content: '\e587';
  }

  .icon-expense_life::before {
    content: '\ea62';
  }

  .icon-expense_learning::before {
    content: '\e0e0';
  }

  // INCOME

  .icon-salary::before,
  .icon-income_salary::before {
    content: '\e263';
  }

  .icon-bonus::before,
  .icon-income_bonus::before {
    content: '\ef63';
  }

  .icon-allowance::before,
  .icon-income_allowance::before {
    content: '\f8ff';
  }

  .icon-interest::before,
  .icon-income_interest::before {
    content: '\eb70';
  }

  .icon-investment-profit::before,
  .icon-income_investment-profit::before {
    content: '\e6e1';
  }
</style>
