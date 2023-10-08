<template>
  <ClientOnly>
    <div v-if="contextCards.length">
      <TheCountor :cards="contextCards" />
      <ul>
        <li v-for="item in contextCards" :key="item.id" class="mb-3">
          <CardItem :data="item" />
        </li>
      </ul>
    </div>
    <TheNoData v-else />
  </ClientOnly>
</template>

<script setup lang="ts">
  import { computed } from 'vue';
  import { storeToRefs } from 'pinia';
  import { useRecordStore } from '@/stores/recordStore';
  import { IRecordForm, ICalendarValue } from '@/assets/interfaces/record';

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
