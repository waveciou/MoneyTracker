<template>
  <div>
    <TheCalendar class="mb-4" @update="handleCalendarUpdate" />
    <CardList :date-info="selectedDate" />
  </div>
</template>

<script setup lang="ts">
  import { ICalendarValue } from '@/assets/interfaces/record';

  const selectedDate = ref<ICalendarValue>(useTimeTodayValue());

  const handleCalendarUpdate = (payload: ICalendarValue): void => {
    selectedDate.value = payload;
  };
</script>
