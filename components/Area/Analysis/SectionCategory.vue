<template>
  <div></div>
</template>

<script setup lang="ts">
  import { EnumChartMode } from '@/assets/enums/chart';
  import { IChartTimeFrame } from '@/assets/interfaces/chart';

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const props = withDefaults(
    defineProps<{
      mode: EnumChartMode;
      timeFrame: IChartTimeFrame;
    }>(),
    {
      mode: EnumChartMode.MONTHS,
      timeFrame() {
        const { year, month } = useTimeTodayValue();
        return { year, month };
      },
    }
  );
</script>
