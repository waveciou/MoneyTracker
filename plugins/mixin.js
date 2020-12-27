import Vue from 'vue';

Vue.mixin({
  methods: {
    // 物件的深拷貝
    DEEP_CLONE(payload) {
      return JSON.parse(JSON.stringify(payload));
    },
    // 字串 Trim
    STRING_TRIM(payload) {
      return typeof(payload) === 'string' ? payload.trim() : payload;
    },
    // 數值轉換成貨幣格式（千分位）
    TO_CURRENCY(value) {
      let result = value.toString();
      let reg = /(-?\d+)(\d{3})/;
      while (reg.test(result)) {
        result = result.replace(reg, '$1,$2');
      }
      return result;
    },
    // 取得類別名稱
    GET_CATEGORIES_NAME(payload) {
      let result = this.$store.state.categoriesList.filter(item => item.id === payload);
      return result.length < 1 ? payload : result[0].name;
    },
    // 時間數值補零
    TO_TIME_FORMAT(payload) {
      return payload < 10 ? `0${payload}` : `${payload}`;
    }
  }
});