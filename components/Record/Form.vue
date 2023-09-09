<template>
  <div class="w-full">
    <client-only>
      <FormPrice v-model.number="contextForm.price" class="mb-4" />
      <FormCategoryExpense
        v-if="accountType === EnumAccountType.EXPENSE"
        v-model.trim="contextForm.category"
        class="mb-4"
      />
      <FormCategoryIncome
        v-if="accountType === EnumAccountType.INCOME"
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
    </client-only>
  </div>
</template>

<script setup lang="ts">
  import { storeToRefs } from 'pinia';
  import { useRecordStore } from '@/stores/recordStore';
  import { IRecordForm } from '@/assets/interfaces/record';
  import { EnumAccountType } from '@/assets/enums/record';

  const recordStore = useRecordStore();
  const { income, expense } = storeToRefs(recordStore);

  // 1. Get Record ID from Props

  const props = withDefaults(
    defineProps<{ accountType: EnumAccountType; recordId?: string }>(),
    { accountType: EnumAccountType.EXPENSE, recordId: '' }
  );

  // 2. Validate this record data was save in Pinia and get record form.

  const currentForm: IRecordForm | undefined = (() => {
    if (props.accountType === EnumAccountType.EXPENSE) {
      return expense.value.find(({ id }) => id === props.recordId);
    } else {
      return income.value.find(({ id }) => id === props.recordId);
    }
  })();

  // 3. Validate the data types and setting the form.

  const contextForm = reactive<IRecordForm>(
    useRecordForm(props.accountType, currentForm)
  );

  // Function

  const handleTimeUpdate = (payload: number): void => {
    contextForm.time = payload;
  };
</script>
