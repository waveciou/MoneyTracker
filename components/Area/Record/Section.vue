<template>
  <article
    class="w-full h-full absolute top-0 left-0 z-rescord-section overflow-hidden bg-black-base"
  >
    <AreaRecordModeCreator v-if="contextMode === EnumRecordMode.CREATOR" />
    <AreaRecordModeEditor v-else-if="contextMode === EnumRecordMode.EDITOR" />
  </article>
</template>

<script setup lang="ts">
  import { storeToRefs } from 'pinia';
  import { useRecordStore } from '@/stores/recordStore';
  import { EnumRecordMode } from '@/assets/enums/record';

  const recordStore = useRecordStore();
  const { contextMode } = storeToRefs(recordStore);
</script>
