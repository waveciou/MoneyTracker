<template>
  <button
    class="flex w-full"
    :title="provideCategoryName(props.data.category, false)"
    @click="emits('click')"
  >
    <div class="h-icon-size w-icon-size basis-icon-size rounded bg-yellow">
      <TheIcon
        :category-id="props.data.category"
        class="flex h-full w-full items-center justify-center text-black-base before:text-4xl"
      />
    </div>
    <div class="w-card-content pl-2.5 text-left">
      <div class="flex items-center justify-between text-base">
        <span class="block truncate text-yellow">
          {{ provideCategoryName(props.data.category, false) }}
        </span>
        <span class="block truncate pl-2" :class="providePriceClass">
          {{ provideCategoryName(`${props.data.price}`) }}
        </span>
      </div>
      <div class="truncate text-sm">{{ props.data.store }}</div>
      <div class="truncate text-sm">
        <span
          v-for="tag in props.data.tags"
          :key="tag"
          class="mr-2 before:content-['#']"
        >
          {{ tag }}
        </span>
      </div>
    </div>
  </button>
</template>

<script setup lang="ts">
  import { EnumRecordType } from '@/assets/types/record';
  import type { IRecordForm } from '@/assets/types/record';

  const props = defineProps<{ data: IRecordForm }>();

  const emits = defineEmits<{ (e: 'click'): void }>();

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

  const provideCategoryName = (
    categoryID: string,
    isMainCategoryName?: boolean
  ): string => useCategoryName(categoryID, isMainCategoryName || false);
</script>
