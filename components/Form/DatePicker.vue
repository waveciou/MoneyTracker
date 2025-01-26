<template>
  <div>
    <label class="mb-2 block text-base font-bold">Date</label>
    <TheButton class="mb-2 w-full" @click="isPopUpOpen = !isPopUpOpen">
      <div
        class="before-font-material flex items-center justify-center before:mr-1 before:block before:h-6 before:w-6 before:content-['\ebcc']"
      >
        <span class="mr-1">{{ contextDate.year }} 年</span>
        <span class="mr-1">{{ useFormatNumber(contextDate.month) }} 月</span>
        <span>{{ useFormatNumber(contextDate.date) }} 日</span>
      </div>
    </TheButton>
    <ThePopUp :is-open="isPopUpOpen" @close="handleCancel">
      <div class="bg-black-dark p-2.5">
        <TheCalendar
          class="mb-2.5"
          :default="contextDate"
          @update="handleUpdate"
        />
        <div class="flex items-center">
          <TheButton
            class="mr-[0.3125rem] w-full flex-1 bg-black-dark"
            title="Cancel"
            @click="handleCancel"
          >
            Cancel
          </TheButton>
          <TheButton
            class="ml-[0.3125rem] w-full flex-1 bg-black-dark"
            title="Pick"
            @click="handlePick"
          >
            Pick
          </TheButton>
        </div>
      </div>
    </ThePopUp>
  </div>
</template>

<script setup lang="ts">
  import type { ICalendarValue } from '@/assets/types/record';
  import { useFormatNumber } from '@/utils/useFormatNumber';

  const props = defineProps<{ timestamp: number }>();
  const emits = defineEmits<{ (e: 'update', value: number): void }>();

  const dayjs = useDayjs();
  const isPopUpOpen = ref<boolean>(false);

  const contextDate = computed((): ICalendarValue => {
    return {
      year: useTimeValue(props.timestamp).year,
      month: useTimeValue(props.timestamp).month,
      date: useTimeValue(props.timestamp).date,
    };
  });

  const selectedDate = ref<ICalendarValue>({
    year: contextDate.value.year,
    month: contextDate.value.month,
    date: contextDate.value.date,
  });

  const handleUpdate = (payload: ICalendarValue): void => {
    const { year, month, date } = payload;
    selectedDate.value.year = year;
    selectedDate.value.month = month;
    selectedDate.value.date = date;
  };

  const handleCancel = (): void => {
    const { year, month, date } = useTimeValue(props.timestamp);
    handleUpdate({ year, month, date });
    isPopUpOpen.value = false;
  };

  const handlePick = (): void => {
    const { year, month, date } = selectedDate.value;
    const { hour, minute } = useTimeValue(props.timestamp);
    const timeFormat = `${year}-${month}-${date} ${hour}:${minute}`;
    const result: number = dayjs(timeFormat).valueOf();

    emits('update', result);
    isPopUpOpen.value = false;
  };
</script>
