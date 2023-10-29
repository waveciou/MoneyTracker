<template>
  <div class="py-3 text-2xl text-white/60 text-center font-bold">
    {{ props.description }}
  </div>
</template>

<script setup lang="ts">
  const props = withDefaults(defineProps<{ description?: string }>(), {
    description: 'NO DATA',
  });
</script>
