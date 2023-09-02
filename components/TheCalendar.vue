<template>
  <div>
    <div>
      <button>Prev</button>
      <div></div>
      <button>Next</button>
    </div>
    <p>{{ props.default }}</p>
    <p>{{ contextDate }}</p>
    <p>{{ todayDate }}</p>
  </div>
</template>

<script setup lang="ts">
  import { ICalendarValue } from '@/assets/interfaces/record';
  import { useTodayValue } from '@/composables/useTodayValue';

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

  // const daysShort = ref<string[]>([
  //   'SUN',
  //   'MON',
  //   'TUE',
  //   'WED',
  //   'THU',
  //   'FRI',
  //   'SAT',
  // ]);

  const contextDate = ref<ICalendarValue>({
    year: props.default.year,
    month: props.default.month,
    date: props.default.date,
  });

  const todayDate = ref<ICalendarValue>(useTodayValue());
</script>
