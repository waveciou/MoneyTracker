<template>
  <div class="my-3 flex items-center">
    <button
      class="before-font-material ml-2 block h-7 w-7 basis-7 before:flex before:h-full before:w-full before:items-center before:justify-center before:text-3xl before:content-['\e5cb']"
      title="Previous"
      @click="handleChangeTime(false)"
    />
    <Component :is="props.tagName" class="flex h-7 w-full justify-center">
      <button class="block" title="today" @click="handleMoveToday">
        <span>{{ selectedTime.year }} 年</span>
        <span v-if="props.mode === EnumChartMode.MONTHS" class="ml-1">
          {{ useFormatNumber(selectedTime.month || 0) }} 月
        </span>
      </button>
    </Component>
    <button
      class="before-font-material mr-2 block h-7 w-7 basis-7 before:flex before:h-full before:w-full before:items-center before:justify-center before:text-3xl before:content-['\e5cc']"
      title="Next"
      @click="handleChangeTime(true)"
    />
  </div>
</template>

<script setup lang="ts">
  import { EnumChartMode } from '@/assets/types/chart';
  import type { IChartTimeFrame } from '@/assets/types/chart';
  import { useFormatNumber } from '@/utils/useFormatNumber';

  const props = withDefaults(
    defineProps<{
      tagName?: string;
      mode: EnumChartMode;
      timeFrame: IChartTimeFrame;
    }>(),
    {
      tagName: 'div',
      mode: EnumChartMode.MONTHS,
      timeFrame() {
        const { year, month } = useTimeTodayValue();
        return { year, month };
      },
    }
  );

  const emits = defineEmits<{
    (e: 'update', value: IChartTimeFrame): void;
  }>();

  const selectedTime = ref<IChartTimeFrame>(props.timeFrame);

  const handleChangeTime = (isNext: boolean): void => {
    const amount: number = isNext ? 1 : -1;

    if (props.mode === EnumChartMode.YEARS) {
      selectedTime.value.year = selectedTime.value.year + amount;
    }

    if (props.mode === EnumChartMode.MONTHS) {
      if (selectedTime.value.month === null) {
        const { year, month } = useTimeTodayValue();
        selectedTime.value.year = year;
        selectedTime.value.month = month;
      } else {
        selectedTime.value.month = selectedTime.value.month + amount;

        if (selectedTime.value.month > 12) {
          selectedTime.value.year += 1;
          selectedTime.value.month = 1;
        }

        if (selectedTime.value.month < 1) {
          selectedTime.value.year -= 1;
          selectedTime.value.month = 12;
        }
      }
    }

    emits('update', selectedTime.value);
  };

  const handleMoveToday = (): void => {
    const { year, month } = useTimeTodayValue();

    if (props.mode === EnumChartMode.YEARS) {
      selectedTime.value.year = year;
      selectedTime.value.month = null;
    }

    if (props.mode === EnumChartMode.MONTHS) {
      selectedTime.value.year = year;
      selectedTime.value.month = month;
    }

    emits('update', selectedTime.value);
  };

  watch(
    () => props.timeFrame,
    (value) => {
      selectedTime.value = value;
    },
    { immediate: true, deep: true }
  );
</script>
