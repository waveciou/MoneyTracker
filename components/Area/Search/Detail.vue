<template>
  <div v-if="props.cards.length">
    <div class="flex justify-between items-center">
      <p class="text-white">
        Total
        <span class="text-yellow">{{ props.cards.length }}</span>
        Records
      </p>
      <button
        class="before-font-material flex items-center"
        :class="isShow ? 'icon-less' : 'icon-more'"
        @click="isShow = !isShow"
      >
        Detail
      </button>
    </div>
    <div v-if="isShow" class="pt-2">
      <TheCountor :cards="props.cards" />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { IRecordForm } from '@/assets/interfaces/record';

  const props = withDefaults(
    defineProps<{
      cards: IRecordForm[];
    }>(),
    {
      cards() {
        return [];
      },
    }
  );

  const isShow = ref<boolean>(false);
</script>

<style lang="scss" scoped>
  .icon-more::before {
    content: '\e5cf';
  }

  .icon-less::before {
    content: '\e5ce';
  }
</style>
