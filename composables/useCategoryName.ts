import { storeToRefs } from 'pinia';
import { useCategoriesStore } from '@/stores/categoriesStore';
import { ICategoriesItem } from '@/assets/interfaces/categories';
import { EnumRecordType } from '@/assets/enums/record';

export const useCategoryName = (categoryID: string): string => {
  const categoriesStore = useCategoriesStore();
  const { income } = storeToRefs(categoriesStore);

  const recordType = useValidCategory(categoryID);

  if (recordType === null) {
    return '';
  }

  if (recordType === EnumRecordType.INCOME) {
    return income.value.reduce((prev: string, current: ICategoriesItem) => {
      if (prev === '') {
        const { id, name } = current;
        if (id === categoryID) {
          return name;
        }
      }
      return prev;
    }, '' as string);
  }

  // if (recordType === EnumRecordType.EXPENSE) {
  // }

  return '';
};
