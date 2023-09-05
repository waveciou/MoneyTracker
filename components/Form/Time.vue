<template>
  <div>
    <label class="block text-base mb-1">Time</label>
    <div class="flex items-center">
      <div class="flex-1 mr-[0.3125rem]">
        <label :for="hourID" class="block text-xs pl-1 mb-1">Hour</label>
        <InputSelect
          :id="hourID"
          v-model="selectedHour"
          class="w-full"
          :options="optionHour"
          :disabled="props.disabled"
        />
      </div>
      <div class="flex-1 ml-[0.3125rem]">
        <label :for="minuteID" class="block text-xs pl-1 mb-1">Minute</label>
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
  import { computed, watch } from 'vue';
  import { storeToRefs } from 'pinia';
  import { IInputSelectOption } from '@/assets/interfaces/element';
  import { useCommonStore } from '@/stores/commonStore';
  import { useTimeValue } from '@/composables/useTimeValue';

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
