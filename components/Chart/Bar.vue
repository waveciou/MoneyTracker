<template>
  <div v-if="isShow">
    <ClientOnly>
      <div class="element-barchart w-full overflow-x-auto overflow-y-hidden">
        <VueApexCharts
          v-if="xaxis.length > 0"
          type="bar"
          :width="chartWidth"
          height="300px"
          :options="chartOptions"
          :series="chartSeries"
        />
        <div v-else class="py-3 text-2xl text-white/60 text-center">
          {{ props.lostText }}
        </div>
      </div>
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
  import { computed, watch, onMounted, onBeforeUnmount } from 'vue';
  import VueApexCharts from 'vue3-apexcharts';
  import { IBarChartSeries, IBarChartOptions } from '@/assets/interfaces/chart';

  const props = withDefaults(
    defineProps<{
      series: IBarChartSeries[];
      xaxis: string[];
      lostText?: string;
    }>(),
    { lostText: 'NO DATA' }
  );

  const isShow = ref<boolean>(true);

  const showerTimer = ref<number | null>(null);

  const chartSeries = ref<IBarChartSeries[]>([]);

  const chartOptions = ref<IBarChartOptions>({
    chart: {
      type: 'bar',
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
    },
    colors: ['#F76C83', '#94C962'],
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: [],
      labels: {
        style: {
          colors: '#FFFFFF',
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: '#FFFFFF',
        },
        formatter: (value: number): string => useFinanceNumber(value),
      },
    },
    fill: {
      opacity: 1,
    },
    legend: {
      labels: {
        colors: '#FFFFFF',
      },
      horizontalAlign: 'left',
    },
    tooltip: {
      enabled: true,
      theme: false,
    },
  });

  const chartWidth = computed((): string => {
    const value: number = Math.ceil(props.xaxis.length / 8);
    const result: number = value < 1 ? 100 : value * 100;
    return `${result}%`;
  });

  watch(
    () => props.series,
    (value: IBarChartSeries[]) => {
      chartSeries.value = [...value];
    },
    { immediate: true, deep: true }
  );

  watch(
    () => props.xaxis,
    (value: string[]) => {
      chartOptions.value.xaxis.categories = [...value];
    },
    { immediate: true, deep: true }
  );

  watch(
    () => [props.series, props.xaxis],
    () => {
      isShow.value = false;

      showerTimer.value = setTimeout(() => {
        isShow.value = true;
      }, 100) as unknown as number;
    },
    { deep: true }
  );

  onMounted(() => {
    nextTick(() => {
      if (process.client) {
        window.dispatchEvent(new Event('resize'));
      }
    });
  });

  onBeforeUnmount(() => {
    clearTimeout(showerTimer.value as unknown as number);
  });
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
