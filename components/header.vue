<template>
  <header class="header">
    <h1 class="title">
      {{ title.name }}
    </h1>
  </header>
</template>

<script>
export default {
  data() {
    return {
      title: {
        name: '',
        head: '',
      },
    };
  },
  head() {
    return {
      title: this.title.head,
    };
  },
  props: {
    name: String
  },
  fetch() {
    this.$store.commit('GET_PAGE_TITLE', this.$route.name);
    this.title.name = this.$store.state.pages.name;
    this.title.head = this.$store.state.pages.head;

    if (process.client) {
      if (this.name) {
        this.title.name = this.name;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
  @import '~/assets/scss/utils/_utils.scss';

  .header {
    width: 100%;
    height: $header-height;
    max-width: 480px;
    padding: 10px;
    position: fixed;
    top: 0;
    left: 50%;
    text-align: center;
    background-color: $color-black-light;
    z-index: 2000;
    transition: all 1s;
    transform: translateX(-50%);

    @at-root .is-fixed & {
      background-color: $color-black;
    }
  }

  .title {
    font-size: map-get($font-size, sm);
    color: $color-white;
    line-height: 1.4em;
  }
</style>