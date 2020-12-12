<template>
  <nav class="menu">
    <nuxt-link
      v-for="item in menuRouteList"
      :key="item.markName"
      :to="`/${item.routeName}`"
      class="menu-btn"
      :class="`icon-${item.markName}`"
      :title="item.title"
    >
      <span>{{ item.title }}</span>
    </nuxt-link>
  </nav>
</template>

<script>
export default {
  computed: {
    menuRouteList() {
      let routeList = [...this.$store.state.route];
      let result = routeList.map(data => {
        let item = this.DEEP_CLONE(data);
        if (item.routeName === 'index') {
          item.routeName = '';
        }
        return item;
      });
      return result;
    }
  }
};
</script>

<style lang="scss" scoped>
@import '~/assets/scss/utils/_utils.scss';

.menu {
  width: 100%;
  height: $menu-height;
  display: flex;
  background-color: $color-black;
}

.menu-btn {
  width: 25%;
  display: block;
  text-align: center;
  flex-grow: 1;

  span {
    display: block;
    font-size: map-get($font-size, base-small);
    text-align: center;
    color: $color-white;
    transition: color 0.4s;
    line-height: 1em;
  }

  &::before {
    width: 35px;
    height: 35px;
    margin: 5px auto;
    line-height: 35px;
    display: block;
    font-size: map-get($font-size, lg);
    color: $color-white;
    transition: color 0.4s;
  }

  &.nuxt-link-exact-active {
    span {
      color: $color-yellow;
    }

    &::before {
      color: $color-yellow;
    }
  }

  &.icon-account::before {
    @include fontawesome('regular');

    content: '\f073';
  }

  &.icon-record::before {
    @include fontawesome('solid');

    content: '\f067';
  }

  &.icon-overview::before {
    @include fontawesome('solid');

    content: '\f007';
  }

  &.icon-analysis::before {
    @include fontawesome('regular');

    content: '\f080';
  }

  &.icon-setting::before {
    @include fontawesome('solid');

    content: '\f0c9';
  }
}

</style>