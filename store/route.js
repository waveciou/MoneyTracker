// * ==========================================================================
// * Vuex（頁面資訊相關資料）
// * ==========================================================================

// * State
export const state = () => ({
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
      title: '帳戶總覽'
    },
    {
      routeName: 'record',
      markName: 'record',
      title: '新增記帳'
    },
    {
      routeName: 'analysis',
      markName: 'analysis',
      title: '項目分析'
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
};