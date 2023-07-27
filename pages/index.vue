<template>
  <div class="w-full h-[1000px]">
    Home
    <TheButton class="mb-2">送出</TheButton>
    <InputText v-model="textValue" class="mb-2" />
    <InputNumber v-model.number="numberValue" class="mb-2" />
    <InputClearableText v-model="clearTextValue" class="mb-2" />
    <InputTextArea v-model="textAreaValue" class="mb-2" />
    <InputSelect v-model="selectValue" :options="options" class="mb-2" />
    <InputTagsController v-model="tags" class="mb-2" />
  </div>
</template>

<script setup lang="ts">
  import { IInputSelectOption } from '@/assets/interfaces/element';

  const textValue = ref<string>('');
  const numberValue = ref<number>(0);
  const clearTextValue = ref<string>('');
  const textAreaValue = ref<string>('');
  const selectValue = ref<string>('1');

  const options: IInputSelectOption[] = [
    {
      id: '1',
      name: 'a',
    },
    {
      id: '2',
      name: 'b',
    },
    {
      id: '3',
      name: 'c',
    },
  ];

  const tags = ref<string[]>([]);
</script>

<style lang="scss" scoped></style>
