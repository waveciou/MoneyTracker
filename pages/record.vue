<template>
  <div class="w-full">
    <FormPrice v-model.number="formPrice" class="mb-4" />
    <FormStore v-model.trim="formStore" class="mb-4" />
    <FormNote v-model.trim="formNote" class="mb-4" />
    <FormTags v-model.trim="formTags" class="mb-4" />
    <FormTime :timestamp="formContextTime" class="mb-4" />
  </div>
</template>

<script setup lang="ts">
  const dayjs = useDayjs();
  const formPrice = ref<number>(123);
  const formStore = ref<string>('');
  const formNote = ref<string>('');
  const formTags = ref<string[]>(['安安']);
  const formContextTime = ref<number>(dayjs().valueOf());
</script>

<style lang="scss" scoped></style>
