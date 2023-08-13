import { v4 as uuidv4 } from 'uuid';
import { IRecordForm } from '@/assets/interfaces/record';

export const useRecordForm = (
  payload?: IRecordForm | undefined
): IRecordForm => {
  const dayjs = useDayjs();

  if (payload) {
    const { price, store, time, note, tags } = payload;

    const validPrice: boolean = typeof price === 'number' && price >= 0;
    const validStore: boolean = typeof store === 'string';
    const validTime: boolean = typeof time === 'number';
    const validNote: boolean = typeof note === 'string';
    const validTags: boolean = Array.isArray(tags);

    if (validPrice && validStore && validTime && validNote && validTags) {
      return JSON.parse(JSON.stringify(payload));
    }
  }

  const defaultForm: IRecordForm = {
    id: uuidv4(),
    price: 0,
    store: '',
    time: dayjs().valueOf(),
    note: '',
    tags: [],
  };

  return defaultForm;
};
