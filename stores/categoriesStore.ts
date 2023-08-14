import { defineStore } from 'pinia';

import {
  IMainCategoriesItem,
  ICategoriesItem,
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
});
