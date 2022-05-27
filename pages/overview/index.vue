<template>
  <div>
    <HeaderModule />
    <div class="wrap">
      <client-only>
        <div class="overview-title">
          <span>總額：</span>
          <div
            class="total-value"
            :class="{'color-red': totalValue < 0}"
          >
            TWD {{ overviewNumber }}
          </div>
        </div>

        <div
          v-if="chartXaxisList.length > 0"
          class="overview-according"
        >
          <div class="radio-button">
            <input
              id="according-month"
              v-model="according"
              type="radio"
              :value="'month'"
            >
            <label for="according-month">月份</label>
          </div>
          <div class="radio-button">
            <input
              id="according-date"
              v-model="according"
              type="radio"
              :value="'date'"
            >
            <label for="according-date">日期</label>
          </div>
        </div>

        <Chartbar
          :series-data="chartSeries"
          :xaxis-list="chartXaxisList"
        />

        <ul class="accountFormatList">
          <li
            v-for="accountItem in accountFormatList"
            :key="accountItem.id"
          >
            <AccordionClass :title="setDateTitle(accountItem)">
              <AccountList :account-list="accountItem.collection" />
            </AccordionClass>
          </li>
        </ul>
      </client-only>
    </div>
  </div>
</template>

<script>
  import NoSSR from 'vue-no-ssr';
  import HeaderModule from '~/components/header.vue';
  import Chartbar from '~/components/chartbar.vue';
  import AccordionClass from '~/components/accordionClass.vue';
  import AccountList from '~/components/accountList.vue';

  export default {
    data() {
      return {
        according: 'date',
      };
    },
    components: {
      'client-only': NoSSR,
      HeaderModule,
      Chartbar,
      AccordionClass,
      AccountList,
    },
    methods: {
      // 日期名稱
      setDateTitle(payload) {
        const { time } = payload;

        if (this.according === 'month') {
          return `${time.year}年${this.TO_TIME_FORMAT(time.month)}月`;
        }
        return `${time.year}年${this.TO_TIME_FORMAT(time.month)}月${this.TO_TIME_FORMAT(time.date)}日`;
      },
    },
    computed: {
      // 計算總額
      totalValue() {
        const accounts = [...this.$store.state.accounts];

        return accounts.reduce((accumulator, currentItem) => {
          if (currentItem.isExpense === true) {
            return accumulator - currentItem.price;
          }
          return accumulator + currentItem.price;
        }, 0);
      },
      // 總額呈現格式
      overviewNumber() {
        const isFloat = this.totalValue % 1 !== 0;

        if (this.totalValue >= 1000000) {
          return `${(this.totalValue / 1000000).toFixed(2)}M`;
        }
        return isFloat === true ? this.totalValue.toFixed(1) : this.TO_CURRENCY(this.totalValue);
      },
      // 所有資料
      accountFormatList() {
        const resultList = [];
        const accountList = [...this.$store.state.accounts];

        accountList.forEach((accountItem) => {
          const { time } = accountItem;
          const id = this.according === 'month' ? `${time.year}-${time.month}` : `${time.year}-${time.month}-${time.date}`;
          const index = resultList.findIndex((dataItem) => dataItem.id === id);

          if (index < 0) {
            const dataItem = {
              id,
              time: {
                year: accountItem.time.year,
                month: accountItem.time.month,
                date: accountItem.time.date,
              },
              collection: [this.DEEP_CLONE(accountItem)],
            };

            resultList.push(dataItem);
          } else {
            resultList[index].collection.push(this.DEEP_CLONE(accountItem));
          }
        });

        resultList.sort((a, b) => {
          const aTimestamp = this.$dayjs(`${a.time.year}-${a.time.month}-${a.time.date}`).unix();
          const bTimestamp = this.$dayjs(`${b.time.year}-${b.time.month}-${b.time.date}`).unix();
          return aTimestamp - bTimestamp;
        });

        return resultList;
      },
      // 圖表資料
      chartSeries() {
        const result = [{
          name: '支出',
          data: [],
        }, {
          name: '收入',
          data: [],
        }];

        this.accountFormatList.forEach((dataItem) => {
          const expense = dataItem.collection.reduce((accumulator, currentItem) => {
            const priceValue = currentItem.isExpense === true ? currentItem.price : 0;
            return accumulator + priceValue;
          }, 0);

          const income = dataItem.collection.reduce((accumulator, currentItem) => {
            const priceValue = currentItem.isExpense === false ? currentItem.price : 0;
            return accumulator + priceValue;
          }, 0);

          result[0].data.push(expense);
          result[1].data.push(income);
        });

        return result;
      },
      // 圖表X軸欄位
      chartXaxisList() {
        if (this.according === 'month') {
          return this.accountFormatList.map((dataItem) => `${this.TO_TIME_FORMAT(dataItem.time.month)}月`);
        }
        return this.accountFormatList.map((dataItem) => `${this.TO_TIME_FORMAT(dataItem.time.month)}/${this.TO_TIME_FORMAT(dataItem.time.date)}`);
      },
    },
  };
</script>

<style lang="scss" scoped>
  @import '~/assets/scss/utils/_utils.scss';

  .overview-title {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
    margin-bottom: 10px;

    span {
      padding-right: 10px;
      display: block;
      font-size: map-get($font-size, md);
      font-weight: 500;
    }
  }

  .total-value {
    line-height: 1.4em;
    font-size: map-get($font-size, lg);
    font-weight: 500;
    color: $color-green;

    &.color-red {
      color: $color-red;
    }
  }

  .overview-according {
    width: 100%;
    display: flex;
    align-items: baseline;
    justify-content: flex-end;
  }

  .accountFormatList {
    margin-top: 1rem;
    margin-bottom: 1rem;
  }
</style>
