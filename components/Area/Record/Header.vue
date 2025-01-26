<template>
  <header
    class="relative h-header-height w-full basis-header-height"
    :class="props.styleDark && 'bg-black-darkest'"
  >
    <button
      class="before-font-material absolute left-0 top-0 flex h-header-height w-header-height items-center justify-center before:content-['\e5cd']"
      title="Close"
      @click="handleClose"
    />
    <div
      class="flex h-header-height items-center justify-center px-header-height text-center"
    >
      <h2 class="block truncate text-lg font-bold">{{ provideTitle }}</h2>
    </div>
    <button
      class="before-font-material absolute right-0 top-0 flex h-header-height w-header-height items-center justify-center before:content-['\e876']"
      title="Submit"
      @click="handleSubmit"
    />
  </header>
</template>

<script setup lang="ts">
  import { storeToRefs } from 'pinia';
  import { useRecordStore } from '@/stores/recordStore';
  import { EnumRecordMode } from '@/assets/types/record';

  const props = withDefaults(defineProps<{ styleDark?: boolean }>(), {
    styleDark: false,
  });

  const emits = defineEmits<{ (e: 'submit'): void }>();

  const recordStore = useRecordStore();
  const { contextMode } = storeToRefs(recordStore);

  const provideTitle = computed((): string => {
    if (contextMode.value === EnumRecordMode.CREATOR) {
      return 'New Record';
    } else if (contextMode.value === EnumRecordMode.EDITOR) {
      return 'Edit Record';
    } else {
      return '';
    }
  });

  const handleClose = (): void => {
    recordStore.HANDLE_CLOSE();
  };

  const handleSubmit = (): void => {
    emits('submit');
  };
</script>
