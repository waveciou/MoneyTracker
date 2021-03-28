<template>
  <div>
    <transition-group
      name="list"
      tag="ul"
      class="accounts"
    >
      <li
        v-for="account in accountSortList"
        :key="account.id"
      >
        <a
          href="javascript:;"
          class="accounts-item"
          :title="account.name"
          @click.stop="openDetailDialog(account)"
        >
          <div
            class="accounts-icon has-icon"
            :class="`icon-${account.categories}`"
          />
          <div class="accounts-content">
            <div class="accounts-header">
              <span class="accounts-name">{{ accountName(account.isExpense, account.name, account.categories, account.subcategories) }}</span>
              <span
                class="accounts-price"
                :class="{'is-expense': account.isExpense === true}"
              >${{ TO_CURRENCY(account.price) }}</span>
            </div>
            <div class="accounts-body">
              <span
                v-if="showTime === true"
                class="item-option"
              >{{ accountTimeName(account.time) }}</span>
              <span class="item-option">{{ accountCategoriesName(account.categories, account.subcategories) }}</span>
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
    </transition-group>
    <lightbox-component
      :control="detailDialogCtrl"
      @click-overlay="closeDetailDialog"
    >
      <detail-component
        :detail="detailAccount"
        @close="closeDetailDialog"
        @edit="editAccountItem"
        @delete="deleteAccountItem"
      />
    </lightbox-component>
  </div>
</template>

<script>
import lightbox from '~/components/lightbox.vue';
import detailDailog from '~/components/detailDailog.vue';

export default {
  data() {
    return {
      detailDialogCtrl: false,
      detailAccount: {}
    };
  },
  components: {
    'lightbox-component': lightbox,
    'detail-component': detailDailog
  },
  props: {
    accountList: Array,
    showTime: Boolean
  },
  methods: {
    // 打開帳目資訊視窗
    openDetailDialog(payload) {
      this.detailAccount = this.DEEP_CLONE(payload);
      this.detailDialogCtrl = true;
    },
    // 關閉帳目資訊視窗
    closeDetailDialog() {
      this.detailAccount = {};
      this.detailDialogCtrl = false;
    },
    // 編輯帳目項目
    editAccountItem(payload) {
      this.$router.push({
        name: 'record',
        params: {
          defaultData: payload
        }
      });
    },
    // 刪除帳目項目
    deleteAccountItem(id) {
      if (process.client) {
        const isConfirm = window.confirm('確定要刪除帳目項目？');

        if (isConfirm === true) {
          let accounts = [...this.$store.state.accounts];
          const index = accounts.findIndex(account => account.id === id);

          if (index < 0) {
            window.alert('項目刪除失敗');
          } else {
            accounts.splice(index, 1);
          }

          this.$store.commit('SET_ACCOUNTS_DATA', accounts);
          this.closeDetailDialog();
        }
      }
    },
    // 名稱欄位
    accountName(isExpense, name, categories, subcategories) {
      const nameType = isExpense === true ? subcategories : categories;
      return name === '' ? this.GET_CATEGORIES_NAME(nameType) : name;
    },
    // 類別欄位
    accountCategoriesName(categories, subcategories) {
      if (subcategories !== '') {
        return `${this.GET_CATEGORIES_NAME(categories)} - ${this.GET_CATEGORIES_NAME(subcategories)}`;
      } else {
        return this.GET_CATEGORIES_NAME(categories);
      }
    },
    // 時間欄位
    accountTimeName(time) {
      return `${time.year}年${this.TO_TIME_FORMAT(time.month)}月${this.TO_TIME_FORMAT(time.date)}日`;
    }
  },
  computed: {
    accountSortList() {
      let result = [...this.accountList];

      result.sort((a, b) => {
        let aHour = a.time.hour;
        let bHour = b.time.hour;

        if (aHour === bHour) {
          return a.time.minute - b.time.minute;
        } else {
          return aHour - bHour;
        }
      });

      return result;
    }
  }
};
</script>

<style lang="scss" scoped>
  @import '~/assets/scss/utils/_utils.scss';
  @import '~/assets/scss/_icon.scss';

  .accounts {
    margin-top: 1rem;
    position: relative;
    overflow: hidden;
    margin-bottom: 1rem;

    > li {
      margin-bottom: 1rem;
    }
  }

  .accounts-item {
    padding: 10px;
    display: flex;
    align-items: flex-start;
    background-color: rgba($color-black, 0.6);
    border-radius: 5px;
  }

  .accounts-icon {
    width: 70px;
    height: 70px;
    font-size: map-get($font-size, xl);
    text-align: center;
    line-height: 70px;
    background-color: $color-yellow;

    &.has-icon::before {
      text-align: center;
      color: $color-black-light;
    }
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
    color: $color-yellow;
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