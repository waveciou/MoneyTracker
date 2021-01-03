<template>
  <div>
    <div class="align">
      <div class="col col-100">
        <div class="fieldset">
          <div class="select">
            <select v-model="categories">
              <option
                v-for="categorieItem in categorieList"
                :key="categorieItem.id"
                :value="categorieItem.id"
              >
                {{ categorieItem.name }}
              </option>
            </select>
          </div>
        </div>
      </div>
    </div>

    <chartpie-component 
      :series-data="seriesData"
      :labels-data="labelsData"
    />

    <div
      v-if="seriesData.length > 0"
      class="total-value"
    >
      <span> TWD ${{ TO_CURRENCY(totalValue) }}</span>
    </div>

    <ul class="analysisList">
      <li
        v-for="dataItem in accountFormatList"
        :key="dataItem.id"
      >
        <div class="analysisList-item">
          <div class="analysisList-title">
            {{ GET_CATEGORIES_NAME(dataItem.id) }}
          </div>
          <div class="analysisList-value">
            ${{ getTotalValue(dataItem.collection) }}
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import chartpie from '~/components/chartpie.vue';

export default {
  data() {
    return {
      categories: '',
      categoriesData: []
    };
  },
  components: {
    'chartpie-component': chartpie,
  },
  props: {
    accountList: Array
  },
  created() {
    // 取得類別資料
    this.categoriesData = require('../assets/categories');
    this.categories = this.categoriesData['expense'][0].id;
  },
  methods: {
    // 計算總額
    getTotalValue(payload) {
      let result = payload.reduce((accumulator, currentItem) => {
        return accumulator + currentItem.price;
      }, 0);

      return this.TO_CURRENCY(result);
    }
  },
  computed: {
    // 主類別列表
    categorieList() {
      let result = this.categoriesData['expense'].map(item => {
        return { id: item.id, name: item.name };
      });

      result.push({ id: 'income', name: '收入' });
      return result;
    },
    // 分類列表
    accountFormatList() {
      let resultList = [];
      let filterList = this.accountList.filter(accountItem => {
        if (this.categories === 'income') {
          return accountItem.isExpense === false;
        } else {
          return accountItem.categories === this.categories;
        }
      });

      filterList.forEach(accountItem => {
        const id = this.categories === 'income' ? accountItem.categories : accountItem.subcategories;
        const index = resultList.findIndex(dataItem => dataItem.id === id);

        if (index < 0) {
          let dataItem = {
            id: id,
            collection: [ this.DEEP_CLONE(accountItem) ]
          };
          resultList.push(dataItem);
        } else {
          resultList[index].collection.push(this.DEEP_CLONE(accountItem));
        }
      });

      return resultList;
    },
    // 圖表資料
    seriesData() {
      return this.accountFormatList.map(dataItem => {
        return dataItem.collection.reduce((accumulator, currentItem) => {
          return accumulator + currentItem.price;
        }, 0);
      }) || [];
    },
    // 圖表項目
    labelsData() {
      return this.accountFormatList.map(dataItem => {
        return this.GET_CATEGORIES_NAME(dataItem.id);
      }) || [];
    },
    // 計算總額
    totalValue() {
      return this.seriesData.reduce((accumulator, currentItem) => {
        return accumulator + currentItem;
      }, 0);
    }
  }
};
</script>

<style lang="scss" scoped>
  @import '~/assets/scss/utils/_utils.scss';
  @import '~/assets/scss/_form.scss';

  .total-value {
    padding-top: 10px;
    padding-bottom: 10px;
    display: flex;
    justify-content: flex-end;
    font-size: map-get($font-size, md);
    font-weight: 500;

    span {
      display: block;
      color: $color-yellow;
      line-height: 1.2em;
    }
  }

  .analysisList {
    padding-right: 5px;
    padding-left: 5px;
    margin-bottom: 2rem;

    > li {
      margin-top: 10px;
      margin-bottom: 10px;
    }
  }

  .analysisList-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .analysisList-title,
  .analysisList-value {
    max-width: 50%;
    overflow: hidden;
    font-size: map-get($font-size, xs);
    text-overflow: ellipsis;
    white-space: nowrap;
    word-break: keep-all;
    line-height: 1.6em;
  }
</style>