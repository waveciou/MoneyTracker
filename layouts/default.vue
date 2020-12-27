<template>
  <main class="main">
    <transition
      name="fade"
      mode="out-in"
    >
      <Nuxt />
    </transition>
    <menu-component />
  </main>
</template>

<script>
import menu from '~/components/menu.vue';

export default {
  data() {
    return {};
  },
  components: {
    'menu-component': menu
  },
  created() {
    this.getLocalStorageData();
    this.getCategoriesData();
  },
  methods: {
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
          result = [...this.$store.state.accounts];
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
