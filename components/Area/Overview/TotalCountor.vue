<template>
  <section class="my-3 rounded-lg bg-black-darkest px-3 py-2">
    <h2
      class="mb-1 flex items-center justify-between truncate text-2xl text-white"
    >
      Total
      <span class="ml-1" :class="providePriceClass">
        {{ providePrice }}
      </span>
    </h2>
    <div
      class="flex items-center justify-between truncate text-base text-white"
    >
      Income
      <span class="ml-1 text-green">
        +{{ useFinanceNumber(recordStore.totalIncomePrice) }}
      </span>
    </div>
    <div
      class="flex items-center justify-between truncate text-base text-white"
    >
      Expense
      <span class="ml-1 text-red">
        {{ useFinanceNumber(recordStore.totalExpensePrice) }}
      </span>
    </div>
  </section>
</template>

<script setup lang="ts">
  import { useRecordStore } from '@/stores/recordStore';
  import { useFinanceNumber } from '@/utils/useFinanceNumber';

  const recordStore = useRecordStore();

  const providePriceClass = computed((): string => {
    if (recordStore.totalPrice < 0) {
      return 'text-red';
    }
    return 'text-green';
  });

  const providePrice = computed((): string => {
    const price = useFinanceNumber(recordStore.totalPrice);

    if (recordStore.totalPrice > 0) {
      return `+${price}`;
    }
    return price;
  });
</script>
