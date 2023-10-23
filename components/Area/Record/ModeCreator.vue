<template>
  <section class="w-full h-full flex flex-col">
    <AreaRecordHeader @submit="handleSubmit" />
    <div class="h-full overflow-x-hidden relative px-wrap-space">
      <AreaRecordTypeSelector v-model="selectedRecordType" />
      <Transition name="fade">
        <AreaRecordForm
          v-if="selectedRecordType === EnumRecordType.EXPENSE"
          :record-type="EnumRecordType.EXPENSE"
          @update="handleUpdate"
        />
        <AreaRecordForm
          v-else-if="selectedRecordType === EnumRecordType.INCOME"
          :record-type="EnumRecordType.INCOME"
          @update="handleUpdate"
        />
      </Transition>
    </div>
  </section>
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
