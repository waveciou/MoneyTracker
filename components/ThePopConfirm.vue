<template>
  <ThePopUp :is-open="isOpen">
    <div
      class="w-4/5 m-auto bg-black-base text-white rounded-md overflow-hidden"
    >
      <div class="px-2 py-3 text-center">
        {{ title }}
      </div>
      <div class="flex border-t border-black-base border-solid">
        <button
          class="w-6/12 p-2"
          :title="leftText"
          @click="emits('clickLeftButton')"
        >
          {{ leftText }}
        </button>
        <button
          class="w-6/12 p-2"
          :title="rightText"
          @click="emits('clickRightButton')"
        >
          {{ rightText }}
        </button>
      </div>
    </div>
  </ThePopUp>
</template>

<script setup lang="ts">
  const emits = defineEmits<{
    (e: 'clickLeftButton'): void;
    (e: 'clickRightButton'): void;
  }>();

  withDefaults(
    defineProps<{
      title: string;
      leftText: string;
      rightText: string;
      isOpen: boolean;
    }>(),
    {
      title: '',
      leftText: '',
      rightText: '',
      isOpen: false,
    }
  );
</script>
