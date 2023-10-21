<template>
  <article
    class="w-full h-full flex flex-col absolute top-0 left-0 z-search-section overflow-hidden bg-black-base"
  >
    <section class="w-full h-full flex flex-col">
      <div>
        <AreaSearchHeader />
        <div class="w-full px-wrap-space py-2">
          <InputSearch v-model.trim="inputValue" class="w-full mb-2" />
          <div v-if="contextCards.length" class="text-white text-right">
            Total:
            <span>{{ contextCards.length }}</span>
          </div>
        </div>
      </div>
      <div class="h-full overflow-x-hidden relative px-wrap-space">
        <ul v-if="contextCards.length">
          <li v-for="cardItem in contextCards" :key="cardItem.id" class="mb-3">
            <CardItem :data="cardItem" />
          </li>
        </ul>
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
