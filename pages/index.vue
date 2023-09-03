<template>
  <div>
    <TheCalendar @update="handleCalendarUpdate" />
  </div>
</template>

<script setup lang="ts">
  import { ICalendarValue } from '@/assets/interfaces/record';

  const handleCalendarUpdate = (payload: ICalendarValue): void => {
    console.log(payload);
  };
</script>

<style lang="scss" scoped></style>
