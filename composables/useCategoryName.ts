import { storeToRefs } from 'pinia';
import { useCategoriesStore } from '@/stores/categoriesStore';

import type {
  IMainCategoriesItem,
  ICategoriesItem,
} from '@/assets/types/categories';

import { EnumRecordType } from '@/assets/types/record';

export const useCategoryName = (
  categoryID: string,
  isMainCategoryName: boolean
): string => {
  const categoriesStore = useCategoriesStore();
  const { income, expense } = storeToRefs(categoriesStore);
  const recordType = useCategoryValidator(categoryID);

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
            if (isMainCategoryName) {
              return `${name}`;
            }
            return `${subcategoryItem.name}`;
          }
        }
        return prev;
      },
      '' as string
    );
  }

  return '';
};
