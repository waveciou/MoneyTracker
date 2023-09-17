<template>
  <div>
    <label class="block text-base mb-2">Date</label>
    <TheButton class="w-full mb-2" @click="isPopUpOpen = !isPopUpOpen">
      <div
        class="flex justify-center items-center before-font-material icon-calandar before:block before:mr-1 before:w-6 before:h-6"
      >
        <span class="mr-1">{{ contextDate.year }} 年</span>
        <span class="mr-1">{{ useNumberFormat(contextDate.month) }} 月</span>
        <span>{{ useNumberFormat(contextDate.date) }} 日</span>
      </div>
    </TheButton>
    <ThePopUp :is-open="isPopUpOpen" @close="handleCancel">
      <div class="p-2.5 bg-black-dark">
        <TheCalendar
          class="mb-2.5"
          :default="contextDate"
          @update="handleUpdate"
        />
        <div class="flex items-center">
          <TheButton
            class="w-full flex-1 mr-[0.3125rem] bg-black-dark"
            title="Cancel"
            @click="handleCancel"
          >
            Cancel
          </TheButton>
          <TheButton
            class="w-full flex-1 ml-[0.3125rem] bg-black-dark"
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
  import { computed } from 'vue';

  import { useNumberFormat } from '@/utils/useNumberFormat';
  import { ICalendarValue } from '@/assets/interfaces/record';

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

<style lang="scss" scoped>
  .icon-calandar::before {
    content: '\ebcc';
  }
</style>
