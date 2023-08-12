import { defineStore } from 'pinia';
import { IRecordForm } from '@/assets/interfaces/record';

interface IDefaultState {
  income: IRecordForm[];
  expense: IRecordForm[];
}

export const useRecordStore = defineStore({
  id: 'recordStore',
  state: (): IDefaultState => {
    return { income: [], expense: [] };
  },
});
