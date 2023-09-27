<template>
  <div>
    <div class="py-3 text-2xl text-white text-center truncate">
      Total
      <span class="ml-1" :class="providePriceClass">{{ providePrice }}</span>
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

    if (recordStore.totalPrice <= 0) {
      return price;
    } else {
      return `+${price}`;
    }
  });
</script>
