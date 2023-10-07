<template>
  <div>
    <OverviewCountor />
    <OverviewChart :mode="chartMode" @mode-update="handleModeUpdate" />
  </div>
</template>

<script setup lang="ts">
  import { EnumChartMode } from '@/assets/enums/overview';

  const chartMode = ref<EnumChartMode>(EnumChartMode.MONTH);

  const handleModeUpdate = (payload: EnumChartMode): void => {
    chartMode.value = payload;
  };
</script>
