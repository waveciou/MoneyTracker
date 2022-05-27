<template>
  <div>
    <ul class="classificationList">
      <li
        v-for="dataItem in accountFormatList"
        :key="dataItem.id"
      >
        <div class="classificationList-item">
          <AccordionClass :title="`#${dataItem.id}`">
            <div class="classificationList-header">
              <div
                class="classificationList-value"
                :class="{'color-red': getTotalValue(dataItem.collection) < 0}"
              >
                {{ setValueFormat(getTotalValue(dataItem.collection)) }}
              </div>
              <div class="classificationList-number">
                共{{ dataItem.collection.length }}筆
              </div>
            </div>
            <AccountList
              :account-list="dataItem.collection"
              :show-time="true"
            />
          </AccordionClass>
        </div>
      </li>
    </ul>
    <p
      v-if="accountFormatList.length <= 0"
      class="none-tips"
    >
      目前尚無任何資料
    </p>
  </div>
</template>

<script>
  import AccordionClass from '~/components/accordionClass.vue';
  import AccountList from '~/components/accountList.vue';

  export default {
    data() {
      return {
      };
    },
    components: {
      AccordionClass,
      AccountList,
    },
    props: {
      classType: String,
      accountList: Array,
    },
    methods: {
      // 計算總額
      getTotalValue(payload) {
        return payload.reduce((accumulator, currentItem) => {
          if (currentItem.isExpense === true) {
            return accumulator - currentItem.price;
          }
          return accumulator + currentItem.price;
        }, 0);
      },
      setValueFormat(payload) {
        const result = this.TO_CURRENCY(Math.abs(payload));
        return payload < 0 ? `-$${result}` : `$${result}`;
      },
      // 新增項目類別或添加記帳
      setAccountItem(resultList, index, id, accountItem) {
        if (index < 0) {
          const dataItem = {
            id,
            collection: [this.DEEP_CLONE(accountItem)],
          };
          resultList.push(dataItem);
        } else {
          resultList[index].collection.push(this.DEEP_CLONE(accountItem));
        }
      },
    },
    computed: {
      // 分類列表
      accountFormatList() {
        const classTypeName = this.classType;
        const resultList = [];
        let filterList = [];

        if (classTypeName === 'tags') {
          filterList = this.accountList.filter((accountItem) => accountItem.tags.length > 0);

          filterList.forEach((accountItem) => {
            accountItem.tags.forEach((tagName) => {
              const index = resultList.findIndex((dataItem) => dataItem.id === tagName);
              this.setAccountItem(resultList, index, tagName, accountItem);
            });
          });
        } else {
          filterList = this.accountList.filter((accountItem) => accountItem[classTypeName] !== '');

          filterList.forEach((accountItem) => {
            const index = resultList.findIndex((dataItem) => dataItem.id === accountItem[classTypeName]);
            this.setAccountItem(resultList, index, accountItem[classTypeName], accountItem);
          });
        }

        return resultList;
      },
    },
  };
</script>

<style lang="scss" scoped>
  @import '~/assets/scss/utils/_utils.scss';

  .classificationList-header {
    padding-top: 5px;
    padding-bottom: 5px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .classificationList-value {
    color: $color-green;

    &.color-red {
      color: $color-red;
    }
  }
</style>
