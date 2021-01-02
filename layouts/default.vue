<template>
  <main class="main">
    <div
      ref="content"
      class="content"
      :class="{'is-fixed': scrollValue > 0}"
      @scroll="getScrollValue"
    >
      <transition
        name="fade"
        mode="out-in"
      >
        <Nuxt />
      </transition>
    </div>
    <menu-component />
  </main>
</template>

<script>
import menu from '~/components/menu.vue';

export default {
  data() {
    return {
      scrollValue: 0
    };
  },
  components: {
    'menu-component': menu
  },
  created() {
    // 設定目前選取日期為今天
    this.getTodayData();
    // 取得儲存在 localStorage 的資料
    this.getLocalStorageData();
    // 取得類別項目資料庫
    this.getCategoriesData();
  },
  methods: {
    // 設定目前選取日期為今天
    getTodayData() {
      const result = {
        year: this.$dayjs().utcOffset(8).year(),
        month: this.$dayjs().utcOffset(8).month() + 1,
        date: this.$dayjs().utcOffset(8).date()
      };
      this.$store.commit('SET_CURRENT_DATE', result);
    },
    // 取得儲存在 localStorage 的資料
    getLocalStorageData() {
      if (process.client && window.localStorage) {
        let database = localStorage.getItem('monetkyAccounts');
        let result = [];

        if (database) {
          let accountList = [];

          try {
            accountList = JSON.parse(database) || [];
          } catch {
            accountList = [];
          }

          result = Array.isArray(accountList) ? accountList : [];
        } else {
          let isConfirm = window.confirm('是否要載入範例資料？');

          if (isConfirm === true) {
            // 載入範例資料
            let example = require('../assets/example');
            let exampleList = [...example.example];

            const thisYear = this.$dayjs().utcOffset(8).year();
            const thisMonth = this.$dayjs().utcOffset(8).month() + 1;

            exampleList.forEach((item, index) => {
              item.time.year = thisYear;
              item.time.month = thisMonth;
            });

            result = exampleList;
          }
        }

        this.$store.commit('SET_ACCOUNTS_DATA', result);
      }
    },
    // 取得類別項目資料庫
    getCategoriesData() {
      const collection = require('../assets/categories');

      Object.keys(collection).forEach(typeKey => {
        collection[typeKey].forEach(categorieItem => {
          const result = { id: categorieItem.id, name: categorieItem.name };
          this.$store.commit('SET_CATEGORIES_LIST', result);

          if (categorieItem.subcategories) {
            categorieItem.subcategories.forEach(subcategorieItem => {
              this.$store.commit('SET_CATEGORIES_LIST', subcategorieItem);
            });
          }
        });
      });

    },
    // 取得 Scroll Value
    getScrollValue() {
      this.scrollValue = this.$refs.content.scrollTop;
    }
  },
  watch: {
    $route(value) {
      this.$refs.content.scrollTop = 0;
    }
  }
};
</script>

<style lang="scss" scoped>
  @import '~/assets/scss/utils/_utils.scss';

  .main {
    width: 100%;
    height: 100%;
    margin: auto;
    position: relative;
    background-color: $color-black-light;

    @include min-width(map-get($phone, md) + 20px) {
      max-width: map-get($phone, md);
    }
  }
</style>
