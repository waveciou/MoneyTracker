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
  </ClientOnly>
</template>

<script setup lang="ts">
  import { computed } from 'vue';
  import { storeToRefs } from 'pinia';
  import { useRecordStore } from '@/stores/recordStore';
  import { EnumChartMode } from '@/assets/enums/chart';
  import { IRecordForm } from '@/assets/interfaces/record';
  import { ITimeFrame } from '@/assets/interfaces/chart';

  const props = withDefaults(
    defineProps<{ mode: EnumChartMode; timeFrame: ITimeFrame }>(),
    {
      mode: EnumChartMode.MONTHS,
      timeFrame() {
        const { year, month } = useTimeTodayValue();
        return { year, month };
      },
    }
  );

  const recordStore = useRecordStore();
  const { storage } = storeToRefs(recordStore);

  const contextCards = computed((): IRecordForm[] => {
    return storage.value.filter(({ time }) => {
      const { year, month } = useTimeValue(time);
      if (props.mode === EnumChartMode.YEARS) {
        return year === props.timeFrame.year;
      }
      if (props.mode === EnumChartMode.MONTHS) {
        return year === props.timeFrame.year && month === props.timeFrame.month;
      }
      return false;
    });
  });
</script>
