<template>
  <div class="content">
    <header-component />
    <div class="wrap">
      <calendar-component />
    </div>
  </div>
</template>

<script>
import header from '~/components/header.vue';
import calendar from '~/components/calendar.vue';

export default {
  components: {
    'header-component': header,
    'calendar-component': calendar
  },
};
</script>

<style lang="scss" scoped>
  @import '~/assets/scss/utils/_utils.scss';
</style>
