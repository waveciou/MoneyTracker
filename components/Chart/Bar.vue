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
        <TheEmpty v-else />
      </div>
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
  import numeral from 'numeral';
  import VueApexCharts from 'vue3-apexcharts';
  import type { IBarChartSeries, IBarChartOptions } from '@/assets/types/chart';

  const props = defineProps<{
    series: IBarChartSeries[];
    xaxis: string[];
  }>();

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
        formatter: (value: number): string => {
          if (!isFinite(value)) {
            return '1';
          }
          if (value < 1000) {
            return `${value}`;
          }
          return numeral(value).format('0.0a') || `${value}`;
        },
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
      clearTimeout(showerTimer.value as unknown as number);
      isShow.value = false;

      showerTimer.value = setTimeout(() => {
        isShow.value = true;
      }, 100) as unknown as number;
    },
    { deep: true }
  );

  onMounted(() => {
    nextTick(() => {
      if (import.meta.client) {
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
      @apply bg-yellow text-black;
    }

    .apexcharts-tooltip-title {
      @apply bg-black leading-4 text-white;
    }

    .apexcharts-tooltip-y-group {
      @apply leading-4;

      > span {
        @apply text-black;
      }
    }
  }
</style>
