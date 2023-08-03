<template>
  <div class="w-full">
    <div>Record</div>
    <FormPrice v-model.number="price" class="mb-4" />
    <FormName v-model.trim="name" class="mb-4" />
  </div>
</template>

<script setup lang="ts">
  const price = ref<number>(123);
  const name = ref<string>('');
</script>

<style lang="scss" scoped></style>
