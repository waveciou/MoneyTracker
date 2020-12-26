<template>
  <div class="content">
    <header-component />
    <div class="wrap">
      <calendar-component @get-date="getDateHandler" />
      <ul class="accounts">
        <li
          v-for="account in accountList"
          :key="account.id"
        >
          <a
            href="javascript:;"
            class="accounts-item"
            :title="account.name"
            @click.stop="openAccountDialog(account)"
          >
            <div class="accounts-icon" />
            <div class="accounts-content">
              <div class="accounts-header">
                <span class="accounts-name">{{ account.name }}</span>
                <span
                  class="accounts-price"
                  :class="{'is-expense': account.isExpense === true}"
                >${{ account.price }}</span>
              </div>
              <div class="accounts-body">
                <span class="item-option">{{ account.categories }} - {{ account.subcategories }}</span>
                <span class="item-option">{{ account.store }}</span>
              </div>
              <div class="accounts-footer">
                <span
                  v-for="tag in account.tags"
                  :key="tag"
                  class="item-tag"
                >{{ tag }}</span>
              </div>
            </div>
          </a>
        </li>
      </ul>
    </div>
    <lightbox-component
      :control="accountDialog"
      @click-overlay="closeAccountDialog"
    >
      123
    </lightbox-component>
  </div>
</template>

<script>
import header from '~/components/header.vue';
import calendar from '~/components/calendar.vue';
import lightbox from '~/components/lightbox.vue';

export default {
  data() {
    return {
      activeDate: {
        date: 0,
        month: 0,
        year: 0
      },
      accountDialog: false,
      currentAccount: {}
    };
  },
  components: {
    'header-component': header,
    'calendar-component': calendar,
    'lightbox-component': lightbox
  },
  methods: {
    // 取得選取日期
    getDateHandler(payload) {
      this.activeDate.year = payload.year;
      this.activeDate.month = payload.month;
      this.activeDate.date = payload.date;
    },
    // 打開帳目資訊視窗
    openAccountDialog(payload) {
      this.currentAccount = this.DEEP_CLONE(payload);
      this.accountDialog = true;
    },
    // 關閉帳目資訊視窗
    closeAccountDialog() {
      this.currentAccount = {};
      this.accountDialog = false;
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

  .accounts {
    margin-top: 1rem;
    margin-bottom: 1rem;

    > li {
      margin-bottom: 1rem;
    }
  }

  .accounts-item {
    padding: 10px;
    display: flex;
    align-items: flex-start;
    background-color: $color-black;
    border-radius: 5px;
  }

  .accounts-icon {
    width: 70px;
    height: 70px;
    font-size: map-get($font-size, xl);
    text-align: center;
    line-height: 70px;
    background-color: $color-yellow;
  }

  .accounts-content {
    width: calc(100% - 70px);
    padding-left: 10px;
  }

  .accounts-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .accounts-body,
  .accounts-footer {
    overflow: hidden;
    font-size: map-get($font-size, base-small);
    text-overflow: ellipsis;
    white-space: nowrap;
    word-break: keep-all;
    line-height: 1.75em;

    .item-option {
      margin-right: 5px;
    }

    .item-tag {
      margin-right: 5px;

      &::before {
        content: '#';
      }
    }
  }

  .accounts-name {
    max-height: 2.8em;
    display: -webkit-box;
    overflow: hidden;
    text-overflow: ellipsis;
    line-height: 1.4em;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  }

  .accounts-price {
    padding-right: 5px;
    padding-left: 5px;
    color: $color-green;

    &.is-expense {
      color: $color-red;
    }
  }

</style>
