import numeral from 'numeral';
import { defineStore } from 'pinia';
import { EnumRecordMode, EnumRecordType } from '@/assets/enums/record';
import { IRecordForm, ICalendarValue } from '@/assets/interfaces/record';

interface IDefaultState {
  storage: IRecordForm[];
  isShowRecord: boolean;
  contextID: string | null;
  contextMode: EnumRecordMode | null;
  contextDate: ICalendarValue | null;
}

export const useRecordStore = defineStore({
  id: 'recordStore',
  state: (): IDefaultState => {
    return {
      storage: [],
      isShowRecord: false,
      contextID: null,
      contextMode: null,
      contextDate: null,
    };
  },
  actions: {
    ADD_RECORD(payload: IRecordForm): void {
      const { year, month, date } = useTimeValue(payload.time);

      const index: number = this.storage.findIndex(
        ({ id }) => id === payload.id
      );
      if (index >= 0) {
        this.storage.splice(index, 1);
      }

      this.storage.push(payload);
      this.contextDate = { year, month, date };
    },
    DELETE_RECORD(id: string): void {
      const index: number = this.storage.findIndex((item) => item.id === id);
      if (index >= 0) {
        this.storage.splice(index, 1);
      }
    },
    HANDLE_CLOSE(): void {
      this.contextID = null;
      this.contextMode = null;
      this.isShowRecord = false;
    },
    HANDLE_MODE_CREATOR(): void {
      this.contextID = null;
      this.contextMode = EnumRecordMode.CREATOR;
      this.isShowRecord = true;
    },
    HANDLE_MODE_EDITOR(id: string): void {
      this.contextID = id;
      this.contextMode = EnumRecordMode.EDITOR;
      this.isShowRecord = true;
    },
  },
  getters: {
    contextRecordType: (state: IDefaultState): EnumRecordType | null => {
      const currentRecord = state.storage.find(
        ({ id }) => state.contextID === id
      );

      if (currentRecord) {
        return useCategoryValidator(currentRecord.category);
      }
      return null;
    },
    incomeRecords: (state: IDefaultState): IRecordForm[] => {
      return state.storage.filter(
        ({ category }) =>
          useCategoryValidator(category) === EnumRecordType.INCOME
      );
    },
    expenseRecords: (state: IDefaultState): IRecordForm[] => {
      return state.storage.filter(
        ({ category }) =>
          useCategoryValidator(category) === EnumRecordType.EXPENSE
      );
    },
    totalIncomePrice(): number {
      return this.incomeRecords.reduce((prev: number, current: IRecordForm) => {
        return numeral(prev).add(current.price).value() || prev;
      }, 0 as number);
    },
    totalExpensePrice(): number {
      return this.expenseRecords.reduce(
        (prev: number, current: IRecordForm) => {
          return numeral(prev).subtract(current.price).value() || prev;
        },
        0 as number
      );
    },
    totalPrice(): number {
      return (
        numeral(this.totalIncomePrice).add(this.totalExpensePrice).value() || 0
      );
    },
  },
});
