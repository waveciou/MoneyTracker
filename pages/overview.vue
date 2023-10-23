<template>
  <div>
    <AreaOverviewTotalCountor />
    <section v-if="storage.length">
      <ChartModeSelector
        :mode="chartMode"
        :options="[EnumChartMode.YEARS, EnumChartMode.MONTHS]"
        @update="handleModeUpdate"
      />
      <ChartTimeSelector
        tag-name="h2"
        :mode="chartMode"
        :time-frame="chartTimeFrame"
        @update="handleTimeFrameUpdate"
      />
      <AreaOverviewContent :mode="chartMode" :time-frame="chartTimeFrame" />
    </section>
    <TheEmpty v-else />
  </div>
</template>

<script setup lang="ts">
  import { watch } from 'vue';
  import { storeToRefs } from 'pinia';
  import { useRecordStore } from '@/stores/recordStore';
  import { EnumChartMode } from '@/assets/enums/chart';
  import { IChartTimeFrame } from '@/assets/interfaces/chart';

  useHead({ title: 'Money Tracker - Overview' });

  const today = useTimeTodayValue();
  const recordStore = useRecordStore();
  const { storage } = storeToRefs(recordStore);

  const chartMode = ref<EnumChartMode>(EnumChartMode.MONTHS);

  const chartTimeFrame = ref<IChartTimeFrame>({
    year: today.year,
    month: today.month,
  });

  const handleModeUpdate = (payload: EnumChartMode): void => {
    chartMode.value = payload;
  };

  const handleTimeFrameUpdate = (payload: IChartTimeFrame): void => {
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
