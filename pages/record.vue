<template>
  <div>
    <div class="flex items-center mb-4">
      <button
        class="w-full flex-1 mr-[0.3125rem] py-1.5 px-2.5 block border border-solid rounded text-base truncate"
        :class="
          isShowTabExpense
            ? 'bg-yellow border-yellow text-black-darker'
            : 'bg-black-base border-white text-white'
        "
        @click="handleClickTab(EnumRecordType.EXPENSE)"
      >
        EXPENSE
      </button>
      <button
        class="w-full flex-1 ml-[0.3125rem] py-1.5 px-2.5 block border border-solid rounded text-base truncate"
        :class="
          !isShowTabExpense
            ? 'bg-yellow border-yellow text-black-darker'
            : 'bg-black-base border-white text-white'
        "
        @click="handleClickTab(EnumRecordType.INCOME)"
      >
        INCOME
      </button>
    </div>
    <Transition name="fade">
      <TheRecordForm
        v-if="isShowTabExpense"
        :record-type="EnumRecordType.EXPENSE"
      />
      <TheRecordForm v-else :record-type="EnumRecordType.INCOME" />
    </Transition>
  </div>
</template>

<script setup lang="ts">
  import { EnumRecordType } from '@/assets/enums/record';

  const isShowTabExpense = ref<boolean>(true);

  const handleClickTab = (recordType: EnumRecordType): void => {
    if (recordType === EnumRecordType.EXPENSE) {
      isShowTabExpense.value = true;
    } else {
      isShowTabExpense.value = false;
    }
  };
</script>

<style lang="scss" scoped></style>
