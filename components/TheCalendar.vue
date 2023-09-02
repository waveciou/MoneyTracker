<template>
  <div>
    <div class="flex items-center">
      <button
        class="before-font-material icon-arrow-left block w-7 h-7 basis-7 before:w-full before:h-full before:flex before:justify-center before:items-center before:text-3xl"
        title="Previous"
        @click="handleChangeMonth(false)"
      />
      <div class="w-full h-7 flex justify-center">
        <button class="block" @click="handleMoveToday">
          <span class="mr-1">{{ selected.year }} 年</span>
          <span>{{ selected.month }} 月</span>
        </button>
      </div>
      <button
        class="before-font-material icon-arrow-right block w-7 h-7 basis-7 before:w-full before:h-full before:flex before:justify-center before:items-center before:text-3xl"
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
          v-for="item in contextCalendar"
          :key="item.id"
          class="w-[14.285%] text-center"
        >
          <button class="w-full block p-1" @click="handleClick(item)">
            {{ item.date }}
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { v4 as uuidv4 } from 'uuid';
  import { computed } from 'vue';
  import { storeToRefs } from 'pinia';
  import { useCommonStore } from '@/stores/commonStore';
  import { ICalendarValue } from '@/assets/interfaces/record';
  import { useTodayValue } from '@/composables/useTodayValue';

  interface ICalendarCell extends ICalendarValue {
    id: string;
  }

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

  // const emits = defineEmits<{
  //   (e: 'update', value: ICalendarValue): void;
  // }>();

  const dayjs = useDayjs();
  const commonStore = useCommonStore();
  const { utcOffset } = storeToRefs(commonStore);

  const captionDays = ref<string[]>([
    'SUN',
    'MON',
    'TUE',
    'WED',
    'THU',
    'FRI',
    'SAT',
  ]);

  const selected = ref<ICalendarValue>({
    year: props.default.year,
    month: props.default.month,
    date: props.default.date,
  });

  const contextCalendar = computed((): ICalendarCell[] => {
    const result = [];
    const offset: number = utcOffset.value;

    const totalDates: number = dayjs(
      `${selected.value.year}-${selected.value.month}`
    )
      .utcOffset(offset)
      .daysInMonth();

    for (let i = 0; i < totalDates; i++) {
      const dateCell = {
        id: uuidv4(),
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

    const prevMonth = provideOthersMonth(
      selected.value.year,
      selected.value.month,
      false
    );

    const prevMonthDates: number = dayjs(`${prevMonth.year}-${prevMonth.month}`)
      .utcOffset(offset)
      .daysInMonth();

    for (let i = 0; i < frontPart; i++) {
      const dateCell = {
        id: uuidv4(),
        year: prevMonth.year,
        month: prevMonth.month,
        date: prevMonthDates - frontPart + (i + 1),
      };
      result.splice(i, 0, dateCell);
    }

    // 補上後面的日期
    const backPart = result.length % 7 === 0 ? 0 : 7 - (result.length % 7);

    const nextMonth = provideOthersMonth(
      selected.value.year,
      selected.value.month,
      true
    );

    for (let i = 0; i < backPart; i++) {
      const dateCell = {
        id: uuidv4(),
        year: nextMonth.year,
        month: nextMonth.month,
        date: i + 1,
      };
      result.push(dateCell);
    }

    return result;
  });

  // Get previous or next month (Getting year and month)
  const provideOthersMonth = (
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

  // Change month (Previous or Next)
  const handleChangeMonth = (isNext: boolean): void => {
    const { year, month } = provideOthersMonth(
      selected.value.year,
      selected.value.month,
      isNext
    );

    selected.value.year = year;
    selected.value.month = month;
    selected.value.date = 1;
  };

  // Move to today
  const handleMoveToday = (): void => {
    const { year, month, date } = useTodayValue();
    selected.value.year = year;
    selected.value.month = month;
    selected.value.date = date;
  };

  const handleClick = (payload: ICalendarCell): void => {
    selected.value.year = payload.year;
    selected.value.month = payload.month;
    selected.value.date = payload.date;
  };
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
