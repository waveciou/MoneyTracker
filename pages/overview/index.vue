<template>
  <div>
    <header-component />
    <div class="wrap">
      <div class="overview-title">
        <span>總額：</span>
        <div
          class="total-value"
          :class="{'color-red': totalValue < 0}"
        >
          NTD {{ overviewNumber }}
        </div>
      </div>

      <ul class="allDataList">
        <li
          v-for="dateItem in allDataList"
          :key="dateItem.id"
        >
          <accordionClass :title="dateItemTitle(dateItem)">
            <accountList-component :account-list="dateItem.collection" />
          </accordionClass>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import header from '~/components/header.vue';
import accordionClass from '~/components/accordionClass.vue';
import accountList from '~/components/accountList.vue';

export default {
  components: {
    'header-component': header,
    'accordionClass': accordionClass,
    'accountList-component': accountList
  },
  methods: {
    // 日期名稱
    dateItemTitle(payload) {
      return `${payload.time.year}年${this.TO_TIME_FORMAT(payload.time.month)}月${this.TO_TIME_FORMAT(payload.time.date)}日`;
    }
  },
  computed: {
    // 計算總額
    totalValue() {
      let accounts = [...this.$store.state.accounts];

      return accounts.reduce((accumulator, currentItem) => {
        if (currentItem.isExpense === true) {
          return accumulator - currentItem.price;
        } else {
          return accumulator + currentItem.price;
        }
      }, 0);
    },
    // 總額呈現格式
    overviewNumber() {
      const isFloat = this.totalValue % 1 == 0 ? false : true; 

      if (this.totalValue >= 1000000) {
        return `${(this.totalValue / 1000000).toFixed(2)}M`;
      } else {
        return isFloat === true ? this.totalValue.toFixed(1) : this.TO_CURRENCY(this.totalValue);
      }
    },
    // 所有資料
    allDataList() {
      let resultList = [];
      let accountList = [...this.$store.state.accounts];

      accountList.forEach(accountItem => {
        const dateId = `${accountItem.time.year}-${accountItem.time.month}-${accountItem.time.date}`;
        const hasInResult = resultList.some(dateItem => dateItem.id === dateId);

        if (hasInResult === true) {
          const index = resultList.findIndex(dateItem => dateItem.id === dateId);
          resultList[index].collection.push(this.DEEP_CLONE(accountItem));
        } else {
          let dateItem = {
            id: dateId,
            time: {
              year: accountItem.time.year,
              month: accountItem.time.month,
              date: accountItem.time.date
            },
            collection: [ this.DEEP_CLONE(accountItem) ]
          };

          resultList.push(dateItem);
        }
      });

      resultList.sort((a, b) => {
        let aTimestamp = this.$dayjs(`${a.time.year}-${a.time.month}-${a.time.date}`).unix();
        let bTimestamp = this.$dayjs(`${b.time.year}-${b.time.month}-${b.time.date}`).unix();
        return aTimestamp - bTimestamp;
      });

      return resultList;
    }
  }
};
</script>

<style lang="scss" scoped>
  @import '~/assets/scss/utils/_utils.scss';

  .overview-title {
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: $color-black;
    border-radius: 10px;

    span {
      padding-right: 10px;
      display: block;
      font-size: map-get($font-size, base);
    }
  }

  .total-value {
    line-height: 1.4em;
    font-size: map-get($font-size, lg);
    color: $color-green;

    &.color-red {
      color: $color-red;
    }
  }

  .allDataList {
    margin-top: 1rem;
    margin-bottom: 1rem;
  }
</style>
