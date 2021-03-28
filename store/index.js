// * ==========================================================================
// * Vuex
// * ==========================================================================

//* State
export const state = () => ({
  accounts: [],
  categoriesList: [],
  currentDate: {
    year: 0,
    month: 0,
    date: 0
  },
  searchBarCtrl: false
});

// * Mutations
export const mutations = {
  // 設定記帳資料
  SET_ACCOUNTS_DATA(state, payload) {
    state.accounts = payload;
    if (process.client && window.localStorage) {
      localStorage.setItem('monetkyAccounts', JSON.stringify(payload));
    }
  },
  // 設定類別項目資料庫
  SET_CATEGORIES_LIST(state, payload) {
    state.categoriesList.push(payload);
  },
  // 設定目前選取日期
  SET_CURRENT_DATE(state, payload) {
    Object.keys(state.currentDate).forEach(key => {
      state.currentDate[key] = payload[key];
    });
  },
  // 設定搜尋欄是否開啟
  SET_SEARCHBAR_CONTROL(state, payload) {
    state.searchBarCtrl = payload;
  }
};
