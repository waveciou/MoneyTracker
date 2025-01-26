<template>
  <header
    class="relative h-header-height w-full basis-header-height"
    :class="props.styleDark && 'bg-black-darkest'"
  >
    <div
      class="flex h-header-height items-center justify-center px-header-height text-center"
    >
      <h1 class="block truncate text-lg font-bold">Search</h1>
    </div>
    <button
      class="before-font-material absolute right-0 top-0 flex h-header-height w-header-height items-center justify-center before:content-['\e5cd']"
      title="Close"
      @click="handleClose"
    />
  </header>
</template>

<script setup lang="ts">
  import { useCommonStore } from '@/stores/commonStore';

  const props = withDefaults(defineProps<{ styleDark?: boolean }>(), {
    styleDark: false,
  });

  const commonStore = useCommonStore();

  const handleClose = (): void => {
    commonStore.isShowSearch = false;
  };
</script>
