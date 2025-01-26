<template>
  <main class="relative h-full w-full overflow-hidden">
    <article class="relative flex h-full w-full flex-col overflow-hidden">
      <HeaderSection />
      <div
        id="content"
        ref="contentRef"
        class="relative h-full overflow-x-hidden px-wrap-space"
        :class="isFixContent ? 'overflow-y-hidden' : 'overflow-y-auto'"
        @scroll="handleScroll"
      >
        <slot />
      </div>
      <MenuSection />
    </article>
    <Transition name="fade">
      <AreaSearchSection v-if="isShowSearch" class="fade-animation" />
    </Transition>
    <Transition name="fade">
      <AreaRecordSection v-if="isShowRecord" class="fade-animation" />
    </Transition>
  </main>
</template>

<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<script setup lang="ts">
  import { storeToRefs } from 'pinia';
  import { useCommonStore } from '@/stores/commonStore';
  import { useRecordStore } from '@/stores/recordStore';

  const route = useRoute();
  const commonStore = useCommonStore();
  const recordStore = useRecordStore();
  const { isShowSearch } = storeToRefs(commonStore);
  const { isShowRecord } = storeToRefs(recordStore);

  const contentRef = ref<HTMLDivElement>(null as unknown as HTMLDivElement);

  const handleScroll = (): void => {
    const value: number = contentRef?.value?.scrollTop || 0;
    commonStore.scrollValue = value;
  };

  // Init IndexedDB
  const indexedDB = useIndexedDB();

  const isFixContent = computed(
    (): boolean => !!(isShowSearch.value || isShowRecord.value)
  );

  watch(
    () => route.path,
    () => {
      nextTick(() => {
        if (contentRef) {
          contentRef?.value?.scrollTo(0, 0);
        }
        handleScroll();
      });
    },
    { immediate: true, deep: true }
  );
</script>

<style lang="scss" scoped>
  #content {
    -webkit-overflow-scrolling: touch;
    -o-overflow-scrolling: touch;
  }
</style>
