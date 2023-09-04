import { useCategoriesStore } from '@/stores/categoriesStore';
import expenseCategories from '@/public/data/categories/expense.json';
import incomeCategories from '@/public/data/categories/income.json';

export const useSetCategories = () => {
  const categoriesStore = useCategoriesStore();

  categoriesStore.$patch((state) => {
    state.expense = [...expenseCategories.data];
    state.income = [...incomeCategories.data];
  });
};
