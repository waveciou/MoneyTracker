import { defineStore } from 'pinia';
import { EnumRecordMode, EnumAccountType } from '@/assets/enums/record';
import { IRecordForm } from '@/assets/interfaces/record';

interface IDefaultState {
  income: IRecordForm[];
  expense: IRecordForm[];
  isShowRecord: boolean;
  contextID: string;
  contextMode: EnumRecordMode;
  contextForm: IRecordForm;
}

export const useRecordStore = defineStore({
  id: 'recordStore',
  state: (): IDefaultState => {
    return {
      income: [],
      expense: [],
      isShowRecord: false,
      contextID: '',
      contextMode: EnumRecordMode.CREATER,
      contextForm: useRecordForm(EnumAccountType.EXPENSE),
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
    SET_CONTEXT_FORM(payload: IRecordForm) {
      Object.assign(this.contextForm, payload);
    },
    HANDLE_CLOSE() {
      this.contextID = '';
      this.contextMode = EnumRecordMode.CREATER;
      this.isShowRecord = false;
    },
  },
});
