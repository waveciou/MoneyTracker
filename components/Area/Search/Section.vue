<template>
  <article
    class="absolute left-0 top-0 z-search-section flex h-full w-full flex-col overflow-hidden bg-black-base"
  >
    <section class="flex h-full w-full flex-col">
      <div>
        <AreaSearchHeader :style-dark="contentScrollValue > 0" />
        <div class="w-full px-wrap-space py-2">
          <InputSearch
            v-model.trim="inputValue"
            is-once-focus
            class="mb-2 w-full"
          />
          <AreaSearchDetail :cards="contextCards" />
        </div>
      </div>
      <div
        ref="contentRef"
        class="relative h-full overflow-x-hidden px-wrap-space"
        @scroll="handleScroll"
      >
        <CardList
          v-if="contextCards.length"
          class="py-3"
          :cards="contextCards"
        />
        <TheEmpty v-else />
      </div>
    </section>
  </article>
</template>

<script setup lang="ts">
  import { storeToRefs } from 'pinia';
  import { useRecordStore } from '@/stores/recordStore';
  import type { IRecordForm } from '@/assets/types/record';

  const recordStore = useRecordStore();
  const { storage } = storeToRefs(recordStore);

  const inputValue = ref<string>('');

  const contentRef = ref<HTMLDivElement>(null as unknown as HTMLDivElement);
  const contentScrollValue = ref<number>(0);

  const handleScroll = (): void => {
    const value: number = contentRef?.value?.scrollTop || 0;
    contentScrollValue.value = value;
  };

  const contextCards = computed((): IRecordForm[] => {
    if (inputValue.value === '') {
      return [];
    }
    return storage.value.filter(({ store, note, tags }) => {
      return (
        store.includes(inputValue.value) ||
        note.includes(inputValue.value) ||
        tags.includes(inputValue.value)
      );
    });
  });
</script>
