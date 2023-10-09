<template>
  <section>
    <TheCalendar
      class="mb-4"
      tag-name="h2"
      :default="selectedDate"
      @update="handleCalendarUpdate"
    />
    <AreaHomeCards :date-info="selectedDate" />
  </section>
</template>

<script setup lang="ts">
  import { watch } from 'vue';
  import { storeToRefs } from 'pinia';
  import { useRecordStore } from '@/stores/recordStore';
  import { ICalendarValue } from '@/assets/interfaces/record';

  const recordStore = useRecordStore();
  const { contextDate } = storeToRefs(recordStore);

  const selectedDate = ref<ICalendarValue>(
    contextDate.value || useTimeTodayValue()
  );

  const handleCalendarUpdate = (payload: ICalendarValue): void => {
    selectedDate.value = payload;
    recordStore.contextDate = payload;
  };

  watch(
    () => contextDate.value,
    (value) => {
      if (value) {
        Object.assign(selectedDate.value, value);
      }
    },
    { immediate: true, deep: true }
  );
</script>
