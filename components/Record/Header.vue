<template>
  <header class="w-full h-header-height basis-header-height relative">
    <button
      class="before-font-material icon-cancel w-header-height h-header-height flex justify-center items-center absolute top-0 left-0"
      title="Close"
      @click="handleClose"
    />
    <div
      class="h-header-height flex justify-center items-center text-center px-header-height"
    >
      <h1 class="block text-lg truncate">{{ provideTitle }}</h1>
    </div>
    <button
      class="before-font-material icon-done w-header-height h-header-height flex justify-center items-center absolute top-0 right-0"
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

<style lang="scss" scoped>
  .icon-done::before {
    content: '\e876';
  }

  .icon-cancel::before {
    content: '\e5cd';
  }
</style>
