<template>
  <div>
    <div class="flex items-center">
      <button
        class="before-font-material icon-arrow-left block w-7 h-7 ml-2 basis-7 before:w-full before:h-full before:flex before:justify-center before:items-center before:text-3xl"
        title="Previous"
        @click="handleChangeMonth(false)"
      />
      <div class="w-full h-7 flex justify-center">
        <button class="block" @click="handleMoveToday">
          <span class="mr-1">{{ selected.year }} 年</span>
          <span>{{ useNumberFormat(selected.month) }} 月</span>
        </button>
      </div>
      <button
        class="before-font-material icon-arrow-right block w-7 h-7 mr-2 basis-7 before:w-full before:h-full before:flex before:justify-center before:items-center before:text-3xl"
        title="Next"
        @click="handleChangeMonth(true)"
      />
    </div>
    <div>
      <ul class="py-2 flex items-center">
        <li
          v-for="item in captionDays"
          :key="item"
          class="w-[14.285%] text-center text-sm"
        >
          <span>{{ item }}</span>
        </li>
      </ul>
      <ul class="py-2 flex items-center flex-wrap">
        <li
          v-for="(item, index) in contextCalendar"
          :key="index"
          class="w-[14.285%] text-center"
        >
          <button
            class="w-full block p-1 rounded"
            :class="provideClassName(item)"
            @click="handleClick(item)"
          >
            {{ useNumberFormat(item.date) }}
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { computed, watch } from 'vue';
  import { storeToRefs } from 'pinia';
  import calendarData from '@/public/data/calendar.json';
  import { useCommonStore } from '@/stores/commonStore';
  import { useTodayValue } from '@/composables/useTodayValue';
  import { useNumberFormat } from '@/utils/useNumberFormat';
  import { ICalendarValue } from '@/assets/interfaces/record';

  const props = withDefaults(
    defineProps<{
      default?: ICalendarValue;
    }>(),
    {
      default() {
        return useTodayValue();
      },
    }
  );

  const emits = defineEmits<{
    (e: 'update', value: ICalendarValue): void;
  }>();

  const dayjs = useDayjs();
  const commonStore = useCommonStore();
  const { utcOffset } = storeToRefs(commonStore);
  const captionDays = ref<string[]>([...calendarData.daysShort]);

  const selected = ref<ICalendarValue>({
    year: props.default.year,
    month: props.default.month,
    date: props.default.date,
  });

  // Calendar Cells

  const contextCalendar = computed((): ICalendarValue[] => {
    const result = [];
    const offset: number = utcOffset.value;

    const totalDates: number = dayjs(
      `${selected.value.year}-${selected.value.month}`
    )
      .utcOffset(offset)
      .daysInMonth();

    for (let i = 0; i < totalDates; i++) {
      const dateCell = {
        year: selected.value.year,
        month: selected.value.month,
        date: i + 1,
      };
      result.push(dateCell);
    }

    // 補上前面的日期
    const frontPart = Number(
      dayjs(`${selected.value.year}-${selected.value.month}`)
        .utcOffset(offset)
        .format('d')
    );

    const prevMonth = provideMonthValue(
      selected.value.year,
      selected.value.month,
      false
    );

    const prevMonthDates: number = dayjs(`${prevMonth.year}-${prevMonth.month}`)
      .utcOffset(offset)
      .daysInMonth();

    for (let i = 0; i < frontPart; i++) {
      const dateCell = {
        year: prevMonth.year,
        month: prevMonth.month,
        date: prevMonthDates - frontPart + (i + 1),
      };
      result.splice(i, 0, dateCell);
    }

    // 補上後面的日期
    const backPart = result.length % 7 === 0 ? 0 : 7 - (result.length % 7);

    const nextMonth = provideMonthValue(
      selected.value.year,
      selected.value.month,
      true
    );

    for (let i = 0; i < backPart; i++) {
      const dateCell = {
        year: nextMonth.year,
        month: nextMonth.month,
        date: i + 1,
      };
      result.push(dateCell);
    }

    return result;
  });

  // Get Previous or Next Month (Getting Value of Year & Month)

  const provideMonthValue = (
    originalYear: number,
    originalMonth: number,
    isNext: boolean
  ): { year: number; month: number } => {
    const result = {
      year: originalYear,
      month: isNext ? originalMonth + 1 : originalMonth - 1,
    };

    if (result.month <= 0) {
      result.month = 12;
      result.year -= 1;
    } else if (result.month > 12) {
      result.month = 1;
      result.year += 1;
    }
    return result;
  };

  const provideClassName = (payload: ICalendarValue): string => {
    const today = useTodayValue();
    const formatPayload = `${payload.year}-${payload.month}-${payload.date}`;
    const formatToday = `${today.year}-${today.month}-${today.date}`;
    const formatSelected = `${selected.value.year}-${selected.value.month}-${selected.value.date}`;

    // Is Selected
    if (formatSelected === formatPayload) {
      return 'bg-yellow text-black-base';
    }

    // Is Today
    if (formatToday === formatPayload) {
      return 'text-yellow';
    }

    // Is Others Month
    if (
      payload.year !== selected.value.year ||
      payload.month !== selected.value.month
    ) {
      return 'opacity-30';
    }

    return '';
  };

  // Change Month

  const handleChangeMonth = (isNext: boolean): void => {
    const { year, month } = provideMonthValue(
      selected.value.year,
      selected.value.month,
      isNext
    );

    selected.value.year = year;
    selected.value.month = month;
    selected.value.date = 1;
  };

  // Move to Today

  const handleMoveToday = (): void => {
    const { year, month, date } = useTodayValue();
    selected.value.year = year;
    selected.value.month = month;
    selected.value.date = date;
  };

  // Pick Calendar Cell

  const handleClick = (payload: ICalendarValue): void => {
    selected.value.year = payload.year;
    selected.value.month = payload.month;
    selected.value.date = payload.date;
  };

  watch(
    () => selected.value,
    (value) => {
      emits('update', value);
    },
    {
      immediate: true,
      deep: true,
    }
  );
</script>

<style lang="scss" scoped>
  .icon-arrow-left::before {
    content: '\e5cb';
    pointer-events: none;
  }

  .icon-arrow-right::before {
    content: '\e5cc';
    pointer-events: none;
  }
</style>
