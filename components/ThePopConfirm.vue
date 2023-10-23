<template>
  <ThePopUp :is-open="props.isOpen">
    <div
      class="w-4/5 m-auto bg-black-base text-white rounded-md overflow-hidden"
    >
      <div class="px-2 py-3 text-center">
        {{ props.title }}
      </div>
      <div class="flex border-t border-black-base border-solid">
        <button
          class="w-6/12 p-2"
          :title="props.leftText"
          @click="emits('clickLeftButton')"
        >
          {{ props.leftText }}
        </button>
        <button
          class="w-6/12 p-2"
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
