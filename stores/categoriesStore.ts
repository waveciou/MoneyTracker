import { defineStore } from 'pinia';

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
});
