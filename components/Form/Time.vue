<template>
  <div>
    <label :for="id" class="block text-base mb-2">時間</label>
    <div class="w-full flex items-center justify-between">
      <div class="w-[calc((100%-0.625rem)/2)]">
        <InputSelect
          :id="id"
          v-model="contextHour"
          :options="optionHour"
          :disabled="props.disabled"
        />
      </div>
      <div class="w-[calc((100%-0.625rem)/2)]">
        <InputSelect
          v-model="contextMinute"
          :options="optionMinute"
          :disabled="props.disabled"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { v4 as uuidv4 } from 'uuid';
  import { IInputSelectOption } from '@/assets/interfaces/element';

  const props = withDefaults(
    defineProps<{
      timestamp: number;
      disabled?: boolean;
    }>(),
    {
      disabled: false,
    }
  );

  const dayjs = useDayjs();
  const id = ref<string>(uuidv4());

  const optionHour = ref<IInputSelectOption[]>([...useOptionHour()]);
  const optionMinute = ref<IInputSelectOption[]>([...useOptionMinute()]);

  const contextHour = ref<number>(
    dayjs(props.timestamp).utcOffset(8).get('hour')
  );

  const contextMinute = ref<number>(
    dayjs(props.timestamp).utcOffset(8).get('minute')
  );
</script>
