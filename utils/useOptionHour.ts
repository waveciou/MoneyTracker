import { IInputSelectOption } from '@/assets/interfaces/element';

export const useOptionHour = () => {
  const result: IInputSelectOption[] = [];
  for (let i = 0; i < 24; i++) {
    result.push({ id: i, name: `${i}` });
  }
  return result;
};
