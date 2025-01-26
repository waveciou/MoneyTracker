<template>
  <div class="p-2">
    <div
      class="mb-2"
      :class="hasDetail && 'border-b border-solid border-white pb-2'"
    >
      <div class="mb-1 flex items-center justify-between text-lg">
        <span class="block truncate text-yellow">
          {{ provideName }}
        </span>
        <span class="block truncate pl-2" :class="providePriceClass">
          {{ providePrice }}
        </span>
      </div>
      <div class="text-right">{{ provideTime }}</div>
    </div>
    <div v-if="props.data.store.trim()" class="mb-1 text-sm">
      <span class="font-bold">Store:</span>
      {{ props.data.store }}
    </div>
    <div v-if="props.data.note.trim()" class="mb-1 text-sm">
      <span class="font-bold">Note:</span>
      {{ props.data.note }}
    </div>
    <ul v-if="props.data.tags.length" class="mt-2 flex flex-wrap items-center">
      <li
        v-for="tag in props.data.tags"
        :key="tag"
        class="mb-1.5 mr-1.5 max-w-full"
      >
        <div
          class="flex w-full items-center rounded bg-yellow px-1.5 py-1 text-xs font-bold text-black before:content-['#']"
        >
          <span class="truncate">{{ tag }}</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
  import { EnumRecordType } from '@/assets/types/record';
  import type { IRecordForm } from '@/assets/types/record';

  const props = defineProps<{ data: IRecordForm }>();

  const hasDetail = computed((): boolean => {
    const { store, note, tags } = props.data;
    if (!store.trim() && !note.trim() && !tags.length) {
      return false;
    }
    return true;
  });

  const providePriceClass = computed((): string => {
    switch (useCategoryValidator(props.data.category)) {
      case EnumRecordType.EXPENSE:
        return 'text-red';
      case EnumRecordType.INCOME:
        return 'text-green';
      default:
        return '';
    }
  });

  const providePrice = computed((): string => {
    const price: string = useFinanceNumber(props.data.price);

    switch (useCategoryValidator(props.data.category)) {
      case EnumRecordType.EXPENSE:
        return `-${price}`;
      case EnumRecordType.INCOME:
        return `+${price}`;
      default:
        return price;
    }
  });

  const provideTime = computed((): string => {
    const { year, month, date, hour, minute } = useTimeValue(props.data.time);
    const _date = `${year}/${useFormatNumber(month)}/${useFormatNumber(date)}`;
    const _time = `${useFormatNumber(hour)}:${useFormatNumber(minute)}`;
    return `${_date} ${_time}`;
  });

  const provideName = computed((): string => {
    const mainName = useCategoryName(props.data.category, true);
    const subName = useCategoryName(props.data.category, false);
    return `${mainName} - ${subName}`;
  });
</script>
