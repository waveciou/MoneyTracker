<template>
  <div>
    <header class="header">
      <h1 class="title">
        {{ title.name }}
      </h1>
    </header>
  </div>
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
</style>
