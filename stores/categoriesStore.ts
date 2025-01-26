import { defineStore } from 'pinia';
import type { IInputSelectOption } from '@/assets/types/element';

import type {
  ICategoriesItem,
  IMainCategoriesItem,
} from '@/assets/types/categories';

import expenseCategories from '@/assets/data/categories/expense.json';
import incomeCategories from '@/assets/data/categories/income.json';

interface IDefaultState {
  income: ICategoriesItem[];
  expense: IMainCategoriesItem[];
}

export const useCategoriesStore = defineStore({
  id: 'categoriesStore',
  state: (): IDefaultState => {
    return {
      income: [...incomeCategories.data],
      expense: [...expenseCategories.data],
    };
  },
  getters: {
    optionsExpenseMainCategory: (state): IInputSelectOption[] => {
      return state.expense.map(({ id, name }) => ({ id, name }));
    },
    optionsIncomeMainCategory: (state): IInputSelectOption[] => {
      return state.income.map(({ id, name }) => ({ id, name }));
    },
  },
});
