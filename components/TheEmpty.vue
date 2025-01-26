<template>
  <div class="py-3 text-center text-2xl font-bold text-white/60">
    {{ props.description }}
  </div>
</template>

<script setup lang="ts">
  const props = withDefaults(defineProps<{ description?: string }>(), {
    description: 'NO DATA',
  });
</script>
