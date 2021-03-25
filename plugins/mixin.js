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
    },
    // 數值轉換成省略縮寫格式（M、K）
    TO_CUSTOM_NUMBER_FORMAT(payload) {
      // 判斷是否為浮點數
      const isFloat = payload % 1 == 0 ? false : true; 
      let value = payload;
      let result = 0;
      if (value >= 1000000) {
        result = (value / 1000000).toFixed(1) + 'M';
      } else if (value >= 1000) {
        result = (value / 1000).toFixed(1) + 'K';
      } else {
        result = isFloat === true ? value.toFixed(1) : value;
      }
      return result;
    },
    // 取得範例資料
    GET_EXAMPLE_DATA() {
      const example = require('../assets/example.json');
      let exampleList = [...example.example];

      const thisYear = this.$dayjs().utcOffset(8).year();
      const thisMonth = this.$dayjs().utcOffset(8).month() + 1;

      exampleList.forEach(item => {
        item.time.year = thisYear;
        item.time.month = thisMonth;
      });

      return exampleList;
    }
  }
});