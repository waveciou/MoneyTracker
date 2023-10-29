<template>
  <div>
    <div class="flex items-center">
      <button
        class="before-font-material block w-7 h-7 ml-2 basis-7 before:content-['\e5cb'] before:w-full before:h-full before:flex before:justify-center before:items-center before:text-3xl"
        title="Previous"
        @click="handleChangeMonth(false)"
      />
      <Component :is="props.tagName" class="w-full h-7 flex justify-center">
        <button class="block" title="Today" @click="handleMoveToday">
          <span class="mr-1">{{ selectedDate.year }} 年</span>
          <span>{{ useFormatNumber(selectedDate.month) }} 月</span>
        </button>
      </Component>
      <button
        class="before-font-material block w-7 h-7 mr-2 basis-7 before:content-['\e5cc'] before:w-full before:h-full before:flex before:justify-center before:items-center before:text-3xl"
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
            class="w-full block py-1.5 px-1 rounded"
            :class="provideClassName(item)"
            :title="useFormatNumber(item.date)"
            @click="handleClick(item)"
          >
            {{ useFormatNumber(item.date) }}
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { computed, watch } from 'vue';
  import { storeToRefs } from 'pinia';
  import calendarData from '@/assets/data/calendar.json';
  import { useCommonStore } from '@/stores/commonStore';
  import { ICalendarValue } from '@/assets/interfaces/record';

  const props = withDefaults(
    defineProps<{ tagName?: string; default?: ICalendarValue }>(),
    {
      tagName: 'div',
      default() {
        return useTimeTodayValue();
      },
    }
  );

  const emits = defineEmits<{
    (e: 'update', value: ICalendarValue): void;
  }>();

  const dayjs = useDayjs();
  const commonStore = useCommonStore();
  const { utcOffset } = storeToRefs(commonStore);
  const captionDays = ref<string[]>([...calendarData.locale.daysShort]);

  const selectedDate = ref<ICalendarValue>({
    year: props.default.year,
    month: props.default.month,
    date: props.default.date,
  });

  // Calendar Cells

  const contextCalendar = computed((): ICalendarValue[] => {
    const result: ICalendarValue[] = [];
    const offset: number = utcOffset.value;

    const totalDates: number = dayjs(
      `${selectedDate.value.year}-${selectedDate.value.month}`
    )
      .utcOffset(offset)
      .daysInMonth();

    for (let i = 0; i < totalDates; i++) {
      const dateCell = {
        year: selectedDate.value.year,
        month: selectedDate.value.month,
        date: i + 1,
      };
      result.push(dateCell);
    }

    // 補上前面的日期
    const frontPart = Number(
      dayjs(`${selectedDate.value.year}-${selectedDate.value.month}`)
        .utcOffset(offset)
        .format('d')
    );

    const prevMonth = provideMonthValue(
      selectedDate.value.year,
      selectedDate.value.month,
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
      selectedDate.value.year,
      selectedDate.value.month,
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
    const today = useTimeTodayValue();
    const formatPayload = `${payload.year}-${payload.month}-${payload.date}`;
    const formatToday = `${today.year}-${today.month}-${today.date}`;
    const formatSelected = `${selectedDate.value.year}-${selectedDate.value.month}-${selectedDate.value.date}`;

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
      payload.year !== selectedDate.value.year ||
      payload.month !== selectedDate.value.month
    ) {
      return 'opacity-30';
    }

    return '';
  };

  // Set SelectedDate

  const handleSetSelectedDate = (payload: ICalendarValue): void => {
    const { year, month, date } = payload;
    selectedDate.value.year = year;
    selectedDate.value.month = month;
    selectedDate.value.date = date;
  };

  // Change Month

  const handleChangeMonth = (isNext: boolean): void => {
    const { year, month } = provideMonthValue(
      selectedDate.value.year,
      selectedDate.value.month,
      isNext
    );
    handleSetSelectedDate({ year, month, date: 1 });
  };

  // Move to Today

  const handleMoveToday = (): void => {
    const today = useTimeTodayValue();
    handleSetSelectedDate(today);
  };

  // Pick Calendar Cell

  const handleClick = (payload: ICalendarValue): void => {
    handleSetSelectedDate(payload);
  };

  watch(
    () => selectedDate.value,
    (value) => {
      emits('update', value);
    },
    { immediate: true, deep: true }
  );
</script>
