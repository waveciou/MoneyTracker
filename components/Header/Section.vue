<template>
  <header
    class="w-full h-header-height basis-header-height relative"
    :class="scrollValue > 0 ? 'bg-black-darkest' : 'bg-black-base'"
  >
    <div
      class="w-full h-header-height flex justify-center items-center text-center px-header-height"
    >
      <h1 class="block text-lg truncate">{{ provideHeaderName }}</h1>
    </div>
    <button
      class="before-font-material icon-search w-header-height h-header-height flex justify-center items-center absolute top-0 right-0"
      @click="handleOpenSearch"
    />
  </header>
</template>

<script setup lang="ts">
  import { storeToRefs } from 'pinia';
  import { useCommonStore } from '@/stores/commonStore';

  const route = useRoute();
  const commonStore = useCommonStore();
  const { scrollValue } = storeToRefs(commonStore);

  const provideHeaderName = computed((): string => {
    switch (route.path) {
      case '/':
        return 'Calendar';
      case '/overview':
        return 'Overview';
      case '/record':
        return 'Create Record';
      case '/analysis':
        return 'Analysis';
      case '/setting':
        return 'Setting';
      default:
        return '';
    }
  });

  const handleOpenSearch = (): void => {
    commonStore.isShowSearch = true;
  };
</script>

<style lang="scss" scoped>
  .icon-search::before {
    content: '\e8b6';
  }
</style>
