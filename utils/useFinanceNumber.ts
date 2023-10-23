import numeral from 'numeral';

export const useFinanceNumber = (payload: number): string => {
  return numeral(payload).format('$0,0.00') || `$${payload}`;
};
