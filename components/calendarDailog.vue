<template>
  <div class="calendarDailog">
    <Calendar
      :default-date="defaultTime"
      @get-date="getDateHandler"
    />
    <div class="calendarDailog-title">
      <span>{{ textTitle }}</span>
    </div>
    <div class="row is-center">
      <button
        class="btn"
        title="確定"
        @click.stop="submitHandler"
      >
        確定
      </button>
      <button
        class="btn"
        title="取消"
        @click.stop="cancelHandler"
      >
        取消
      </button>
    </div>
  </div>
</template>

<script>
  import Calendar from '~/components/calendar.vue';

  export default {
    data() {
      return {
        activeDate: {
          date: 0,
          month: 0,
          year: 0,
        },
      };
    },
    components: {
      Calendar,
    },
    props: {
      defaultTime: Object,
    },
    created() {
      Object.keys(this.activeDate).forEach((key) => {
        this.activeDate[key] = this.defaultTime[key];
      });
    },
    methods: {
      // 取得日期
      getDateHandler(payload) {
        Object.keys(this.activeDate).forEach((key) => {
          this.activeDate[key] = payload[key];
        });
      },
      // 確定
      submitHandler() {
        this.$emit('submit', this.activeDate);
      },
      // 取消
      cancelHandler() {
        this.$emit('cancel');
      },
    },
    computed: {
      textTitle() {
        return `${this.activeDate.year}年${this.TO_TIME_FORMAT(this.activeDate.month)}月${this.TO_TIME_FORMAT(this.activeDate.date)}日`;
      },
    },
  };
</script>

<style lang="scss" scoped>
  @import '~/assets/scss/utils/_utils.scss';

  .calendar {
    margin-bottom: 0;
  }

  .calendarDailog {
    overflow: hidden;
    background-color: $color-black-light;
    border-radius: 5px;
  }

  .calendarDailog-title {
    padding-right: 10px;
    padding-left: 10px;

    span {
      padding-top: 10px;
      padding-bottom: 10px;
      margin-top: 5px;
      display: block;
      font-size: map-get($font-size, md);
      text-align: center;
      color: $color-yellow;
      margin-bottom: 10px;
      line-height: 1.2em;
    }
  }
</style>
