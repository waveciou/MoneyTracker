// * ==========================================================================
// * Vuex
// * ==========================================================================

//* State
export const state = () => ({
  accounts: [
    {
      id: 123456789,
      isExpense: true,
      name: '營養三明治',
      price: 10,
      store: '安安早餐店',
      categories: '飲食',
      subcategories: '早餐',
      time: {
        year: 2020,
        month: 12,
        date: 15,
        hour: 22,
        minute: 30
      },
      tags: ['早餐', '三明治'],
      notes: ''
    }
  ],
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
  ]
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
  }
};
