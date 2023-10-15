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
            <div class="mb-3 text-lg text-right text-yellow">
              {{ provideSumPrice(item.storage) }}
            </div>
            <ul>
              <li
                v-for="cardItem in item.storage"
                :key="cardItem.id"
                class="mb-3"
              >
                <CardItem :data="cardItem" />
              </li>
            </ul>
          </div>
        </TheAccordion>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
  import numeral from 'numeral';
  import { computed } from 'vue';
  import { IRecordForm } from '@/assets/interfaces/record';
  import { IAnalysisCardGroup } from '@/assets/interfaces/analysis';

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
