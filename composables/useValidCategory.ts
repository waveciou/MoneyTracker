import { storeToRefs } from 'pinia';
import { useCategoriesStore } from '@/stores/categoriesStore';
import { IMainCategoriesItem } from '@/assets/interfaces/categories';
import { EnumAccountType } from '@/assets/enums/record';

export const useValidCategory = (
  categoryID: string
): EnumAccountType | null => {
  const categoriesStore = useCategoriesStore();
  const { income, expense } = storeToRefs(categoriesStore);

  const isIncome: boolean = income.value.some(({ id }) => id === categoryID);

  if (isIncome) {
    return EnumAccountType.INCOME;
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
    return EnumAccountType.EXPENSE;
  }
  return null;
};
