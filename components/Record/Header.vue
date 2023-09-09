<template>
  <header class="w-full h-header-height basis-header-height relative">
    <button
      class="before-font-material icon-cancel w-header-height h-header-height flex justify-center items-center absolute top-0 left-0"
      @click="handleClose"
    />
    <div
      class="h-header-height flex justify-center items-center text-center px-header-height"
    >
      <h1 class="block text-lg truncate">Create Record</h1>
    </div>
    <button
      class="before-font-material icon-done w-header-height h-header-height flex justify-center items-center absolute top-0 right-0"
      @click="handleSubmit"
    />
  </header>
</template>

<script setup lang="ts">
  import { useRecordStore } from '@/stores/recordStore';

  const emits = defineEmits<{ (e: 'submit'): void }>();

  const recordStore = useRecordStore();

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
