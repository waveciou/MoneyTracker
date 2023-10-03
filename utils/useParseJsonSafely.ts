/* eslint-disable no-console */
export const useParseJsonSafely = (payload: string): any | null => {
  try {
    return JSON.parse(payload);
  } catch (error) {
    console.log(error);
    return null;
  }
};
