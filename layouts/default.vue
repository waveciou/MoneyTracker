<template>
  <main class="w-full h-full flex flex-col relative overflow-hidden">
    <TheHeader />
    <div
      id="content"
      class="w-full h-full overflow-x-hidden overflow-y-auto relative"
    >
      <slot />
    </div>
    <TheMenu />
  </main>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
  @import url('~/assets/scss/utils/_utils.scss');

  #content {
    -webkit-overflow-scrolling: touch;
    -o-overflow-scrolling: touch;
  }
</style>
