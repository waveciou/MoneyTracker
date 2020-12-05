// * ==========================================================================
// * Vuex
// * ==========================================================================

//* State
export const state = () => ({
  accounts: []
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
};
