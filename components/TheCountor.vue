<template>
  <div class="rounded bg-black-darkest px-3 py-2 text-sm text-white">
    <div class="flex items-center justify-between truncate">
      Income
      <span class="ml-1 text-green">+{{ useFinanceNumber(incomePrice) }}</span>
    </div>
    <div class="flex items-center justify-between truncate">
      Expense
      <span class="ml-1 text-red">
        {{ useFinanceNumber(expensePrice) }}
      </span>
    </div>
    <div class="flex items-center justify-end truncate">
      <span class="ml-1 text-yellow">{{ provideSumPrice }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
  import numeral from 'numeral';
  import { EnumRecordType } from '@/assets/types/record';
  import type { IRecordForm } from '@/assets/types/record';
  import { useFinanceNumber } from '@/utils/useFinanceNumber';

  const props = defineProps<{ cards: IRecordForm[] }>();

  const incomePrice = computed((): number => {
    return props.cards.reduce((prev: number, current: IRecordForm) => {
      const { category, price } = current;
      if (useCategoryValidator(category) === EnumRecordType.INCOME) {
        return numeral(prev).add(price).value() || prev;
      }
      return prev;
    }, 0 as number);
  });

  const expensePrice = computed((): number => {
    return props.cards.reduce((prev: number, current: IRecordForm) => {
      const { category, price } = current;
      if (useCategoryValidator(category) === EnumRecordType.EXPENSE) {
        return numeral(prev).subtract(price).value() || prev;
      }
      return prev;
    }, 0 as number);
  });

  const sumPrice = computed((): number => {
    return numeral(incomePrice.value).add(expensePrice.value).value() || 0;
  });

  const provideSumPrice = computed((): string => {
    if (sumPrice.value > 0) {
      return `+${useFinanceNumber(sumPrice.value)}`;
    }
    return `${useFinanceNumber(sumPrice.value)}`;
  });
</script>
