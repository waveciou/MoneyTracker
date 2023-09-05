import { useCategoriesStore } from '@/stores/categoriesStore';
import expenseCategories from '@/assets/data/categories/expense.json';
import incomeCategories from '@/assets/data/categories/income.json';

export const useSetCategories = (): void => {
  const categoriesStore = useCategoriesStore();

  categoriesStore.$patch((state) => {
    state.expense = [...expenseCategories.data];
    state.income = [...incomeCategories.data];
  });
};
