<template>
  <div>
    <div class="text-right text-2xl">
      Total:
      <span class="text-yellow">{{ useFinanceNumber(provideTotalPrice) }}</span>
    </div>
    <ul v-if="props.cards.length">
      <li v-for="item in props.cards" :key="item.name">
        <TheAccordion :title="item.name" :default="false">
          <div class="mb-5">
            <div class="mb-3 text-right text-lg text-yellow">
              {{ provideSumPrice(item.storage) }}
            </div>
            <CardList :cards="item.storage" />
          </div>
        </TheAccordion>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
  import numeral from 'numeral';
  import type { IRecordForm } from '@/assets/types/record';
  import type { IAnalysisCardGroup } from '@/assets/types/analysis';
  import { useFinanceNumber } from '@/utils/useFinanceNumber';

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

  const provideTotalPrice = computed((): number => {
    return props.cards.reduce((prev: number, current: IAnalysisCardGroup) => {
      return current.storage.reduce(
        (prevPrice: number, storageItem: IRecordForm) => {
          return numeral(prevPrice).add(storageItem.price).value() || prevPrice;
        },
        prev as number
      );
    }, 0 as number);
  });

  const provideSumPrice = (payload: IRecordForm[]): string => {
    const sumPrice: number = payload.reduce(
      (prev: number, current: IRecordForm) => {
        return numeral(prev).add(current.price).value() || prev;
      },
      0 as number
    );
    return useFinanceNumber(sumPrice);
  };
</script>
