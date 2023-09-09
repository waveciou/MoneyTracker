import { storeToRefs } from 'pinia';
import { useRecordStore } from '@/stores/recordStore';
import { EnumAccountType } from '@/assets/enums/record';

export const useGetAccountType = (recordID: string): EnumAccountType | null => {
  const recordStore = useRecordStore();
  const { income, expense } = storeToRefs(recordStore);

  const isIncome: boolean = income.value.some(({ id }) => id === recordID);
  const isExpense: boolean = expense.value.some(({ id }) => id === recordID);

  if (isIncome !== isExpense) {
    if (isIncome) {
      return EnumAccountType.INCOME;
    }
    return EnumAccountType.EXPENSE;
  }
  return null;
};
