<template>
  <div class="w-full h-full flex flex-col">
    <RecordHeader @submit="handleSubmit" />
    <div class="h-full overflow-x-hidden relative px-wrap-space">
      <RecordAccountSelect v-model="selectedAccountType" />
      <Transition name="fade">
        <RecordForm
          v-if="selectedAccountType === EnumAccountType.EXPENSE"
          :account-type="EnumAccountType.EXPENSE"
          @update="handleUpdate"
        />
        <RecordForm
          v-else-if="selectedAccountType === EnumAccountType.INCOME"
          :account-type="EnumAccountType.INCOME"
          @update="handleUpdate"
        />
      </Transition>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useRecordStore } from '@/stores/recordStore';
  import { EnumAccountType } from '@/assets/enums/record';
  import { IRecordForm } from '@/assets/interfaces/record';

  const router = useRouter();
  const recordStore = useRecordStore();

  const selectedAccountType = ref<EnumAccountType>(EnumAccountType.EXPENSE);
  const selectedForm = ref<IRecordForm>(useRecordForm(EnumAccountType.EXPENSE));

  const handleUpdate = (payload: IRecordForm): void => {
    Object.assign(selectedForm.value, payload);
  };

  const handleSubmit = (): void => {
    recordStore.ADD_RECORD(selectedForm.value);
    recordStore.HANDLE_CLOSE();
    router.push('/');
  };
</script>
