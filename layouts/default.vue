<template>
  <main class="w-full h-full relative overflow-hidden">
    <article class="w-full h-full flex flex-col relative overflow-hidden">
      <TheHeader />
      <div
        id="content"
        class="w-full h-full overflow-x-hidden relative"
        :class="isShowSearch ? 'overflow-y-hidden' : 'overflow-y-auto'"
      >
        <slot />
      </div>
      <TheMenu />
    </article>
    <SearchSection v-if="isShowSearch" />
  </main>
</template>

<script setup lang="ts">
  import { storeToRefs } from 'pinia';
  import { useCommonStore } from '@/stores/commonStore';

  const commonStore = useCommonStore();
  const { isShowSearch } = storeToRefs(commonStore);
</script>

<style lang="scss" scoped>
  @import url('~/assets/scss/utils/_utils.scss');

  #content {
    -webkit-overflow-scrolling: touch;
    -o-overflow-scrolling: touch;
  }
</style>
