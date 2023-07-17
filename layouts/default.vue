<template>
  <main class="w-full h-full flex flex-col relative overflow-hidden">
    <header class="w-full h-header-height basis-header-height">Header</header>
    <div
      id="content"
      class="w-full h-full overflow-x-hidden overflow-y-auto relative"
    >
      <slot />
    </div>
    <nav class="w-full h-menu-height basis-menu-height">Menu</nav>
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
