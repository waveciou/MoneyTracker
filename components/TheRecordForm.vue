<template>
  <div class="w-full">
    <FormPrice v-model.number="contextForm.price" class="mb-4" />
    <FormStore v-model.trim="contextForm.store" class="mb-4" />
    <FormTime :timestamp="contextForm.time" class="mb-4" />
    <FormNote v-model.trim="contextForm.note" class="mb-4" />
    <FormTags v-model.trim="contextForm.tags" class="mb-4" />
    <div class="flex items-center mb-4">
      <TheButton class="w-full flex-1 mr-[0.3125rem]">重置</TheButton>
      <TheButton class="w-full flex-1 ml-[0.3125rem]">送出</TheButton>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { storeToRefs } from 'pinia';
  import { useRecordStore } from '@/stores/recordStore';
  import { IRecordForm } from '@/assets/interfaces/record';
  import { EnumRecordType } from '@/assets/enums/record';

  const recordStore = useRecordStore();
  const { income, expense } = storeToRefs(recordStore);

  // 1. Get Record ID from Props

  const props = withDefaults(
    defineProps<{ recordType: EnumRecordType; recordId?: string }>(),
    {
      recordId: '',
    }
  );

  // 2. Validate this record data was save in Pinia and get record form.

  const currentForm: IRecordForm | undefined = (() => {
    if (props.recordType === EnumRecordType.EXPENSE) {
      return expense.value.find(({ id }) => id === props.recordId);
    } else {
      return income.value.find(({ id }) => id === props.recordId);
    }
  })();

  // 3. Validate the data types and setting the form.

  const contextForm = reactive<IRecordForm>(useRecordForm(currentForm));
</script>

<style scoped></style>
