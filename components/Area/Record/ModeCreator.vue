<template>
  <section class="flex h-full w-full flex-col">
    <AreaRecordHeader
      :style-dark="contentScrollValue > 0"
      @submit="handleSubmit"
    />
    <div
      ref="contentRef"
      class="relative h-full overflow-x-hidden px-wrap-space"
      @scroll="handleScroll"
    >
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
  import { EnumRecordType } from '@/assets/types/record';
  import type { IRecordForm } from '@/assets/types/record';

  const router = useRouter();
  const recordStore = useRecordStore();

  const selectedRecordType = ref<EnumRecordType>(EnumRecordType.EXPENSE);
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
    router.push('/');
  };
</script>
