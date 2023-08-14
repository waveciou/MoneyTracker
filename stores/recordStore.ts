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
  actions: {
    ADD_INCOME_RECORD(payload: IRecordForm) {
      const index: number = this.income.findIndex(
        ({ id }) => id === payload.id
      );
      if (index >= 0) {
        this.income.splice(index, 1);
      }
      this.income.push(payload);
    },
    ADD_EXPENSE_RECORD(payload: IRecordForm) {
      const index: number = this.expense.findIndex(
        ({ id }) => id === payload.id
      );
      if (index >= 0) {
        this.expense.splice(index, 1);
      }
      this.expense.push(payload);
    },
    DELETE_INCOME_RECORD(id: string) {
      const index: number = this.income.findIndex((item) => item.id === id);
      if (index >= 0) {
        this.income.splice(index, 1);
      }
    },
    DELETE_EXPENSE_RECORD(id: string) {
      const index: number = this.expense.findIndex((item) => item.id === id);
      if (index >= 0) {
        this.expense.splice(index, 1);
      }
    },
  },
});
