<template>
  <header
    class="h-header-height basis-header-height relative"
    :class="scrollValue > 0 ? 'bg-black-darkest' : 'bg-black-base'"
  >
    <div
      class="h-header-height flex justify-center items-center text-center px-header-height"
    >
      <h1 class="block text-lg font-bold truncate">{{ provideHeaderName }}</h1>
    </div>
    <button
      class="before-font-material before:content-['\e8b6'] w-header-height h-header-height flex justify-center items-center absolute top-0 right-0"
      title="Search"
      @click="handleOpenSearch"
    />
  </header>
</template>

<script setup lang="ts">
  import { storeToRefs } from 'pinia';
  import { useCommonStore } from '@/stores/commonStore';
  import { EnumHeaderName, EnumRouteName } from '@/assets/enums/index';

  const route = useRoute();
  const commonStore = useCommonStore();
  const { scrollValue } = storeToRefs(commonStore);

  const provideHeaderName = computed((): string => {
    switch (route.path) {
      case EnumRouteName.CALENDAR:
        return EnumHeaderName.CALENDAR;
      case EnumRouteName.OVERVIEW:
        return EnumHeaderName.OVERVIEW;
      case EnumRouteName.ANALYSIS:
        return EnumHeaderName.ANALYSIS;
      case EnumRouteName.SETTING:
        return EnumHeaderName.SETTING;
      default:
        return '';
    }
  });

  const handleOpenSearch = (): void => {
    commonStore.isShowSearch = true;
  };
</script>
