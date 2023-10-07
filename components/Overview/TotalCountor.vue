<template>
  <div class="py-2 px-3 my-3 bg-black-darkest rounded-lg">
    <div
      class="flex items-center justify-between mb-1 text-2xl text-white truncate"
    >
      Total
      <span class="ml-1" :class="providePriceClass">
        {{ providePrice }}
      </span>
    </div>
    <div
      class="flex items-center justify-between text-base text-white truncate"
    >
      Income
      <span class="ml-1 text-green">
        +{{ useFinanceNumber(recordStore.totalIncomePrice) }}
      </span>
    </div>
    <div
      class="flex items-center justify-between text-base text-white truncate"
    >
      Expense
      <span class="ml-1 text-red">
        {{ useFinanceNumber(recordStore.totalExpensePrice) }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { computed } from 'vue';
  import { useRecordStore } from '@/stores/recordStore';

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
