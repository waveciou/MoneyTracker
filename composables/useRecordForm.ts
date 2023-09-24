import { v4 as uuidv4 } from 'uuid';
import { storeToRefs } from 'pinia';
import { useRecordStore } from '@/stores/recordStore';
import { useCategoriesStore } from '@/stores/categoriesStore';
import { IRecordForm } from '@/assets/interfaces/record';
import { EnumRecordType } from '@/assets/enums/record';

export const useRecordForm = (
  recordType: EnumRecordType,
  payload?: IRecordForm
): IRecordForm => {
  const dayjs = useDayjs();
  const route = useRoute();
  const recordStore = useRecordStore();
  const categoriesStore = useCategoriesStore();
  const { income, expense } = storeToRefs(categoriesStore);
  const { contextDate } = storeToRefs(recordStore);

  if (payload) {
    const { category, price, store, time, note, tags } = payload;

    const validCategory: boolean =
      useCategoryValidator(category) === recordType;
    const validPrice: boolean = typeof price === 'number' && price >= 0;
    const validStore: boolean = typeof store === 'string';
    const validTime: boolean = typeof time === 'number';
    const validNote: boolean = typeof note === 'string';
    const validTags: boolean = Array.isArray(tags);

    if (
      validCategory &&
      validPrice &&
      validStore &&
      validTime &&
      validNote &&
      validTags
    ) {
      return JSON.parse(JSON.stringify(payload));
    }
  }

  const defaultCategory: string = (() => {
    if (recordType === EnumRecordType.EXPENSE) {
      return expense.value[0]?.subcategories[0]?.id || '';
    }
    return income.value[0]?.id || '';
  })();

  const defaultTime: number = (() => {
    if (route.path === '/' && contextDate.value) {
      const { year, month, date } = contextDate.value;
      const { hour, minute } = useTimeValue(dayjs().valueOf());
      const timeFormat = `${year}-${month}-${date} ${hour}:${minute}`;
      return dayjs(timeFormat).valueOf();
    }
    return dayjs().valueOf();
  })();

  const defaultForm: IRecordForm = {
    id: uuidv4(),
    category: defaultCategory,
    price: 0,
    store: '',
    time: defaultTime,
    note: '',
    tags: [],
  };

  return defaultForm;
};
