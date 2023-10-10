<template>
  <div class="w-full pb-5">
    <ClientOnly>
      <FormPrice v-model.number="contextForm.price" class="mb-4" />
      <FormCategoryExpense
        v-if="recordType === EnumRecordType.EXPENSE"
        v-model.trim="contextForm.category"
        class="mb-4"
      />
      <FormCategoryIncome
        v-if="recordType === EnumRecordType.INCOME"
        v-model.trim="contextForm.category"
        class="mb-4"
      />
      <FormStore v-model.trim="contextForm.store" class="mb-4" />
      <FormDatePicker
        :timestamp="contextForm.time"
        class="mb-4"
        @update="handleTimeUpdate"
      />
      <FormTime
        :timestamp="contextForm.time"
        class="mb-4"
        @update="handleTimeUpdate"
      />
      <FormNote v-model.trim="contextForm.note" class="mb-4" />
      <FormTags v-model.trim="contextForm.tags" class="mb-4" />
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
  import { watch } from 'vue';
  import { useRecordStore } from '@/stores/recordStore';
  import { IRecordForm } from '@/assets/interfaces/record';
  import { EnumRecordType } from '@/assets/enums/record';

  const recordStore = useRecordStore();

  // 1. Get Record Type & Record ID from Props.

  const props = withDefaults(
    defineProps<{ recordType: EnumRecordType; recordId?: string }>(),
    { recordType: EnumRecordType.EXPENSE, recordId: '' }
  );

  const emits = defineEmits<{ (e: 'update', value: IRecordForm): void }>();

  // 2. Validate this record data was save in Pinia and get record form.

  const currentForm: IRecordForm | undefined = (() => {
    if (props.recordType === EnumRecordType.EXPENSE) {
      return recordStore.expenseRecords.find(({ id }) => id === props.recordId);
    } else {
      return recordStore.incomeRecords.find(({ id }) => id === props.recordId);
    }
  })();

  // 3. Validate the data types and setting this form.

  const contextForm = ref<IRecordForm>(
    useRecordForm(props.recordType, currentForm)
  );

  // Function

  const handleTimeUpdate = (payload: number): void => {
    contextForm.value.time = payload;
  };

  watch(
    () => contextForm.value,
    (value) => {
      emits('update', value);
    },
    { immediate: true, deep: true }
  );
</script>
