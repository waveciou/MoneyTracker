import { useCategoriesStore } from '@/stores/categoriesStore';
import categoriesData from '@/public/data/categories.json';

export const useSetCategories = () => {
  const categoriesStore = useCategoriesStore();

  categoriesStore.$patch((state) => {
    state.income = [...categoriesData.income];
    state.expense = [...categoriesData.expense];
  });
};
