<template>
  <VueApexCharts
    ref="chart"
    type="bar"
    width="375"
    height="300"
    :options="options"
    :series="series"
  />
</template>

<script setup lang="ts">
  import { watch } from 'vue';
  import VueApexCharts from 'vue3-apexcharts';
  import { IBarChartSeries } from '@/assets/interfaces/chart';

  const props = defineProps<{ series: IBarChartSeries[]; xaxis: any[] }>();

  const options = ref({
    chart: {
      type: 'bar',
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
    },
    colors: ['#f76c83', '#94c962'],
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: [],
      labels: {
        style: {
          colors: '#fff',
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: '#fff',
        },
        formatter: (value: number) => useFinanceNumber(value),
      },
    },
    fill: {
      opacity: 1,
    },
    legend: {
      labels: {
        colors: '#fff',
      },
      horizontalAlign: 'left',
    },
    tooltip: {
      enabled: true,
      theme: false,
    },
  });

  watch(
    () => props.xaxis,
    (value) => {
      options.value.xaxis.categories = value;
    },
    { immediate: true }
  );
</script>

<style scoped></style>
