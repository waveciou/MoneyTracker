<template>
  <ul>
    <li v-for="item in props.cards" :key="item.id" class="mb-3">
      <CardItem :data="item" />
    </li>
  </ul>
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
</script>
