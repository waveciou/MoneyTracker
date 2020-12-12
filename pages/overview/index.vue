<template>
  <div class="content">
    <header-component />
    <div class="wrap" />
  </div>
</template>

<script>
import header from '~/components/header.vue';

export default {
  components: {
    'header-component': header
  },
};
</script>

<style lang="scss" scoped>
  @import '~/assets/scss/utils/_utils.scss';
</style>
