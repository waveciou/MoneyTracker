<template>
  <div>
    <div class="flex h-[320px] w-full items-center">
      <ChartBar class="w-full" :series="provideSeries" :xaxis="provideXaxis" />
    </div>
    <div v-if="contextCards.length">
      <TheCountor :cards="contextCards" class="my-3" />
      <AreaOverviewCards :mode="props.mode" :series="recordSeries" />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { storeToRefs } from 'pinia';
  import { useCommonStore } from '@/stores/commonStore';
  import { useRecordStore } from '@/stores/recordStore';
  import { EnumRecordType } from '@/assets/types/record';
  import { EnumChartMode } from '@/assets/types/chart';
  import type { IRecordForm, IRecordSeries } from '@/assets/types/record';
  import type { IChartTimeFrame, IBarChartSeries } from '@/assets/types/chart';

  const props = withDefaults(
    defineProps<{ mode: EnumChartMode; timeFrame: IChartTimeFrame }>(),
    {
      mode: EnumChartMode.MONTHS,
      timeFrame() {
        const { year, month } = useTimeTodayValue();
        return { year, month };
      },
    }
  );

  const dayjs = useDayjs();
  const commonStore = useCommonStore();
  const recordStore = useRecordStore();
  const { utcOffset } = storeToRefs(commonStore);
  const { storage } = storeToRefs(recordStore);

  const recordSeries = computed((): IRecordSeries[] => {
    const result: IRecordSeries[] = [];
    const currentYear: number = props.timeFrame.year;

    if (props.mode === EnumChartMode.MONTHS) {
      const totalDates: number = dayjs(
        `${currentYear}-${props.timeFrame.month}`
      )
        .utcOffset(utcOffset.value)
        .daysInMonth();

      for (let i = 0; i < totalDates; i++) {
        const currentMonth: number = props.timeFrame.month || 0;
        const currentDate: number = i + 1;

        result.push({
          time: { year: currentYear, month: currentMonth, date: currentDate },
          storage: storage.value.filter(({ time }) => {
            const { year, month, date } = useTimeValue(time);
            return (
              year === currentYear &&
              month === currentMonth &&
              date === currentDate
            );
          }),
        });
      }
    }

    if (props.mode === EnumChartMode.YEARS) {
      for (let i = 0; i < 12; i++) {
        const currentMonth: number = i + 1;

        result.push({
          time: { year: currentYear, month: currentMonth, date: null },
          storage: storage.value.filter(({ time }) => {
            const { year, month } = useTimeValue(time);
            return year === currentYear && month === currentMonth;
          }),
        });
      }
    }
    return result;
  });

  const provideSeries = computed((): IBarChartSeries[] => {
    return recordSeries.value.reduce(
      (prevSeries: IBarChartSeries[], currentSeries: IRecordSeries) => {
        const result = [...prevSeries];

        const expense = currentSeries.storage.reduce(
          (prev: number, current: IRecordForm) => {
            const price =
              useCategoryValidator(current.category) === EnumRecordType.EXPENSE
                ? current.price
                : 0;
            return prev + price;
          },
          0 as number
        );

        const income = currentSeries.storage.reduce(
          (prev: number, current: IRecordForm) => {
            const price =
              useCategoryValidator(current.category) === EnumRecordType.INCOME
                ? current.price
                : 0;
            return prev + price;
          },
          0 as number
        );

        result[0].data.push(expense);
        result[1].data.push(income);
        return result;
      },
      [
        { name: 'Expense', data: [] },
        { name: 'Income', data: [] },
      ] as IBarChartSeries[]
    );
  });

  const provideXaxis = computed((): string[] => {
    const isNoRecords: boolean = recordSeries.value.every(
      ({ storage }) => storage.length <= 0
    );

    if (isNoRecords) {
      return [];
    }

    return recordSeries.value.map(({ time }) => {
      const formatMonth: string = useFormatNumber(time.month);

      if (props.mode === EnumChartMode.MONTHS) {
        return `${formatMonth}/${useFormatNumber(time.date || 0)}`;
      }
      if (props.mode === EnumChartMode.YEARS) {
        return `${formatMonth}月`;
      }
      return '';
    });
  });

  const contextCards = computed((): IRecordForm[] => {
    return storage.value.filter(({ time }) => {
      const { year, month } = useTimeValue(time);
      const { timeFrame } = props;

      switch (props.mode) {
        case EnumChartMode.YEARS:
          return year === timeFrame.year;
        case EnumChartMode.MONTHS:
          return year === timeFrame.year && month === timeFrame.month;
        default:
          return false;
      }
    });
  });
</script>
