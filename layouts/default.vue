<template>
  <main class="main">
    <div class="content">
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
    return {};
  },
  components: {
    'menu-component': menu
  },
  created() {
    this.getLocalStorageData();
  },
  methods: {
    // 取得儲存在 localStorage 的資料
    getLocalStorageData() {
      if (process.client && window.localStorage) {
        // 記帳項目列表
        let accountList = [];

        try {
          accountList = JSON.parse(localStorage.getItem('monetkyAccounts')) || [];
        } catch {
          accountList = [];
        }

        const result = Array.isArray(accountList) ? accountList : [];
        this.$store.commit('SET_ACCOUNTS_DATA', result);
      }
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
  background-color: $color-black;

  @include min-width(map-get($phone, md) + 20px) {
    max-width: map-get($phone, md);
  }
}

.content {
  width: 100%;
  height: calc(100% - #{$menu-height});
  padding-right: 10px;
  padding-left: 10px;
  position: relative;
  overflow-x: hidden;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  -o-overflow-scrolling: touch;
}
</style>
