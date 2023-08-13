<template>
  <div>
    <label :for="id" class="block text-base mb-2">Time</label>
    <div class="flex items-center">
      <InputSelect
        :id="id"
        v-model="contextHour"
        class="w-full flex-1 mr-[0.3125rem]"
        :options="optionHour"
        :disabled="props.disabled"
      />
      <InputSelect
        v-model="contextMinute"
        class="w-full flex-1 ml-[0.3125rem]"
        :options="optionMinute"
        :disabled="props.disabled"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { v4 as uuidv4 } from 'uuid';
  import { computed, watch } from 'vue';
  import { storeToRefs } from 'pinia';
  import { IInputSelectOption } from '@/assets/interfaces/element';
  import { useCommonStore } from '@/stores/commonStore';

  const props = withDefaults(
    defineProps<{
      timestamp: number;
      disabled?: boolean;
    }>(),
    { disabled: false }
  );

  const emits = defineEmits<{
    (e: 'update', value: number): void;
  }>();

  const dayjs = useDayjs();
  const commonStore = useCommonStore();
  const { utcOffset } = storeToRefs(commonStore);

  const id = ref<string>(uuidv4());
  const optionHour = ref<IInputSelectOption[]>([...useOptionHour()]);
  const optionMinute = ref<IInputSelectOption[]>([...useOptionMinute()]);

  const contextHour = ref<number>(
    dayjs(props.timestamp).utcOffset(utcOffset.value).get('hour')
  );

  const contextMinute = ref<number>(
    dayjs(props.timestamp).utcOffset(utcOffset.value).get('minute')
  );

  const contextFormat = computed((): string => {
    const offset = utcOffset.value;
    const year = dayjs(props.timestamp).utcOffset(offset).get('year');
    const month = dayjs(props.timestamp).utcOffset(offset).get('month') + 1;
    const date = dayjs(props.timestamp).utcOffset(offset).get('date');
    return `${year}-${month}-${date} ${contextHour.value}:${contextMinute.value}`;
  });

  watch(
    () => props.timestamp,
    (value: number) => {
      const offset = utcOffset.value;
      contextHour.value = dayjs(value).utcOffset(offset).get('hour');
      contextMinute.value = dayjs(value).utcOffset(offset).get('minute');
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
