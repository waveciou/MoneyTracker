<template>
  <div>
    <label :for="id" class="block text-base mb-2">時間</label>
    <div class="w-full flex items-center justify-between">
      <div class="w-[calc((100%-10px)/2)]">
        <InputSelect
          :id="id"
          v-model="contextHour"
          :options="optionHour"
          :disabled="props.disabled"
        />
      </div>
      <div class="w-[calc((100%-10px)/2)]">
        <InputSelect
          v-model="contextMinute"
          :options="optionMinute"
          :disabled="props.disabled"
          class="w-[calc((100%-10px)/2)]"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { v4 as uuidv4 } from 'uuid';
  import { IInputSelectOption } from '@/assets/interfaces/element';
  import { IFormTimeValue } from '@/assets/interfaces/form';

  const props = withDefaults(
    defineProps<{
      time: IFormTimeValue;
      disabled?: boolean;
    }>(),
    {
      disabled: false,
    }
  );

  const id = ref<string>(uuidv4());

  const optionHour = ref<IInputSelectOption[]>([...useOptionHour()]);
  const optionMinute = ref<IInputSelectOption[]>([...useOptionMinute()]);

  const contextHour = ref<string>(`${props.time.hour}`);
  const contextMinute = ref<string>(`${props.time.minute}`);
</script>
