<template>
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="isOpen"
        class="w-full h-full flex justify-center items-center fixed top-0 left-0 z-popup bg-black/60"
        @click.stop="handleClose"
      >
        <div class="w-popup max-w-popup max-h-popup overflow-hidden rounded-md">
          <slot />
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
  const emits = defineEmits<{
    (e: 'close'): void;
  }>();

  defineProps<{ isOpen: boolean }>();

  const handleClose = (): void => {
    emits('close');
  };
</script>

<style lang="scss" scoped>
  .modal-container {
    transition: all 0.3s ease;
  }
</style>
