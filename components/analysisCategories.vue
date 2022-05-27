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

    <Chartpie
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
  import Chartpie from '~/components/chartpie.vue';

  export default {
    data() {
      return {
        categories: '',
        categoriesData: [],
      };
    },
    components: {
      Chartpie,
    },
    props: {
      accountList: Array,
    },
    created() {
      // 取得類別資料
      // eslint-disable-next-line global-require
      this.categoriesData = require('../assets/categories.json');
      this.categories = this.categoriesData.expense[0].id;
    },
    methods: {
      // 計算總額
      getTotalValue(payload) {
        const result = payload.reduce((accumulator, currentItem) => accumulator + currentItem.price, 0);

        return this.TO_CURRENCY(result);
      },
    },
    computed: {
      // 主類別列表
      categorieList() {
        const result = this.categoriesData.expense.map((item) => ({ id: item.id, name: item.name }));

        result.push({ id: 'income', name: '收入' });
        return result;
      },
      // 分類列表
      accountFormatList() {
        const resultList = [];
        const filterList = this.accountList.filter((accountItem) => {
          if (this.categories === 'income') {
            return accountItem.isExpense === false;
          }
          return accountItem.categories === this.categories;
        });

        filterList.forEach((accountItem) => {
          const id = this.categories === 'income' ? accountItem.categories : accountItem.subcategories;
          const index = resultList.findIndex((dataItem) => dataItem.id === id);

          if (index < 0) {
            const dataItem = {
              id,
              collection: [this.DEEP_CLONE(accountItem)],
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
        return this.accountFormatList.map((dataItem) => dataItem.collection.reduce((accumulator, currentItem) => accumulator + currentItem.price, 0)) || [];
      },
      // 圖表項目
      labelsData() {
        return this.accountFormatList.map((dataItem) => this.GET_CATEGORIES_NAME(dataItem.id)) || [];
      },
      // 計算總額
      totalValue() {
        return this.seriesData.reduce((accumulator, currentItem) => accumulator + currentItem, 0);
      },
    },
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
