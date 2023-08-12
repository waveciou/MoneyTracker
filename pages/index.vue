<template>
  <div class="w-full h-[1000px]">
    Home
    <TheButton class="mb-2" @click="isPopUpOpen = !isPopUpOpen">
      PopUp
    </TheButton>
    <ThePopUp :is-open="isPopUpOpen" @close="isPopUpOpen = false">
      <div class="bg-white w-full h-[800px]"></div>
    </ThePopUp>
  </div>
</template>

<script setup lang="ts">
  const isPopUpOpen = ref<boolean>(false);
</script>

<style lang="scss" scoped></style>
