<template>
  <article
    class="w-full h-full flex flex-col absolute top-0 left-0 overflow-hidden bg-black-base"
  >
    <div class="h-full overflow-x-hidden relative px-wrap-space">
      <div class="flex items-center mb-4">
        <button
          class="w-full flex-1 mr-[0.3125rem] py-1.5 px-2.5 block border border-solid rounded text-base truncate"
          :class="
            isShowTabExpense
              ? 'bg-yellow border-yellow text-black-darker'
              : 'bg-black-base border-white text-white'
          "
          title="Expense"
          @click="handleClickTab(EnumAccountType.EXPENSE)"
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
          title="Income"
          @click="handleClickTab(EnumAccountType.INCOME)"
        >
          INCOME
        </button>
      </div>
      <Transition name="fade">
        <TheRecordForm
          v-if="isShowTabExpense"
          :account-type="EnumAccountType.EXPENSE"
        />
        <TheRecordForm v-else :account-type="EnumAccountType.INCOME" />
      </Transition>
    </div>
  </article>
</template>

<script setup lang="ts">
  import { EnumAccountType } from '@/assets/enums/record';

  const isShowTabExpense = ref<boolean>(true);

  const handleClickTab = (accountType: EnumAccountType): void => {
    const result: boolean = accountType === EnumAccountType.EXPENSE;
    isShowTabExpense.value = result;
  };
</script>
