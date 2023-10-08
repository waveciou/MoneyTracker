<template>
  <div class="py-3 text-2xl text-white/60 text-center">
    {{ props.caption }}
  </div>
</template>

<script setup lang="ts">
  const props = withDefaults(defineProps<{ caption?: string }>(), {
    caption: 'NO DATA',
  });
</script>
