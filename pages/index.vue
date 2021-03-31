<template>
  <div>
    <header-component />
    <div class="wrap">
      <calendar-component
        :default-date="defaultCalendarData"
        @get-date="getDateHandler"
      />
      <accountList-component
        v-if="accountList.length > 0"
        :account-list="accountList"
      />
      <p
        v-else
        class="none-tips"
      >
        目前尚無任何資料
      </p>
    </div>
  </div>
</template>

<script>
import header from '~/components/header.vue';
import calendar from '~/components/calendar.vue';
import accountList from '~/components/accountList.vue';

export default {
  data() {
    return {
      activeDate: {
        date: 0,
        month: 0,
        year: 0
      },
      defaultCalendarData: {}
    };
  },
  components: {
    'header-component': header,
    'calendar-component': calendar,
    'accountList-component': accountList
  },
  created() {
    // 將日前選取日期傳到日曆模組
    this.defaultCalendarData = this.DEEP_CLONE(this.$store.state.currentDate);
  },
  methods: {
    // 取得選取日期
    getDateHandler(payload) {
      this.activeDate.year = payload.year;
      this.activeDate.month = payload.month;
      this.activeDate.date = payload.date;

      // 同步更新至 Vuex
      this.$store.commit('SET_CURRENT_DATE', payload);
    }
  },
  computed: {
    // 帳目列表
    accountList() {
      let accounts = [...this.$store.state.accounts];
      return accounts.filter(item => {
        return Object.keys(this.activeDate).every(key => this.activeDate[key] === item.time[key]);
      });
    }
  }
};
</script>

<style lang="scss" scoped>
  @import '~/assets/scss/utils/_utils.scss';
</style>
