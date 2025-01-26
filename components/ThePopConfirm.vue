<template>
  <ThePopUp :is-open="props.isOpen">
    <div
      class="m-auto w-4/5 overflow-hidden rounded-md bg-black-base text-white"
    >
      <div
        class="flex items-center justify-center border-b border-solid border-white p-4 text-center"
      >
        {{ props.title }}
      </div>
      <div class="flex border-t border-solid border-black-base">
        <button
          class="w-6/12 p-2"
          :title="props.leftText"
          @click="emits('clickLeftButton')"
        >
          {{ props.leftText }}
        </button>
        <button
          class="w-6/12 border-b-0 border-l border-r-0 border-t-0 border-solid border-white p-2"
          :title="props.rightText"
          @click="emits('clickRightButton')"
        >
          {{ props.rightText }}
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

  const props = withDefaults(
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
