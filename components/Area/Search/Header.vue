<template>
  <header class="w-full h-header-height basis-header-height relative">
    <div
      class="h-header-height flex justify-center items-center text-center px-header-height"
    >
      <h1 class="block text-lg truncate">Search</h1>
    </div>
    <button
      class="before-font-material before:content-['\e5cd'] w-header-height h-header-height flex justify-center items-center absolute top-0 right-0"
      title="Close"
      @click="handleClose"
    />
  </header>
</template>

<script setup lang="ts">
  import { useCommonStore } from '@/stores/commonStore';
  const commonStore = useCommonStore();

  const handleClose = (): void => {
    commonStore.isShowSearch = false;
  };
</script>
