<template>
  <ClientOnly>
    <div class="element-barchart w-full overflow-x-auto overflow-y-hidden">
      <VueApexCharts
        v-if="xaxis.length > 0"
        ref="chart"
        type="bar"
        :width="provideChartWidth"
        height="300px"
        :options="chartOptions"
        :series="chartSeries"
      />
      <div v-else>NO DATA</div>
    </div>
  </ClientOnly>
</template>

<script setup lang="ts">
  import { computed, watch } from 'vue';
  import VueApexCharts from 'vue3-apexcharts';
  import { IBarChartSeries } from '@/assets/interfaces/chart';

  const props = defineProps<{ series: IBarChartSeries[]; xaxis: string[] }>();

  const chartSeries = ref<IBarChartSeries[]>([]);

  const chartOptions = ref({
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

  const provideChartWidth = computed((): string => {
    const value = Math.ceil(props.xaxis.length / 8);
    const result = value < 1 ? 100 : value * 100;
    return `${result}%`;
  });

  watch(
    () => props.series,
    (value) => {
      chartSeries.value = [...value];
    },
    { immediate: true, deep: true }
  );

  watch(
    () => props.xaxis,
    (value) => {
      chartOptions.value.xaxis.categories = [...value];
    },
    { immediate: true, deep: true }
  );
</script>

<style lang="scss">
  .element-barchart {
    .apexcharts-tooltip {
      @apply text-black bg-yellow;
    }

    .apexcharts-tooltip-title {
      @apply text-white bg-black leading-4;
    }

    .apexcharts-tooltip-y-group {
      @apply leading-4;

      > span {
        @apply text-black;
      }
    }
  }
</style>
