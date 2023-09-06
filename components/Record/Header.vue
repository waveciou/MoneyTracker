<template>
  <header class="w-full h-header-height basis-header-height relative">
    <div
      class="h-header-height flex justify-center items-center text-center px-header-height"
    >
      <h1 class="block text-lg truncate">Create Record</h1>
    </div>
    <button
      class="before-font-material icon-cancel w-header-height h-header-height flex justify-center items-center absolute top-0 right-0"
      @click="handleClose"
    />
  </header>
</template>

<script setup lang="ts">
  import { useRecordStore } from '@/stores/recordStore';
  const recordStore = useRecordStore();

  const handleClose = (): void => {
    recordStore.isShowRecord = false;
  };
</script>

<style lang="scss" scoped>
  .icon-cancel::before {
    content: '\e5cd';
  }
</style>
