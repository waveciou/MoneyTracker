<template>
  <div>
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
</template>

<script setup lang="ts">
  import { EnumAccountType } from '@/assets/enums/record';

  const selectedAccountType = ref<EnumAccountType>(EnumAccountType.EXPENSE);
</script>

<style scoped></style>
