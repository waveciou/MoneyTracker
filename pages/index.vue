<template>
  <div class="w-full h-[1000px]">
    Home
    <TheButton class="mb-2">送出</TheButton>
    <InputText v-model="textValue" class="mb-2" />
  </div>
</template>

<script setup lang="ts">
  const textValue = ref<string>();
</script>

<style lang="scss" scoped></style>
