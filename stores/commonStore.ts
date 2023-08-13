import { defineStore } from 'pinia';

interface IDefaultState {
  utcOffset: number;
  isLoading: boolean;
  isShowSearch: boolean;
  scrollValue: number;
}

export const useCommonStore = defineStore({
  id: 'commonStore',
  state: (): IDefaultState => {
    return {
      utcOffset: 8,
      isLoading: false,
      isShowSearch: false,
      scrollValue: 0,
    };
  },
});
