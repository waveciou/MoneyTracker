<template>
  <button
    class="w-full flex"
    :title="provideCategoryName(props.data.category, false)"
    @click="emits('click')"
  >
    <div class="w-icon-size h-icon-size basis-icon-size bg-yellow rounded">
      <TheIcon
        :category-id="props.data.category"
        class="w-full h-full flex justify-center items-center text-black-base before:text-4xl"
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
      <div class="text-sm truncate">{{ props.data.store }}</div>
      <div class="text-sm truncate">
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
  import { EnumRecordType } from '@/assets/enums/record';
  import type { IRecordForm } from '@/assets/interfaces/record';

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
