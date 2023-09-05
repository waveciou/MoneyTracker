import { defineStore } from 'pinia';
import { IInputSelectOption } from '@/assets/interfaces/element';

import {
  ICategoriesItem,
  IMainCategoriesItem,
} from '@/assets/interfaces/categories';

interface IDefaultState {
  income: ICategoriesItem[];
  expense: IMainCategoriesItem[];
}

export const useCategoriesStore = defineStore({
  id: 'categoriesStore',
  state: (): IDefaultState => {
    return { income: [], expense: [] };
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
