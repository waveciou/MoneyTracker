<template>
  <nav class="menu" />
</template>

<script>
export default {

};
</script>

<style lang="scss" scoped>
@import '~/assets/scss/utils/_utils.scss';

.menu {
  width: 100%;
  height: $menu-height;
  display: flex;
  background-color: $color-black-light;
}

.menu-btn {
  width: 45px;
  display: block;
  text-align: center;

  &::before {
    @include fontawesome('regular');

    content: '\f080';
    width: 45px;
    margin: auto;
    display: block;
    font-size: map-get($font-size, xl);
    color: $color-white;
  }
}

</style>