<template>
  <article
    class="w-full h-full flex flex-col absolute top-0 left-0 overflow-hidden bg-black-base"
  >
    <RecordHeader />
    <div class="h-full overflow-x-hidden relative px-wrap-space">
      <RecordAccountSelect v-model="selectedAccountType" />
      <Transition name="fade">
        <RecordForm
          v-if="selectedAccountType === EnumAccountType.EXPENSE"
          :account-type="EnumAccountType.EXPENSE"
        />
        <RecordForm
          v-else-if="selectedAccountType === EnumAccountType.INCOME"
          :account-type="EnumAccountType.INCOME"
        />
      </Transition>
    </div>
  </article>
</template>

<script setup lang="ts">
  import { EnumAccountType } from '@/assets/enums/record';

  const selectedAccountType = ref<EnumAccountType>(EnumAccountType.EXPENSE);
</script>
