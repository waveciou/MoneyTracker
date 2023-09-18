<template>
  <div>
    <CardContent :data="props.data" @click="isPopUpOpen = true" />
    <ThePopUp :is-open="isPopUpOpen" @close="isPopUpOpen = false">
      <div class="text-white bg-black-base">
        <div class="h-[150px] bg-yellow">
          <div class="p-1 flex justify-end text-black-base">
            <button class="w-6 h-6 ml-1 before-font-material icon-edit" />
            <button class="w-6 h-6 ml-1 before-font-material icon-delete" />
            <button
              class="w-6 h-6 ml-1 before-font-material icon-close"
              @click="isPopUpOpen = false"
            />
          </div>
        </div>
        <CardDetail :data="props.data" />
      </div>
    </ThePopUp>
  </div>
</template>

<script setup lang="ts">
  import { IRecordForm } from '@/assets/interfaces/record';

  const props = defineProps<{ data: IRecordForm }>();

  const isPopUpOpen = ref<boolean>(false);
</script>

<style lang="scss" scoped>
  .icon-close::before {
    content: '\e5cd';
  }

  .icon-delete::before {
    content: '\e872';
  }

  .icon-edit::before {
    content: '\e3c9';
  }
</style>
