<template>
  <div>
    <button class="w-full flex" @click="isPopUpOpen = true">
      <div
        class="w-icon-size h-icon-size basis-icon-size bg-yellow rounded"
      ></div>
      <div class="w-card-content pl-2.5 text-left">
        <div class="flex items-center justify-between text-base">
          <span class="block truncate">
            {{ props.data.category }}
          </span>
          <span class="block">{{ props.data.price }}</span>
        </div>
        <div class="text-sm">{{ props.data.store }}</div>
        <div>
          <span v-for="tag in props.data.tags" :key="tag">{{ tag }}</span>
        </div>
      </div>
    </button>
    <ThePopUp :is-open="isPopUpOpen" @close="isPopUpOpen = false">
      <div class="bg-white h-[100px]"></div>
    </ThePopUp>
  </div>
</template>

<script setup lang="ts">
  import { IRecordForm } from '@/assets/interfaces/record';

  const props = defineProps<{ data: IRecordForm }>();

  const isPopUpOpen = ref<boolean>(false);
</script>
