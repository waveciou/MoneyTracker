<template>
  <AreaAnalysisCards :cards="contextCards" />
</template>

<script setup lang="ts">
  import { computed } from 'vue';
  import { storeToRefs } from 'pinia';
  import { useRecordStore } from '@/stores/recordStore';
  import { EnumChartMode } from '@/assets/enums/chart';
  import { IChartTimeFrame } from '@/assets/interfaces/chart';
  import { IRecordForm } from '@/assets/interfaces/record';
  import { IAnalysisCardGroup } from '@/assets/interfaces/analysis';

  const props = withDefaults(
    defineProps<{
      mode: EnumChartMode;
      timeFrame: IChartTimeFrame;
    }>(),
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

  const contextCards = computed((): IAnalysisCardGroup[] => {
    const timeFilter: IRecordForm[] = storage.value.filter(({ time }) => {
      const { year, month } = useTimeValue(time);
      const { timeFrame } = props;

      switch (props.mode) {
        case EnumChartMode.YEARS:
          return year === timeFrame.year;
        case EnumChartMode.MONTHS:
          return year === timeFrame.year && month === timeFrame.month;
        case EnumChartMode.ALL:
          return true;
        default:
          return false;
      }
    });

    return timeFilter.reduce(
      (prev: IAnalysisCardGroup[], current: IRecordForm) => {
        if (current.tags.length) {
          const result = [...prev];

          for (let i = 0; i < current.tags.length; i++) {
            const tagName = current.tags[i];
            const index = result.findIndex(({ name }) => name === tagName);

            if (index < 0) {
              result.push({ name: `#${tagName}`, storage: [current] });
            } else {
              result[index].storage.push(current);
            }
          }
          return result;
        }
        return prev;
      },
      [] as IAnalysisCardGroup[]
    );
  });
</script>
