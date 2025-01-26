<template>
  <article
    class="absolute left-0 top-0 z-rescord-section h-full w-full overflow-hidden bg-black-base"
  >
    <AreaRecordModeCreator v-if="contextMode === EnumRecordMode.CREATOR" />
    <AreaRecordModeEditor v-else-if="contextMode === EnumRecordMode.EDITOR" />
  </article>
</template>

<script setup lang="ts">
  import { storeToRefs } from 'pinia';
  import { useRecordStore } from '@/stores/recordStore';
  import { EnumRecordMode } from '@/assets/types/record';

  const recordStore = useRecordStore();
  const { contextMode } = storeToRefs(recordStore);
</script>
