import type { IInputSelectOption } from '@/assets/interfaces/element';

export const useOptionMinute = () => {
  const result: IInputSelectOption[] = [];
  for (let i = 0; i < 60; i++) {
    result.push({ id: i, name: `${i}` });
  }
  return result;
};
