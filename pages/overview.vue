<template>
  <div>
    <OverviewTotalPrice />
    <OverviewChart :mode="chartMode" />
  </div>
</template>

<script setup lang="ts">
  import { EnumChartMode } from '@/assets/enums/overview';

  const chartMode = ref<EnumChartMode>(EnumChartMode.MONTH);
</script>
