<template>
  <div class="py-2 px-3 my-3 bg-black-darkest rounded-lg">
    <div
      class="flex items-center justify-between mb-1 text-sm text-white truncate"
    >
      Income:
      <span class="ml-1 text-green">
        {{ useFinanceNumber(incomePrice) }}
      </span>
    </div>
    <div
      class="flex items-center justify-between mb-1 text-sm text-white truncate"
    >
      Expense:
      <span class="ml-1 text-red">
        {{ useFinanceNumber(expensePrice) }}
      </span>
    </div>
    <div class="flex justify-end text-sm text-white">
      <span class="ml-1" :class="provideSumPriceClass">
        {{ provideSumPrice }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
  import numeral from 'numeral';
  import { computed } from 'vue';
  import { EnumRecordType } from '@/assets/enums/record';
  import { IRecordForm } from '@/assets/interfaces/record';

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

  const provideSumPriceClass = computed((): string => {
    if (sumPrice.value < 0) {
      return 'text-red';
    }
    return 'text-green';
  });
</script>
