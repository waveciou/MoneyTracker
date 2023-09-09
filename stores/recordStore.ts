import { defineStore } from 'pinia';
import { EnumAccountType } from '@/assets/enums/record';
import { IRecordForm } from '@/assets/interfaces/record';

interface IDefaultState {
  income: IRecordForm[];
  expense: IRecordForm[];
  isShowRecord: boolean;
  contextAccountType: EnumAccountType;
  contextForm: IRecordForm;
}

export const useRecordStore = defineStore({
  id: 'recordStore',
  state: (): IDefaultState => {
    return {
      income: [],
      expense: [],
      isShowRecord: false,
      contextAccountType: EnumAccountType.EXPENSE,
      contextForm: {
        id: '',
        category: '',
        price: 0,
        store: '',
        time: 0,
        note: '',
        tags: [],
      },
    };
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
    SET_CONTEXT_ACCOUNT_TYPE(payload: EnumAccountType) {
      this.contextAccountType = payload;
    },
    SET_CONTEXT_FORM(payload: IRecordForm) {
      Object.assign(this.contextForm, payload);
    },
  },
});
