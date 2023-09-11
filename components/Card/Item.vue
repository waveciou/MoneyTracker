<template>
  <div>
    <button class="w-full flex" @click="isPopUpOpen = true">
      <div
        class="w-icon-size h-icon-size basis-icon-size bg-yellow rounded"
      ></div>
      <div class="w-card-content pl-2.5 text-left">
        <div class="flex items-center justify-between text-base">
          <span class="block truncate text-yellow">
            {{ props.data.category }}
          </span>
          <span
            class="block pl-2 before:content-['$']"
            :class="providePriceClass"
          >
            {{ props.data.price }}
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
    <ThePopUp :is-open="isPopUpOpen" @close="isPopUpOpen = false">
      <div class="bg-white h-[100px]"></div>
    </ThePopUp>
  </div>
</template>

<script setup lang="ts">
  import { computed } from 'vue';
  import { EnumRecordType } from '@/assets/enums/record';
  import { IRecordForm } from '@/assets/interfaces/record';

  const props = defineProps<{ data: IRecordForm }>();

  const isPopUpOpen = ref<boolean>(false);

  const providePriceClass = computed((): string => {
    switch (useValidCategory(props.data.category)) {
      case EnumRecordType.EXPENSE:
        return 'text-red';
      case EnumRecordType.INCOME:
        return 'text-green';
      default:
        return '';
    }
  });
</script>
