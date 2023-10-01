<template>
  <div>
    <ChartBar v-if="isInit" :series="provideSeries" :xaxis="provideXaxis" />
  </div>
</template>

<script setup lang="ts">
  import { computed } from 'vue';
  import { storeToRefs } from 'pinia';
  import { useRecordStore } from '@/stores/recordStore';
  import { EnumChartMode } from '@/assets/enums/overview';
  import { EnumRecordType } from '@/assets/enums/record';
  import { IRecordSeries } from '@/assets/interfaces/record';
  import { IBarChartSeries } from '@/assets/interfaces/chart';

  const props = withDefaults(defineProps<{ mode: EnumChartMode }>(), {
    mode: EnumChartMode.MONTH,
  });

  const recordStore = useRecordStore();
  const { storage } = storeToRefs(recordStore);

  const isInit = ref<boolean>(false);

  const recordSeries = computed((): IRecordSeries[] => {
    const series = storage.value.reduce((prev, current) => {
      const result = [...prev];
      const { year, month, date } = useTimeValue(current.time);
      const id =
        props.mode === EnumChartMode.MONTH
          ? `${year}-${month}`
          : `${year}-${month}-${date}`;
      const index = result.findIndex((item) => item.id === id);

      if (index < 0) {
        result.push({ id, time: current.time, storage: [current] });
      } else {
        result[index].storage.push(current);
      }
      return result;
    }, [] as IRecordSeries[]);

    const sortSeries = series.sort((a, b) => {
      return a.time - b.time;
    });

    return sortSeries;
  });

  const provideSeries = computed((): IBarChartSeries[] => {
    const result: IBarChartSeries[] = [
      {
        name: '支出',
        data: [],
      },
      {
        name: '收入',
        data: [],
      },
    ];

    recordSeries.value.forEach((item) => {
      const expense = item.storage.reduce((prev, current) => {
        const price =
          useCategoryValidator(current.category) === EnumRecordType.EXPENSE
            ? current.price
            : 0;
        return prev + price;
      }, 0);

      const income = item.storage.reduce((prev, current) => {
        const price =
          useCategoryValidator(current.category) === EnumRecordType.INCOME
            ? current.price
            : 0;
        return prev + price;
      }, 0);

      result[0].data.push(expense);
      result[1].data.push(income);
    });

    return result;
  });

  const provideXaxis = computed((): string[] => {
    return recordSeries.value.map(({ time }) => {
      const { month, date } = useTimeValue(time);
      if (props.mode === EnumChartMode.MONTH) {
        return `${month}月`;
      }
      return `${month}/${date}`;
    });
  });
</script>
