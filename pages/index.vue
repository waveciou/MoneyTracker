<template>
  <calendar-component />
</template>

<script>
import calendar from '~/components/calendar.vue';

export default {
  components: {
    'calendar-component': calendar
  },
};
</script>

<style lang="scss" scoped>
  @import '~/assets/scss/utils/_utils.scss';
</style>
