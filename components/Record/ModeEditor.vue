<template>
  <div class="w-full h-full flex flex-col">
    <RecordHeader @submit="handleSubmit" />
    <div class="h-full overflow-x-hidden relative px-wrap-space">
      <RecordForm
        v-if="selectedAccountType === EnumAccountType.EXPENSE"
        :account-type="EnumAccountType.EXPENSE"
        :record-id="contextID"
        @update="handleUpdate"
      />
      <RecordForm
        v-else-if="selectedAccountType === EnumAccountType.INCOME"
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
  import { useGetAccountType } from '@/composables/useGetAccountType';

  const recordStore = useRecordStore();
  const { contextID } = storeToRefs(recordStore);

  const selectedAccountType = ref<EnumAccountType | null>(
    useGetAccountType(contextID.value)
  );
  const selectedForm = ref<IRecordForm>(useRecordForm(EnumAccountType.EXPENSE));

  const handleUpdate = (payload: IRecordForm): void => {
    Object.assign(selectedForm.value, payload);
  };

  const handleSubmit = (): void => {
    recordStore.HANDLE_CLOSE();
  };
</script>
