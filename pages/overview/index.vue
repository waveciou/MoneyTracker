<template>
  <div>
    <header-component />
    <div class="wrap">
      <div class="overview-title">
        <span>總額：</span>
        <div
          class="total-value"
          :class="{ 'color-red': totalValue < 0 }"
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

      <chartbar-component
        :series-data="chartSeries"
        :xaxis-list="chartXaxisList"
      />

      <ul class="accountFormatList">
        <li
          v-for="accountItem in accountFormatList"
          :key="accountItem.id"
        >
          <accordionClass :title="dataItemTitle(accountItem)">
            <accountList-component :account-list="accountItem.collection" />
          </accordionClass>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import header from '~/components/header.vue';
import chartbar from '~/components/chartbar.vue';
import accordionClass from '~/components/accordionClass.vue';
import accountList from '~/components/accountList.vue';

export default {
  data() {
    return {
      according: 'date' 
    };
  },
  components: {
    'header-component': header,
    'chartbar-component': chartbar,
    'accordionClass': accordionClass,
    'accountList-component': accountList
  },
  methods: {
    // 項目名稱
    dataItemTitle(payload) {
      let time = payload.time;

      if (this.according === 'month') {
        return `${time.year}年${this.TO_TIME_FORMAT(time.month)}月`;
      } else {
        return `${time.year}年${this.TO_TIME_FORMAT(time.month)}月${this.TO_TIME_FORMAT(time.date)}日`;
      }
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
    accountFormatList() {
      let resultList = [];
      let accountList = [...this.$store.state.accounts];

      accountList.forEach(accountItem => {
        let time = accountItem.time;
        const id = this.according === 'month' ? `${time.year}-${time.month}` : `${time.year}-${time.month}-${time.date}`;
        const hasInResult = resultList.some(dataItem => dataItem.id === id);

        if (hasInResult === true) {
          const index = resultList.findIndex(dataItem => dataItem.id === id);
          resultList[index].collection.push(this.DEEP_CLONE(accountItem));
        } else {
          let dataItem = {
            id: id,
            time: {
              year: accountItem.time.year,
              month: accountItem.time.month,
              date: accountItem.time.date
            },
            collection: [ this.DEEP_CLONE(accountItem) ]
          };

          resultList.push(dataItem);
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
      let result = [{
        name: '支出',
        data: []
      }, {
        name: '收入',
        data: []
      }];

      this.accountFormatList.forEach(dataItem => {
        const expense = dataItem.collection.reduce((accumulator, currentItem) => {
          let priceValue = currentItem.isExpense === true ? currentItem.price : 0;
          return accumulator + priceValue;
        }, 0);

        const income = dataItem.collection.reduce((accumulator, currentItem) => {
          let priceValue = currentItem.isExpense === false ? currentItem.price : 0;
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
        return this.accountFormatList.map(dataItem => {
          return `${this.TO_TIME_FORMAT(dataItem.time.month)}月`;
        });
      } else {
        return this.accountFormatList.map(dataItem => {
          return `${this.TO_TIME_FORMAT(dataItem.time.month)}/${this.TO_TIME_FORMAT(dataItem.time.date)}`;
        });
      }
    }
  }
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
