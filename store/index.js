//* State
export const state = () => ({
  accounts: [],
  categoriesList: [],
  currentDate: {
    year: 0,
    month: 0,
    date: 0,
  },
  searchBarCtrl: false,
  isLightboxOpen: false,
});

// * Mutations
export const mutations = {
  // 設定記帳資料
  SET_ACCOUNTS_DATA(_state, payload) {
    const assignState = _state;
    assignState.accounts = payload;
    if (process.client && window.localStorage) {
      localStorage.setItem('monetkyAccounts', JSON.stringify(payload));
    }
  },
  // 設定類別項目資料庫
  SET_CATEGORIES_LIST(_state, payload) {
    const assignState = _state;
    assignState.categoriesList.push(payload);
  },
  // 設定目前選取日期
  SET_CURRENT_DATE(_state, payload) {
    const assignState = _state;
    Object.keys(assignState.currentDate).forEach((key) => {
      assignState.currentDate[key] = payload[key];
    });
  },
  // 設定搜尋欄是否開啟
  SET_SEARCHBAR_CONTROL(_state, payload) {
    const assignState = _state;
    assignState.searchBarCtrl = payload;
  },
  // 設定監聽 Lightbox 是否開啟的參數
  SET_LIGHTBOX_CTRL_VALUE(_state, payload) {
    const assignState = _state;
    assignState.isLightboxOpen = payload;
  },
};
