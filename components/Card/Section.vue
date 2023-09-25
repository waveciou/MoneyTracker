<template>
  <div>
    <CardContent :data="props.data" @click="isPopUpOpen = true" />
    <ThePopUp :is-open="isPopUpOpen" @close="isPopUpOpen = false">
      <div class="text-white bg-black-base">
        <div class="pb-6 bg-yellow">
          <div class="p-1 flex justify-end text-black-base">
            <button
              class="w-6 h-6 ml-1 before-font-material before:content-['\e3c9']"
              title="Edit"
              @click="handleEdit"
            />
            <button
              class="w-6 h-6 ml-1 before-font-material before:content-['\e872']"
              title="Delete"
              @click="isConfirmOpen = true"
            />
            <button
              class="w-6 h-6 ml-1 before-font-material before:content-['\e5cd']"
              title="Close"
              @click="isPopUpOpen = false"
            />
          </div>
          <TheIcon
            :category-id="props.data.category"
            class="w-24 h-24 rounded-full m-auto flex justify-center items-center bg-black-base text-yellow before:text-6xl"
          />
        </div>
        <CardDetail :data="props.data" />
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
  import { IRecordForm } from '@/assets/interfaces/record';

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
