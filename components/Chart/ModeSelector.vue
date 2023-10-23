<template>
  <div class="my-3 flex justify-end items-center">
    <button
      v-if="props.options.includes(EnumChartMode.ALL)"
      class="before-font-material before:text-xl before:mr-1 flex items-center mr-4"
      :class="provideRadioClass(EnumChartMode.ALL)"
      title="All"
      @click="handleUpdate(EnumChartMode.ALL)"
    >
      All
    </button>
    <button
      v-if="props.options.includes(EnumChartMode.YEARS)"
      class="before-font-material before:text-xl before:mr-1 flex items-center mr-2"
      :class="provideRadioClass(EnumChartMode.YEARS)"
      title="Years"
      @click="handleUpdate(EnumChartMode.YEARS)"
    >
      Years
    </button>
    <button
      v-if="props.options.includes(EnumChartMode.MONTHS)"
      class="before-font-material before:text-xl before:mr-1 flex items-center"
      :class="provideRadioClass(EnumChartMode.MONTHS)"
      title="Months"
      @click="handleUpdate(EnumChartMode.MONTHS)"
    >
      Months
    </button>
  </div>
</template>

<script setup lang="ts">
  import { EnumChartMode } from '@/assets/enums/chart';

  const props = withDefaults(
    defineProps<{ mode: EnumChartMode; options: EnumChartMode[] }>(),
    {
      mode: EnumChartMode.MONTHS,
      options() {
        return [];
      },
    }
  );

  const emits = defineEmits<{
    (e: 'update', value: EnumChartMode): void;
  }>();

  const handleUpdate = (payload: EnumChartMode): void => {
    emits('update', payload);
  };

  const provideRadioClass = (payload: EnumChartMode): string => {
    return props.mode === payload
      ? 'icon-radio-checked before:text-yellow'
      : 'icon-radio-unchecked';
  };
</script>

<style lang="scss" scoped>
  .icon-radio-unchecked::before {
    content: '\e836';
  }

  .icon-radio-checked::before {
    content: '\e837';
  }
</style>
