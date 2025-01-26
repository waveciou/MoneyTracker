<template>
  <div>
    <label class="mb-1 block text-base font-bold">Time</label>
    <div class="flex items-center">
      <div class="mr-[0.3125rem] flex-1">
        <label :for="hourID" class="mb-1 block pl-1 text-xs">Hour</label>
        <InputSelect
          :id="hourID"
          v-model="selectedHour"
          class="w-full"
          :options="optionHour"
          :disabled="props.disabled"
        />
      </div>
      <div class="ml-[0.3125rem] flex-1">
        <label :for="minuteID" class="mb-1 block pl-1 text-xs">Minute</label>
        <InputSelect
          :id="minuteID"
          v-model="selectedMinute"
          class="w-full"
          :options="optionMinute"
          :disabled="props.disabled"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { v4 as uuidv4 } from 'uuid';
  import { storeToRefs } from 'pinia';
  import type { IInputSelectOption } from '@/assets/types/element';
  import { useCommonStore } from '@/stores/commonStore';

  const props = withDefaults(
    defineProps<{
      timestamp: number;
      disabled?: boolean;
    }>(),
    { disabled: false }
  );

  const emits = defineEmits<{ (e: 'update', value: number): void }>();

  const dayjs = useDayjs();
  const commonStore = useCommonStore();
  const { utcOffset } = storeToRefs(commonStore);

  const hourID = ref<string>(uuidv4());
  const minuteID = ref<string>(uuidv4());
  const optionHour = ref<IInputSelectOption[]>([...useOptionHour()]);
  const optionMinute = ref<IInputSelectOption[]>([...useOptionMinute()]);

  const selectedHour = ref<number>(
    dayjs(props.timestamp).utcOffset(utcOffset.value).get('hour')
  );

  const selectedMinute = ref<number>(
    dayjs(props.timestamp).utcOffset(utcOffset.value).get('minute')
  );

  const contextFormat = computed((): string => {
    const { year, month, date } = useTimeValue(props.timestamp);
    return `${year}-${month}-${date} ${selectedHour.value}:${selectedMinute.value}`;
  });

  watch(
    () => props.timestamp,
    (value: number) => {
      const { hour, minute } = useTimeValue(value);
      selectedHour.value = hour;
      selectedMinute.value = minute;
    }
  );

  watch(
    () => contextFormat.value,
    (value: string) => {
      const result: number = dayjs(value).valueOf();
      emits('update', result);
    }
  );
</script>
