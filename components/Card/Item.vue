<template>
  <div>
    <CardContent :data="props.data" @click="isPopUpOpen = true" />
    <ThePopUp :is-open="isPopUpOpen" @close="isPopUpOpen = false">
      <div class="bg-black-base text-white">
        <div class="bg-yellow pb-8">
          <div class="mb-4 flex justify-end p-1 text-black-base">
            <button
              class="before-font-material ml-1 h-6 w-6 before:content-['\e3c9']"
              title="Edit"
              @click="handleEdit"
            />
            <button
              class="before-font-material ml-1 h-6 w-6 before:content-['\e872']"
              title="Delete"
              @click="isConfirmOpen = true"
            />
            <button
              class="before-font-material ml-1 h-6 w-6 before:content-['\e5cd']"
              title="Close"
              @click="isPopUpOpen = false"
            />
          </div>
          <TheIcon
            :category-id="props.data.category"
            class="m-auto flex h-24 w-24 items-center justify-center rounded-full bg-black-base text-yellow before:text-6xl"
          />
        </div>
        <CardPopUpDetail :data="props.data" />
      </div>
    </ThePopUp>
    <ThePopConfirm
      :is-open="isConfirmOpen"
      title="Are you sure to delete this record?"
      left-text="Delete"
      right-text="Cancel"
      @click-left-button="handleDelete"
      @click-right-button="isConfirmOpen = false"
    />
  </div>
</template>

<script setup lang="ts">
  import { useRecordStore } from '@/stores/recordStore';
  import type { IRecordForm } from '@/assets/types/record';

  const props = defineProps<{ data: IRecordForm }>();

  const recordStore = useRecordStore();

  const isPopUpOpen = ref<boolean>(false);
  const isConfirmOpen = ref<boolean>(false);

  const handleEdit = (): void => {
    recordStore.HANDLE_MODE_EDITOR(props.data.id);
    isPopUpOpen.value = false;
  };

  const handleDelete = (): void => {
    recordStore.DELETE_RECORD(props.data.id);
  };
</script>
