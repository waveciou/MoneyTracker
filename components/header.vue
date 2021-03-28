<template>
  <header class="header">
    <h1 class="title">
      {{ title.name }}
    </h1>
    <button
      class="header__search-open-btn"
      @click.stop="openSearchBarHandler"
    />
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
    this.$store.commit('route/GET_PAGE_TITLE', this.$route.name);
    this.title.name = this.$store.state.route.pages.name;
    this.title.head = this.$store.state.route.pages.head;

    if (process.client) {
      if (this.name) {
        this.title.name = this.name;
      }
    }
  },
  methods: {
    // 開啟搜尋欄
    openSearchBarHandler() {
      this.$store.commit('SET_SEARCHBAR_CONTROL', true);
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
    padding: 10px $header-height + 10px;
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
    overflow: hidden;
    font-size: map-get($font-size, sm);
    font-weight: 500;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: $color-white;
    line-height: 1.4em;
    word-break: keep-all;
  }

  .header__search-open-btn {
    width: $header-height;
    height: $header-height;
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    text-align: center;

    &::before {
      @include fontawesome;

      content: '\f002';
      line-height: $header-height;
      font-size: map-get($font-size, sm);
    }
  }
</style>