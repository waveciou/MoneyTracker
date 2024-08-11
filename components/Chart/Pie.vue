<template>
  <div v-if="isShow">
    <ClientOnly>
      <div class="element-piechart w-full overflow-x-auto overflow-y-hidden">
        <VueApexCharts
          v-if="chartSeries.length > 0"
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
  import VueApexCharts from 'vue3-apexcharts';
  import type { IPieChartOptions } from '@/assets/interfaces/chart';

  const props = defineProps<{
    series: number[];
    labels: string[];
  }>();

  const isShow = ref<boolean>(true);

  const showerTimer = ref<number | null>(null);

  const chartSeries = ref<number[]>([]);

  const chartOptions = ref<IPieChartOptions>({
    colors: ['#50AAF8', '#32C8A4', '#F76C83', '#FFDF5E', '#94C962', '#AC93E8'],
    labels: [],
    legend: {
      labels: {
        colors: '#FFFFFF',
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
      chartOptions.value.labels = [...value];
    },
    { immediate: true, deep: true }
  );

  watch(
    () => [props.series, props.labels],
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
