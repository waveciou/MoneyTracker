<template>
  <header
    class="relative h-header-height basis-header-height"
    :class="scrollValue > 0 ? 'bg-black-darkest' : 'bg-black-base'"
  >
    <div
      class="flex h-header-height items-center justify-center px-header-height text-center"
    >
      <h1 class="block truncate text-lg font-bold">{{ provideHeaderName }}</h1>
    </div>
    <button
      class="before-font-material absolute right-0 top-0 flex h-header-height w-header-height items-center justify-center before:content-['\e8b6']"
      title="Search"
      @click="handleOpenSearch"
    />
  </header>
</template>

<script setup lang="ts">
  import { storeToRefs } from 'pinia';
  import { useCommonStore } from '@/stores/commonStore';
  import { EnumHeaderName, EnumRouteName } from '~/assets/types/index';

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
