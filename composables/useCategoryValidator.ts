import { storeToRefs } from 'pinia';
import { useCategoriesStore } from '@/stores/categoriesStore';
import type { IMainCategoriesItem } from '@/assets/interfaces/categories';
import { EnumRecordType } from '@/assets/enums/record';

export const useCategoryValidator = (
  categoryID: string
): EnumRecordType | null => {
  const categoriesStore = useCategoriesStore();
  const { income, expense } = storeToRefs(categoriesStore);

  const isIncome: boolean = income.value.some(({ id }) => id === categoryID);

  if (isIncome) {
    return EnumRecordType.INCOME;
  }

  const isExpens: boolean = expense.value.reduce(
    (prev: boolean, current: IMainCategoriesItem) => {
      if (!prev) {
        const { subcategories } = current;
        return subcategories.some(({ id }) => id === categoryID);
      }
      return true;
    },
    false as boolean
  );

  if (isExpens) {
    return EnumRecordType.EXPENSE;
  }
  return null;
};
