<template>
  <ClientOnly>
    <div v-if="contextCards.length">
      <TheCountor :cards="contextCards" class="my-3" />
      <CardList :cards="contextCards" />
    </div>
    <TheEmpty v-else />
  </ClientOnly>
</template>

<script setup lang="ts">
  import { storeToRefs } from 'pinia';
  import { useRecordStore } from '@/stores/recordStore';
  import type { IRecordForm, ICalendarValue } from '@/assets/types/record';

  const props = withDefaults(defineProps<{ dateInfo?: ICalendarValue }>(), {
    dateInfo() {
      return useTimeTodayValue();
    },
  });

  const recordStore = useRecordStore();
  const { storage } = storeToRefs(recordStore);

  const dateInfoFormat = computed((): string => {
    const { year, month, date } = props.dateInfo;
    return `${year}-${month}-${date}`;
  });

  const contextCards = computed((): IRecordForm[] => {
    return storage.value.filter(({ time }) => {
      const { year, month, date } = useTimeValue(time);
      return `${year}-${month}-${date}` === dateInfoFormat.value;
    });
  });
</script>
