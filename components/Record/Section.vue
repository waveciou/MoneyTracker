<template>
  <article
    class="w-full h-full absolute top-0 left-0 overflow-hidden bg-black-base"
  >
    <RecordModeCreater v-if="contextMode === EnumRecordMode.CREATER" />
    <RecordModeEditor v-else-if="contextMode === EnumRecordMode.EDITOR" />
  </article>
</template>

<script setup lang="ts">
  import { storeToRefs } from 'pinia';
  import { useRecordStore } from '@/stores/recordStore';
  import { EnumRecordMode } from '@/assets/enums/record';

  const recordStore = useRecordStore();
  const { contextMode } = storeToRefs(recordStore);
</script>
