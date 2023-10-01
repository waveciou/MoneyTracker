<template>
  <div>
    <OverviewTotalPrice />
    <div class="flex justify-end items-center">
      <button class="block mr-2" @click="handClickMonth">Month</button>
      <button class="block" @click="handClickDate">Date</button>
    </div>
    <OverviewChart :mode="chartMode" />
  </div>
</template>

<script setup lang="ts">
  import { EnumChartMode } from '@/assets/enums/overview';

  const chartMode = ref<EnumChartMode>(EnumChartMode.MONTH);

  const handClickMonth = () => {
    chartMode.value = EnumChartMode.MONTH;
  };

  const handClickDate = () => {
    chartMode.value = EnumChartMode.DATE;
  };
</script>
