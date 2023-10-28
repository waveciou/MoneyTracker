<template>
  <ThePopUp :is-open="props.isOpen">
    <div
      class="w-4/5 m-auto bg-black-base text-white rounded-md overflow-hidden"
    >
      <div
        class="flex justify-center items-center p-4 text-center border-b border-white border-solid"
      >
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
          class="w-6/12 p-2 border-l border-t-0 border-r-0 border-b-0 border-white border-solid"
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
