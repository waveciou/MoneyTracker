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
