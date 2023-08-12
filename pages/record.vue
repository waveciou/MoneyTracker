<template>
  <TheRecordForm :record-type="recordTypeRef" />
</template>

<script setup lang="ts">
  import { EnumRecordType } from '@/assets/enums/record';
  const recordTypeRef = ref<EnumRecordType>(EnumRecordType.EXPENSE);
</script>

<style lang="scss" scoped></style>
