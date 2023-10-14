import { storeToRefs } from 'pinia';
import { useCategoriesStore } from '@/stores/categoriesStore';

import {
  IMainCategoriesItem,
  ICategoriesItem,
} from '@/assets/interfaces/categories';

import { EnumRecordType } from '@/assets/enums/record';

interface IOption {
  isOnlyMainName: boolean;
  isIncludeMainName: boolean;
}

export const useCategoryName = (
  categoryID: string,
  option: IOption
): string => {
  const categoriesStore = useCategoriesStore();
  const { income, expense } = storeToRefs(categoriesStore);

  const recordType = useCategoryValidator(categoryID);

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

  if (recordType === EnumRecordType.EXPENSE) {
    return expense.value.reduce(
      (prev: string, current: IMainCategoriesItem) => {
        if (prev === '') {
          const { name, subcategories } = current;
          const subcategoryItem = subcategories.find(
            ({ id }) => id === categoryID
          );
          if (subcategoryItem) {
            if (option.isOnlyMainName) {
              return `${name}`;
            }

            if (option.isIncludeMainName) {
              return `${name} - ${subcategoryItem.name}`;
            }
            return subcategoryItem.name;
          }
        }
        return prev;
      },
      '' as string
    );
  }

  return '';
};
