<template>
  <header
    class="w-full h-header-height basis-header-height bg-black-darkest relative"
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
  import { useCommonStore } from '@/stores/commonStore';

  const route = useRoute();
  const commonStore = useCommonStore();

  const provideHeaderName = computed((): string => {
    switch (route.path) {
      case '/':
        return '記帳日誌';
      case '/overview':
        return '帳戶總覽';
      case '/record':
        return '新增記帳';
      case '/analysis':
        return '項目分析';
      case '/setting':
        return '設定';
      default:
        return '';
    }
  });

  const handleOpenSearch = (): void => {
    commonStore.$patch((state) => {
      state.isShowSearch = true;
    });
  };
</script>

<style lang="scss" scoped>
  .icon-search::before {
    content: '\e8b6';
  }
</style>
