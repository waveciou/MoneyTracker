<template>
  <div class="w-full">
    <FormPrice v-model.number="formPrice" class="mb-4" />
    <FormName v-model.trim="formName" class="mb-4" />
    <FormStore v-model.trim="formStore" class="mb-4" />
    <FormNote v-model.trim="formNote" class="mb-4" />
  </div>
</template>

<script setup lang="ts">
  const formPrice = ref<number>(123);
  const formName = ref<string>('');
  const formStore = ref<string>('');
  const formNote = ref<string>('');
</script>

<style lang="scss" scoped></style>
