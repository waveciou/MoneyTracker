<template>
  <div v-if="isShow">
    <ClientOnly>
      <div class="element-piechart w-full overflow-x-auto overflow-y-hidden">
        <VueApexCharts
          v-if="true"
          type="pie"
          width="100%"
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
  import { watch, onMounted, onBeforeUnmount } from 'vue';
  import VueApexCharts from 'vue3-apexcharts';
  import { IPieChartOptions } from '@/assets/interfaces/chart';

  const props = defineProps<{
    series: number[];
    labels: string[];
  }>();

  const isShow = ref<boolean>(true);

  const showerTimer = ref<number | null>(null);

  const chartSeries = ref<number[]>([]);

  const chartLabels = ref<string[]>([]);

  const chartOptions = ref<IPieChartOptions>({
    colors: ['#50aaf8', '#32c8a4', '#f76c83', '#ffdf5e', '#94c962', '#ac93e8'],
    labels: [],
    legend: {
      labels: {
        colors: '#fff',
      },
      // formatter: (seriesName) => {
      //   const index = parseInt(seriesName.substr(7), 10) - 1;
      //   return this.labelsData[index];
      // },
    },
    tooltip: {
      y: {
        title: {
          // formatter: (seriesName) => {
          //   const index = parseInt(seriesName.substr(7), 10) - 1;
          //   return `${this.labelsData[index]}:`;
          // },
        },
      },
    },
    stroke: {
      width: 1,
    },
  });

  watch(
    () => props.series,
    (value: number[]) => {
      chartSeries.value = [...value];
    },
    { immediate: true, deep: true }
  );

  watch(
    () => props.labels,
    (value: string[]) => {
      chartLabels.value = [...value];
    },
    { immediate: true, deep: true }
  );

  watch(
    () => [props.series, props.labels],
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
