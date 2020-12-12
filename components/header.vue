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
  fetch() {
    this.$store.commit('GET_PAGE_TITLE', this.$route.name);
    this.title.name = this.$store.state.pages.name;
    this.title.head = this.$store.state.pages.head;
  },
};
</script>

<style lang="scss" scoped>
@import '~/assets/scss/utils/_utils.scss';

.header {
  padding: 10px;
  text-align: center;
}

.title {
  font-size: map-get($font-size, sm);
  color: $color-white;
  line-height: 1.4em;
}

</style>