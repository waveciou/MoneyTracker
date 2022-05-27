// * State
export const state = () => ({
  siteName: 'Money Tracker',
  pages: {
    name: '',
    head: '',
  },
  route: [
    {
      routeName: 'index',
      markName: 'account',
      title: '記帳日誌',
    },
    {
      routeName: 'overview',
      markName: 'overview',
      title: '帳戶總覽',
    },
    {
      routeName: 'record',
      markName: 'record',
      title: '新增記帳',
    },
    {
      routeName: 'analysis',
      markName: 'analysis',
      title: '項目分析',
    },
    {
      routeName: 'setting',
      markName: 'setting',
      title: '設定',
    },
  ],
});

// * Mutations
export const mutations = {
  // 取得頁面標題
  GET_PAGE_TITLE(_state, payload) {
    const assignState = _state;
    const { route } = assignState;
    const routeName = payload;

    const routeData = route.filter((data) => data.routeName === routeName);
    assignState.pages.name = routeData.length < 1 ? routeName : routeData[0].title;
    assignState.pages.head = routeData.length < 1 ? routeName : `${assignState.siteName} - ${routeData[0].title}`;
  },
};
