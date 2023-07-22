import { defineStore } from 'pinia';

interface IDefaultState {
  isLoading: boolean;
  isShowSearch: boolean;
}

export const useCommonStore = defineStore({
  id: 'commonStore',
  state: (): IDefaultState => {
    return {
      isLoading: false,
      isShowSearch: false,
    };
  },
});
