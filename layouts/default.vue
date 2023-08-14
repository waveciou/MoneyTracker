<template>
  <main class="w-full h-full relative overflow-hidden">
    <article class="w-full h-full flex flex-col relative overflow-hidden">
      <HeaderSection />
      <div
        id="content"
        ref="contentRef"
        class="w-full h-full overflow-x-hidden relative px-wrap-space"
        :class="isShowSearch ? 'overflow-y-hidden' : 'overflow-y-auto'"
        @scroll="handleScroll"
      >
        <slot />
      </div>
      <MenuSection />
    </article>
    <Transition name="fade">
      <SearchSection v-if="isShowSearch" class="fade-animation" />
    </Transition>
  </main>
</template>

<script setup lang="ts">
  import { storeToRefs } from 'pinia';
  import { useCommonStore } from '@/stores/commonStore';
  import { useSetCategories } from '@/composables/useSetCategories';

  const route = useRoute();
  const commonStore = useCommonStore();
  const { isShowSearch } = storeToRefs(commonStore);

  const contentRef = ref<HTMLDivElement>(null as unknown as HTMLDivElement);

  useSetCategories();

  const handleScroll = (): void => {
    const value: number = contentRef?.value?.scrollTop || 0;
    commonStore.scrollValue = value;
  };

  watch(
    () => route.path,
    () => {
      nextTick(() => {
        handleScroll();
      });
    },
    { immediate: true, deep: true }
  );
</script>

<style lang="scss" scoped>
  @import url('~/assets/scss/utils/_utils.scss');

  #content {
    -webkit-overflow-scrolling: touch;
    -o-overflow-scrolling: touch;
  }
</style>
