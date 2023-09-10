<template>
  <div class="w-full h-full flex flex-col">
    <RecordHeader @submit="handleSubmit" />
    <div class="h-full overflow-x-hidden relative px-wrap-space">
      <RecordForm
        v-if="selectedRecordType === EnumRecordType.EXPENSE"
        :record-type="EnumRecordType.EXPENSE"
        :record-id="contextID"
        @update="handleUpdate"
      />
      <RecordForm
        v-else-if="selectedRecordType === EnumRecordType.INCOME"
        :record-type="EnumRecordType.INCOME"
        :record-id="contextID"
        @update="handleUpdate"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { storeToRefs } from 'pinia';
  import { useRecordStore } from '@/stores/recordStore';
  import { EnumRecordType } from '@/assets/enums/record';
  import { IRecordForm } from '@/assets/interfaces/record';

  const recordStore = useRecordStore();
  const { contextID } = storeToRefs(recordStore);

  const selectedRecordType = ref<EnumRecordType | null>(
    recordStore.contextRecordType
  );

  const selectedForm = ref<IRecordForm>(useRecordForm(EnumRecordType.EXPENSE));

  const handleUpdate = (payload: IRecordForm): void => {
    Object.assign(selectedForm.value, payload);
  };

  const handleSubmit = (): void => {
    recordStore.ADD_RECORD(selectedForm.value);
    recordStore.HANDLE_CLOSE();
  };
</script>
