/* eslint-disable no-console */
import { v4 as uuidv4 } from 'uuid';
import { createStore, get, set } from 'idb-keyval';
import { storeToRefs } from 'pinia';
import { useRecordStore } from '@/stores/recordStore';
import type { IRecordForm, IRecordEncode } from '@/assets/interfaces/record';

export const useIndexedDB = (): void => {
  const recordStore = useRecordStore();
  const { storage } = storeToRefs(recordStore);

  // GET Record Data From IndexedDB

  onMounted(() => {
    const moneyTrackerStore = createStore(
      'moneyTrackerDB',
      'moneyTrackerStore'
    );

    get('storage', moneyTrackerStore)
      .then((value: IRecordEncode[] | undefined) => {
        if (Array.isArray(value)) {
          const result: IRecordForm[] = value.map((item: IRecordEncode) => {
            const record = {
              id: uuidv4(),
              category: item.c,
              price: item.p,
              store: item.s || '',
              time: item.t,
              note: item.n || '',
              tags: item.tg || [],
            };
            return record;
          });

          recordStore.SET_STORAGE(result);
        } else {
          set('storage', [], moneyTrackerStore);
        }
      })
      .catch((error) => console.log('GET STORAGE DATA ERROR:', error));
  });

  // SET Record Data To IndexedDB

  watch(
    () => storage.value,
    (value: IRecordForm[]) => {
      const moneyTrackerStore = createStore(
        'moneyTrackerDB',
        'moneyTrackerStore'
      );

      const result = value.reduce(
        (prev: IRecordEncode[], current: IRecordForm) => {
          const record: IRecordEncode = {
            c: current.category,
            p: current.price,
            t: current.time,
          };

          if (current.store) {
            record.s = current.store;
          }

          if (current.note) {
            record.n = current.note;
          }

          if (current.tags.length > 0) {
            record.tg = [...current.tags];
          }

          return [...prev, record];
        },
        [] as IRecordEncode[]
      );

      set('storage', result, moneyTrackerStore).catch((error) =>
        console.log('SET STORAGE DATA ERROR:', error)
      );
    },
    { deep: true }
  );
};
