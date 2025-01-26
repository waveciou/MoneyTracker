<template>
  <ul v-if="props.cards.length">
    <li v-for="item in props.cards" :key="item.name">
      <TheAccordion :title="item.name">
        <div class="mb-5">
          <TheCountor :cards="item.storage" class="mb-3" />
          <CardList :cards="item.storage" />
        </div>
      </TheAccordion>
    </li>
  </ul>
  <TheEmpty v-else />
</template>

<script setup lang="ts">
  import type { IAnalysisCardGroup } from '@/assets/types/analysis';

  const props = withDefaults(
    defineProps<{
      cards: IAnalysisCardGroup[];
    }>(),
    {
      cards() {
        return [];
      },
    }
  );
</script>
