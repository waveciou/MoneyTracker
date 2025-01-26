import { storeToRefs } from 'pinia';
import { useCommonStore } from '@/stores/commonStore';
import type { ICalendarValue } from '@/assets/types/record';

export const useTimeTodayValue = (): ICalendarValue => {
  const dayjs = useDayjs();
  const commonStore = useCommonStore();
  const { utcOffset } = storeToRefs(commonStore);

  const result = {
    year: dayjs().utcOffset(utcOffset.value).get('year'),
    month: dayjs().utcOffset(utcOffset.value).get('month') + 1,
    date: dayjs().utcOffset(utcOffset.value).get('date'),
  };

  return result;
};
