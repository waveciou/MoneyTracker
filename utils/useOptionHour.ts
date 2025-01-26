import type { IInputSelectOption } from '@/assets/types/element';

export const useOptionHour = () => {
  const result: IInputSelectOption[] = [];
  for (let i = 0; i < 24; i++) {
    result.push({ id: i, name: `${i}` });
  }
  return result;
};
