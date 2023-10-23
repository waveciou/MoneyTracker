export const useFormatNumber = (payload: number): string => {
  if (payload >= 0 && payload < 10) {
    return `0${payload}`;
  }
  return `${payload}`;
};
