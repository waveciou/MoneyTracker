<template>
  <div>
    <ul class="hashtagList">
      <li
        v-for="dataItem in accountFormatList"
        :key="dataItem.id"
      >
        <div class="hashtagList-item">
          <accordionClass :title="`#${dataItem.id}`">
            <div class="hashtagList-header">
              <div
                class="hashtagList-value"
                :class="{'color-red': getTotalValue(dataItem.collection) < 0}"
              >
                {{ setValueFormat(getTotalValue(dataItem.collection)) }}
              </div>
              <div class="hashtagList-number">
                共{{ dataItem.collection.length }}筆
              </div>
            </div>
            <accountList-component
              :account-list="dataItem.collection"
              :show-time="true"
            />
          </accordionclass>
        </div>
      </li>
    </ul>
    <p
      v-if="accountList.length <= 0"
      class="none-tips"
    >
      目前尚無任何資料
    </p>
  </div>
</template>

<script>
import accordionClass from '~/components/accordionClass.vue';
import accountList from '~/components/accountList.vue';

export default {
  data() {
    return {
      currentHashtag: ''
    };
  },
  components: {
    'accordionClass': accordionClass,
    'accountList-component': accountList
  },
  props: {
    accountList: Array
  },
  methods: {
    // 計算總額
    getTotalValue(payload) {
      return payload.reduce((accumulator, currentItem) => {
        if (currentItem.isExpense === true) {
          return accumulator - currentItem.price;
        } else {
          return accumulator + currentItem.price;
        }
      }, 0);
    },
    setValueFormat(payload) {
      let result = this.TO_CURRENCY(Math.abs(payload));
      return payload < 0 ? `-$${result}` : `$${result}`;
    }
  },
  computed: {
    // 分類列表
    accountFormatList() {
      let resultList = [];
      let filterList = this.accountList.filter(accountItem => {
        return accountItem.tags.length > 0;
      });

      filterList.forEach(accountItem => {
        accountItem.tags.forEach(tagName => {
          const index = resultList.findIndex(dataItem => dataItem.id === tagName);
          if (index < 0) {
            let dataItem = {
              id: tagName,
              collection: [ this.DEEP_CLONE(accountItem) ]
            };
            resultList.push(dataItem);
          } else {
            resultList[index].collection.push(this.DEEP_CLONE(accountItem));
          }
        });
      });

      return resultList;
    }
  }
};
</script>

<style lang="scss" scoped>
  @import '~/assets/scss/utils/_utils.scss';

  .hashtagList-header {
    padding-top: 5px;
    padding-bottom: 5px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .hashtagList-value {
    color: $color-green;

    &.color-red {
      color: $color-red;
    }
  }
</style>