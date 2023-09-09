<template>
  <div class="w-full h-full flex flex-col">
    <RecordHeader @submit="handleSubmit" />
    <div class="h-full overflow-x-hidden relative px-wrap-space">
      <RecordForm
        :account-type="EnumAccountType.EXPENSE"
        :record-id="contextID"
        @update="handleUpdate"
      />
      <RecordForm
        :account-type="EnumAccountType.INCOME"
        :record-id="contextID"
        @update="handleUpdate"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { storeToRefs } from 'pinia';
  import { useRecordStore } from '@/stores/recordStore';
  import { EnumAccountType } from '@/assets/enums/record';
  import { IRecordForm } from '@/assets/interfaces/record';

  const recordStore = useRecordStore();
  const { contextID } = storeToRefs(recordStore);

  const handleUpdate = (_payload: IRecordForm): void => {};

  const handleSubmit = (): void => {
    recordStore.HANDLE_CLOSE();
  };
</script>
