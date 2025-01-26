<template>
  <section class="flex h-full w-full flex-col">
    <AreaRecordHeader
      :style-dark="contentScrollValue > 0"
      @submit="handleSubmit"
    />
    <div
      v-if="contextID"
      ref="contentRef"
      class="relative h-full overflow-x-hidden px-wrap-space"
      @scroll="handleScroll"
    >
      <AreaRecordForm
        v-if="selectedRecordType === EnumRecordType.EXPENSE"
        :record-type="EnumRecordType.EXPENSE"
        :record-id="contextID"
        @update="handleUpdate"
      />
      <AreaRecordForm
        v-else-if="selectedRecordType === EnumRecordType.INCOME"
        :record-type="EnumRecordType.INCOME"
        :record-id="contextID"
        @update="handleUpdate"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
  import { storeToRefs } from 'pinia';
  import { useRecordStore } from '@/stores/recordStore';
  import { EnumRecordType } from '@/assets/types/record';
  import type { IRecordForm } from '@/assets/types/record';

  const recordStore = useRecordStore();
  const { contextID } = storeToRefs(recordStore);

  const selectedRecordType = ref<EnumRecordType | null>(
    recordStore.contextRecordType
  );

  const selectedForm = ref<IRecordForm>(useRecordForm(EnumRecordType.EXPENSE));

  const contentRef = ref<HTMLDivElement>(null as unknown as HTMLDivElement);
  const contentScrollValue = ref<number>(0);

  const handleScroll = (): void => {
    const value: number = contentRef?.value?.scrollTop || 0;
    contentScrollValue.value = value;
  };

  const handleUpdate = (payload: IRecordForm): void => {
    Object.assign(selectedForm.value, payload);
  };

  const handleSubmit = (): void => {
    recordStore.ADD_RECORD(selectedForm.value);
    recordStore.HANDLE_CLOSE();
  };
</script>
