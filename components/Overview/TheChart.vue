<template>
  <div>
    <div v-if="provideXaxis.length > 0" class="flex justify-end items-center">
      <button
        class="before-font-material before:text-xl before:mr-1 flex items-center mr-2"
        :class="provideRadioClass(EnumChartMode.MONTH)"
        title="Month"
        @click="handleModeUpdate(EnumChartMode.MONTH)"
      >
        Month
      </button>
      <button
        class="before-font-material before:text-xl before:mr-1 flex items-center"
        :class="provideRadioClass(EnumChartMode.DATE)"
        title="Date"
        @click="handleModeUpdate(EnumChartMode.DATE)"
      >
        Date
      </button>
    </div>
    <ChartBar :series="provideSeries" :xaxis="provideXaxis" />
  </div>
</template>

<script setup lang="ts">
  import { computed } from 'vue';
  import { storeToRefs } from 'pinia';
  import { useRecordStore } from '@/stores/recordStore';
  import { EnumChartMode } from '@/assets/enums/chart';
  import { EnumRecordType } from '@/assets/enums/record';
  import { IRecordSeries } from '@/assets/interfaces/record';
  import { IBarChartSeries } from '@/assets/interfaces/chart';

  const props = withDefaults(defineProps<{ mode: EnumChartMode }>(), {
    mode: EnumChartMode.MONTH,
  });

  const emits = defineEmits<{
    (e: 'mode-update', value: EnumChartMode): void;
  }>();

  const recordStore = useRecordStore();

  const { storage } = storeToRefs(recordStore);

  const recordSeries = computed((): IRecordSeries[] => {
    const series = storage.value.reduce((prev, current) => {
      const result = [...prev];
      const { year, month, date } = useTimeValue(current.time);
      const id =
        props.mode === EnumChartMode.MONTH
          ? `${year}-${month}`
          : `${year}-${month}-${date}`;
      const index: number = result.findIndex((item) => item.id === id);

      if (index < 0) {
        result.push({ id, time: current.time, storage: [current] });
      } else {
        result[index].storage.push(current);
      }
      return result;
    }, [] as IRecordSeries[]);

    return series.sort((a, b) => a.time - b.time);
  });

  const provideSeries = computed((): IBarChartSeries[] => {
    return recordSeries.value.reduce(
      (prevSeries: IBarChartSeries[], currentSeries: IRecordSeries) => {
        const result = [...prevSeries];

        const expense = currentSeries.storage.reduce((prev, current) => {
          const price =
            useCategoryValidator(current.category) === EnumRecordType.EXPENSE
              ? current.price
              : 0;
          return prev + price;
        }, 0);

        const income = currentSeries.storage.reduce((prev, current) => {
          const price =
            useCategoryValidator(current.category) === EnumRecordType.INCOME
              ? current.price
              : 0;
          return prev + price;
        }, 0);

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
    return recordSeries.value.map(({ time }) => {
      const { year, month, date } = useTimeValue(time);
      const formatMonth: string = useFormatNumber(month);
      const formatDate: string = useFormatNumber(date);

      if (props.mode === EnumChartMode.MONTH) {
        return `${year}/${formatMonth}`;
      }
      return `${formatMonth}/${formatDate}`;
    });
  });

  const handleModeUpdate = (payload: EnumChartMode): void => {
    emits('mode-update', payload);
  };

  const provideRadioClass = (payload: EnumChartMode): string => {
    return props.mode === payload
      ? 'icon-radio-checked'
      : 'icon-radio-unchecked';
  };
</script>

<style lang="scss" scoped>
  .icon-radio-unchecked::before {
    content: '\e836';
  }

  .icon-radio-checked::before {
    content: '\e837';
  }
</style>
