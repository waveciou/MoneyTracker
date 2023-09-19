<template>
  <div>
    <CardContent :data="props.data" @click="isPopUpOpen = true" />
    <ThePopUp :is-open="isPopUpOpen" @close="isPopUpOpen = false">
      <div class="text-white bg-black-base">
        <div class="h-[150px] bg-yellow">
          <div class="p-1 flex justify-end text-black-base">
            <button
              class="w-6 h-6 ml-1 before-font-material before:content-['\e3c9']"
              @click="handleEdit"
            />
            <button
              class="w-6 h-6 ml-1 before-font-material before:content-['\e872']"
              @click="isConfirmOpen = true"
            />
            <button
              class="w-6 h-6 ml-1 before-font-material before:content-['\e5cd']"
              @click="isPopUpOpen = false"
            />
          </div>
        </div>
        <CardDetail :data="props.data" />
      </div>
    </ThePopUp>
    <ThePopUp :is-open="isConfirmOpen">
      <div
        class="w-4/5 m-auto bg-black-base text-white rounded-md overflow-hidden"
      >
        <div class="px-2 py-3 text-center">
          Are you sure to delete this record?
        </div>
        <div class="flex border-t border-black-base border-solid">
          <button class="w-6/12 p-2" @click="handleDelete">Delete</button>
          <button class="w-6/12 p-2" @click="isConfirmOpen = false">
            Cancel
          </button>
        </div>
      </div>
    </ThePopUp>
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
