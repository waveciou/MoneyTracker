<template>
  <div class="w-full">
    <div>Record</div>
    <FormPrice v-model.number="price" />
    {{ price }}
  </div>
</template>

<script setup lang="ts">
  const price = ref<number>(123);
</script>

<style lang="scss" scoped></style>
