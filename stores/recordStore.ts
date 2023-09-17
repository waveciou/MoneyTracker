import { defineStore } from 'pinia';
import { EnumRecordMode, EnumRecordType } from '@/assets/enums/record';
import { IRecordForm } from '@/assets/interfaces/record';

interface IDefaultState {
  storage: IRecordForm[];
  isShowRecord: boolean;
  contextID: string;
  contextMode: EnumRecordMode | null;
}

export const useRecordStore = defineStore({
  id: 'recordStore',
  state: (): IDefaultState => {
    return {
      storage: [
        {
          'id': '07622068-6fc4-4213-ab42-d51649942b31',
          'category': 'breakfast',
          'price': 666,
          'store': 'eee',
          'time': 1694931987741,
          'note': '',
          'tags': ['www', 'fff', 'bb'],
        },
      ],
      isShowRecord: false,
      contextID: '',
      contextMode: null,
    };
  },
  actions: {
    ADD_RECORD(payload: IRecordForm): void {
      const index: number = this.storage.findIndex(
        ({ id }) => id === payload.id
      );
      if (index >= 0) {
        this.storage.splice(index, 1);
      }
      this.storage.push(payload);
    },
    DELETE_RECORD(id: string): void {
      const index: number = this.storage.findIndex((item) => item.id === id);
      if (index >= 0) {
        this.storage.splice(index, 1);
      }
    },
    HANDLE_CLOSE(): void {
      this.contextID = '';
      this.contextMode = null;
      this.isShowRecord = false;
    },
    HANDLE_MODE_CREATOR(): void {
      this.contextID = '';
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
    incomeRecords: (state: IDefaultState): IRecordForm[] => {
      return state.storage.filter(
        ({ category }) => useValidCategory(category) === EnumRecordType.INCOME
      );
    },
    expenseRecords: (state: IDefaultState): IRecordForm[] => {
      return state.storage.filter(
        ({ category }) => useValidCategory(category) === EnumRecordType.EXPENSE
      );
    },
    contextRecordType: (state: IDefaultState): EnumRecordType | null => {
      const currentRecord = state.storage.find(
        ({ id }) => state.contextID === id
      );

      if (currentRecord) {
        return useValidCategory(currentRecord.category);
      }
      return null;
    },
  },
});
