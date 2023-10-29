<template>
  <article
    class="w-full h-full flex flex-col absolute top-0 left-0 z-search-section overflow-hidden bg-black-base"
  >
    <section class="w-full h-full flex flex-col">
      <div>
        <AreaSearchHeader :style-dark="contentScrollValue > 0" />
        <div class="w-full px-wrap-space py-2">
          <InputSearch
            v-model.trim="inputValue"
            is-once-focus
            class="w-full mb-2"
          />
          <AreaSearchDetail :cards="contextCards" />
        </div>
      </div>
      <div
        ref="contentRef"
        class="h-full overflow-x-hidden relative px-wrap-space"
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
  import { computed } from 'vue';
  import { storeToRefs } from 'pinia';
  import { useRecordStore } from '@/stores/recordStore';
  import { IRecordForm } from '@/assets/interfaces/record';

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
