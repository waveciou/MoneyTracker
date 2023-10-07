<template>
  <div>
    <OverviewTotalCountor />
    <OverviewModeSelector :mode="chartMode" @update="handleModeUpdate" />
    <OverviewTimeSelector
      :mode="chartMode"
      :time-frame="chartTimeFrame"
      @update="handleTimeFrameUpdate"
    />
  </div>
</template>

<script setup lang="ts">
  import { watch } from 'vue';
  import { EnumChartMode } from '@/assets/enums/chart';
  import { ITimeFrame } from '@/assets/interfaces/chart';

  const today = useTimeTodayValue();

  const chartMode = ref<EnumChartMode>(EnumChartMode.MONTHS);

  const chartTimeFrame = ref<ITimeFrame>({
    year: today.year,
    month: today.month,
  });

  const handleModeUpdate = (payload: EnumChartMode): void => {
    chartMode.value = payload;
  };

  const handleTimeFrameUpdate = (payload: ITimeFrame): void => {
    chartTimeFrame.value = payload;
  };

  watch(
    () => chartMode.value,
    (value: EnumChartMode) => {
      const { year, month } = useTimeTodayValue();

      if (value === EnumChartMode.YEARS) {
        handleTimeFrameUpdate({ year, month: null });
      }

      if (value === EnumChartMode.MONTHS) {
        handleTimeFrameUpdate({ year, month });
      }
    }
  );
</script>
