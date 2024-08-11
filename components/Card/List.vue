<template>
  <ul>
    <li v-for="item in contextCards" :key="item.id" class="mb-3">
      <CardItem :data="item" />
    </li>
  </ul>
</template>

<script setup lang="ts">
  import type { IRecordForm } from '@/assets/interfaces/record';

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

  const contextCards = computed((): IRecordForm[] => {
    const result = props.cards;
    return result.sort((a, b) => a.time - b.time);
  });
</script>
