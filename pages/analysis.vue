<template>
  <div>
    <section v-if="storage.length">
      <ChartTypeSelector
        :type="chartAnalysisType"
        class="mt-0"
        @update="handleTypeUpdate"
      />
      <ChartModeSelector :mode="chartMode" @update="handleModeUpdate" />
      <ChartTimeSelector
        v-if="
          chartMode === EnumChartMode.YEARS ||
          chartMode === EnumChartMode.MONTHS
        "
        tag-name="h2"
        :mode="chartMode"
        :time-frame="chartTimeFrame"
        @update="handleTimeFrameUpdate"
      />
      <div>
        <AreaAnalysisSectionCategory
          v-if="chartAnalysisType === EnumChartAnalysisType.CATEGORY"
          :mode="chartMode"
          :time-frame="chartTimeFrame"
        />
        <AreaAnalysisSectionStore
          v-else-if="chartAnalysisType === EnumChartAnalysisType.STORE"
          :mode="chartMode"
          :time-frame="chartTimeFrame"
        />
        <AreaAnalysisSectionTags
          v-else-if="chartAnalysisType === EnumChartAnalysisType.TAGS"
          :mode="chartMode"
          :time-frame="chartTimeFrame"
        />
      </div>
    </section>
    <TheEmpty v-else />
  </div>
</template>

<script setup lang="ts">
  import { watch } from 'vue';
  import { storeToRefs } from 'pinia';
  import { useRecordStore } from '@/stores/recordStore';
  import { EnumChartMode, EnumChartAnalysisType } from '@/assets/enums/chart';
  import { IChartTimeFrame } from '@/assets/interfaces/chart';

  const today = useTimeTodayValue();
  const recordStore = useRecordStore();
  const { storage } = storeToRefs(recordStore);

  const chartMode = ref<EnumChartMode>(EnumChartMode.MONTHS);

  const chartTimeFrame = ref<IChartTimeFrame>({
    year: today.year,
    month: today.month,
  });

  const chartAnalysisType = ref<EnumChartAnalysisType>(
    EnumChartAnalysisType.CATEGORY
  );

  const handleModeUpdate = (payload: EnumChartMode): void => {
    chartMode.value = payload;
  };

  const handleTimeFrameUpdate = (payload: IChartTimeFrame): void => {
    chartTimeFrame.value = payload;
  };

  const handleTypeUpdate = (payload: EnumChartAnalysisType): void => {
    chartAnalysisType.value = payload;
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
