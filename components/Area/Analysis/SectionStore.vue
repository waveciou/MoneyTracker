<template>
  <ul v-if="contextCards.length">
    <li v-for="item in contextCards" :key="item.name">
      <TheAccordion :title="item.name">
        <div class="mb-5">
          <TheCountor :cards="item.storage" class="mt-0" />
          <ul>
            <li
              v-for="cardItem in item.storage"
              :key="cardItem.id"
              class="mb-3"
            >
              <CardItem :data="cardItem" />
            </li>
          </ul>
        </div>
      </TheAccordion>
    </li>
  </ul>
  <TheEmpty v-else />
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
        if (current.store) {
          const result = [...prev];
          const index = result.findIndex(({ name }) => name === current.store);

          if (index < 0) {
            result.push({ name: current.store, storage: [current] });
          } else {
            result[index].storage.push(current);
          }
          return result;
        }
        return prev;
      },
      [] as IAnalysisCardGroup[]
    );
  });
</script>
