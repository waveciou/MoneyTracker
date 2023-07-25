<template>
  <div class="w-full h-[1000px]">
    Home
    <TheButton class="mb-2">送出</TheButton>
    <InputText v-model="textValue" class="mb-2" />
    <InputNumber v-model.number="numberValue" class="mb-2" />
    <InputClearText v-model="clearTextValue" class="mb-2" />
    <InputTextArea v-model="textAreaValue" class="mb-2" />
  </div>
</template>

<script setup lang="ts">
  const textValue = ref<string>('');
  const numberValue = ref<number>(0);
  const clearTextValue = ref<string>('');
  const textAreaValue = ref<string>('');
</script>

<style lang="scss" scoped></style>
