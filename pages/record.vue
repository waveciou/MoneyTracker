<template>
  <div class="w-full">
    <FormPrice v-model.number="formPrice" class="mb-4" />
    <FormStore v-model.trim="formStore" class="mb-4" />
    <FormNote v-model.trim="formNote" class="mb-4" />
    <FormTags v-model.trim="formTags" class="mb-4" />
    <FormTime :time="formTime" class="mb-4" />
    {{ formTime }}
  </div>
</template>

<script setup lang="ts">
  import { computed } from 'vue';
  import { IFormTimeValue } from '@/assets/interfaces/form';

  const dayjs = useDayjs();
  const contextTime = dayjs().valueOf();

  const formPrice = ref<number>(123);
  const formStore = ref<string>('');
  const formNote = ref<string>('');
  const formTags = ref<string[]>(['安安']);
  const formContextTime = ref<number>(contextTime);

  const formTime = computed((): IFormTimeValue => {
    const result = {
      hour: dayjs(formContextTime.value).utcOffset(8).get('hour'),
      minute: dayjs(formContextTime.value).utcOffset(8).get('minute'),
    };
    return result;
  });

  // const d = dayjs(date).utcOffset(8).get('minute');
  // console.log(d);
</script>

<style lang="scss" scoped></style>
