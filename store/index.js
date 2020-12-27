// * ==========================================================================
// * Vuex
// * ==========================================================================

//* State
export const state = () => ({
  accounts: [],
  siteName: 'Money Tracker',
  pages: {
    name: '',
    head: ''
  },
  route: [
    {
      routeName: 'index',
      markName: 'account',
      title: '記帳日誌'
    },
    {
      routeName: 'overview',
      markName: 'overview',
      title: '總覽'
    },
    {
      routeName: 'record',
      markName: 'record',
      title: '新增記帳'
    },
    {
      routeName: 'analysis',
      markName: 'analysis',
      title: '分析'
    },
    {
      routeName: 'setting',
      markName: 'setting',
      title: '設定'
    }
  ],
  categoriesList: [],
  currentDate: {
    year: 0,
    month: 0,
    date: 0
  }
});

// * Mutations
export const mutations = {
  // 取得頁面標題
  GET_PAGE_TITLE(state, payload) {
    const route = state.route;
    const routeName = payload;

    const routeData = route.filter(data => data.routeName === routeName);
    state.pages.name = routeData.length < 1 ? routeName : routeData[0].title;
    state.pages.head = routeData.length < 1 ? routeName : `${state.siteName} - ${routeData[0].title}`;
  },
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
  }
};
