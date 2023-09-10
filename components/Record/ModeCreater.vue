<template>
  <div class="w-full h-full flex flex-col">
    <RecordHeader @submit="handleSubmit" />
    <div class="h-full overflow-x-hidden relative px-wrap-space">
      <RecordTypeSelector v-model="selectedRecordType" />
      <Transition name="fade">
        <RecordForm
          v-if="selectedRecordType === EnumRecordType.EXPENSE"
          :record-type="EnumRecordType.EXPENSE"
          @update="handleUpdate"
        />
        <RecordForm
          v-else-if="selectedRecordType === EnumRecordType.INCOME"
          :record-type="EnumRecordType.INCOME"
          @update="handleUpdate"
        />
      </Transition>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useRecordStore } from '@/stores/recordStore';
  import { EnumRecordType } from '@/assets/enums/record';
  import { IRecordForm } from '@/assets/interfaces/record';

  const router = useRouter();
  const recordStore = useRecordStore();

  const selectedRecordType = ref<EnumRecordType>(EnumRecordType.EXPENSE);
  const selectedForm = ref<IRecordForm>(useRecordForm(EnumRecordType.EXPENSE));

  const handleUpdate = (payload: IRecordForm): void => {
    Object.assign(selectedForm.value, payload);
  };

  const handleSubmit = (): void => {
    recordStore.ADD_RECORD(selectedForm.value);
    recordStore.HANDLE_CLOSE();
    router.push('/');
  };
</script>
