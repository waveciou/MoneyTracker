import { storeToRefs } from 'pinia';
import { useCommonStore } from '@/stores/commonStore';

export const useTimeFormat = (timestamp: number): string => {
  const dayjs = useDayjs();
  const commonStore = useCommonStore();
  const { utcOffset } = storeToRefs(commonStore);

  const year = dayjs(timestamp).utcOffset(utcOffset.value).get('year');
  const month = dayjs(timestamp).utcOffset(utcOffset.value).get('month') + 1;
  const date = dayjs(timestamp).utcOffset(utcOffset.value).get('date');
  const hour = dayjs(timestamp).utcOffset(utcOffset.value).get('hour');
  const minute = dayjs(timestamp).utcOffset(utcOffset.value).get('minute');

  return `${year}-${month}-${date} ${hour}:${minute}`;
};
