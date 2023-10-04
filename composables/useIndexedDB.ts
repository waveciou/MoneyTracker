/* eslint-disable no-console */
import { watch, onMounted } from 'vue';
import { createStore, get, set } from 'idb-keyval';
import { storeToRefs } from 'pinia';
import { useRecordStore } from '@/stores/recordStore';
import { IRecordForm } from '@/assets/interfaces/record';

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
      .then((value: string | undefined) => {
        if (value) {
          const parseStorage: IRecordForm[] | null = useJsonParse(value);

          if (parseStorage) {
            recordStore.SET_STORAGE(parseStorage);
          }
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

      set('storage', JSON.stringify(value), moneyTrackerStore).catch((error) =>
        console.log('SET STORAGE DATA ERROR:', error)
      );
    },
    { deep: true }
  );
};
