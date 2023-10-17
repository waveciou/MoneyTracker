<template>
  <header class="w-full h-header-height basis-header-height relative">
    <button
      class="before-font-material before:content-['\e5cd'] w-header-height h-header-height flex justify-center items-center absolute top-0 left-0"
      title="Close"
      @click="handleClose"
    />
    <div
      class="h-header-height flex justify-center items-center text-center px-header-height"
    >
      <h2 class="block text-lg truncate">{{ provideTitle }}</h2>
    </div>
    <button
      class="before-font-material before:content-['\e876'] w-header-height h-header-height flex justify-center items-center absolute top-0 right-0"
      title="Submit"
      @click="handleSubmit"
    />
  </header>
</template>

<script setup lang="ts">
  import { computed } from 'vue';
  import { storeToRefs } from 'pinia';
  import { useRecordStore } from '@/stores/recordStore';
  import { EnumRecordMode } from '@/assets/enums/record';

  const emits = defineEmits<{ (e: 'submit'): void }>();

  const recordStore = useRecordStore();
  const { contextMode } = storeToRefs(recordStore);

  const provideTitle = computed((): string => {
    if (contextMode.value === EnumRecordMode.CREATOR) {
      return 'New Record';
    } else if (contextMode.value === EnumRecordMode.EDITOR) {
      return 'Edit Record';
    } else {
      return '';
    }
  });

  const handleClose = (): void => {
    recordStore.HANDLE_CLOSE();
  };

  const handleSubmit = (): void => {
    emits('submit');
  };
</script>
