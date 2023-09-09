<template>
  <div>
    <TheCalendar @update="handleCalendarUpdate" />
  </div>
</template>

<script setup lang="ts">
  import { ICalendarValue } from '@/assets/interfaces/record';

  const handleCalendarUpdate = (_payload: ICalendarValue): void => {};
</script>

<style lang="scss" scoped></style>
