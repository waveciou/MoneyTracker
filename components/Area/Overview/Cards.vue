<template>
  <ul>
    <li v-for="item in contextCards" :key="item.id">
      <TheAccordion :title="item.name">
        <h3 class="hidden">{{ item.name }}</h3>
        <CardList :cards="item.storage" />
      </TheAccordion>
    </li>
  </ul>
</template>

<script setup lang="ts">
  import { EnumChartMode } from '@/assets/types/chart';
  import type { IRecordForm, IRecordSeries } from '@/assets/types/record';

  interface IContextCardItem {
    id: string;
    name: string;
    storage: IRecordForm[];
  }

  const props = defineProps<{ mode: EnumChartMode; series: IRecordSeries[] }>();

  const contextCards = computed((): IContextCardItem[] => {
    const seriesFilter = props.series.filter(
      ({ storage }) => storage.length > 0
    );

    return seriesFilter.map(({ time, storage }) => {
      const { year, month, date } = time;
      const formatMonth = useFormatNumber(month);
      const formatDate = useFormatNumber(date || 0);

      const id: string =
        props.mode === EnumChartMode.YEARS
          ? `${year}-${formatMonth}`
          : `${year}-${formatMonth}-${formatDate}`;

      const name: string =
        props.mode === EnumChartMode.YEARS
          ? `${year}年${formatMonth}月`
          : `${year}年${formatMonth}月${formatDate}日`;

      return { id, name, storage };
    });
  });
</script>
