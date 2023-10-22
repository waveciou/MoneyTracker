<template>
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="props.isOpen"
        class="modal-animation w-full h-full flex justify-center items-center fixed top-0 left-0 z-popup bg-black/60"
        @click.stop="emits('close')"
      >
        <div
          class="w-popup max-w-popup max-h-popup overflow-hidden rounded-md"
          @click.stop=""
        >
          <slot />
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
  const emits = defineEmits<{ (e: 'close'): void }>();

  const props = defineProps<{ isOpen: boolean }>();
</script>
