<template>
  <div>
    <header-component :name="headerName" />
    <div class="wrap">
      <div class="align">
        <div class="col col-100">
          <div class="select-radio">
            <button
              class="select-radio-btn"
              :class="{'current': resource.isExpense === true}"
              title="支出"
              @click.stop="resource.isExpense = true"
            >
              <span>支出</span>
            </button>
            <button
              class="select-radio-btn"
              :class="{'current': resource.isExpense === false}"
              title="收入"
              @click.stop="resource.isExpense = false"
            >
              <span>收入</span>
            </button>
          </div>
        </div>
        <div class="col col-100">
          <div class="fieldset">
            <label
              class="fieldset-caption"
              for="from__price"
            >金額</label>
            <input
              id="from__price"
              v-model.number="computePrice"
              type="text"
              @focus="priceFocusHandler"
              @blur="priceBlurHandler"
            >
          </div>
        </div>
        <div class="col col-100">
          <div class="fieldset">
            <label
              class="fieldset-caption"
              for="from__name"
            >名稱</label>
            <input
              id="from__name"
              v-model="resource.name"
              type="text"
            >
          </div>
        </div>
        <div class="col col-100">
          <div class="fieldset">
            <label
              class="fieldset-caption"
              for="from__categories"
            >類別</label>
            <div class="fieldset-abreast">
              <div
                class="select fieldset-abreast-item"
                :class="{'size-50': resource.isExpense === true}"
              >
                <select
                  id="from__categories"
                  v-model="computeCategories"
                >
                  <option
                    v-for="categorieItem in categorieList"
                    :key="categorieItem.id"
                    :value="categorieItem.id"
                  >
                    {{ categorieItem.name }}
                  </option>
                </select>
              </div>
              <div
                v-if="resource.isExpense === true"
                class="select fieldset-abreast-item"
                :class="{'size-50': resource.isExpense === true}"
              >
                <select v-model="computeSubcategories">
                  <option
                    v-for="subcategorieItem in subcategorieList"
                    :key="subcategorieItem.id"
                    :value="subcategorieItem.id"
                  >
                    {{ subcategorieItem.name }}
                  </option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div class="col col-100">
          <div class="fieldset">
            <label
              class="fieldset-caption"
              for="from__store"
            >商家</label>
            <input
              id="from__store"
              v-model="resource.store"
              type="text"
            >
          </div>
        </div>
        <div class="col col-100">
          <div class="fieldset">
            <label
              class="fieldset-caption"
              for="from__date"
            >日期</label>
            <button
              class="btn date-btn"
              @click.stop="calendarDialogCtrl = true"
            >
              {{ textDate }}
            </button>
          </div>
        </div>
        <div class="col col-100">
          <div class="fieldset">
            <label
              class="fieldset-caption"
              for="from__time"
            >時間</label>
            <div class="fieldset-abreast">
              <div class="select fieldset-abreast-item">
                <select
                  id="from__time"
                  v-model="resource.time.hour"
                >
                  <option
                    v-for="hour in timeHourList"
                    :key="hour"
                    :value="hour"
                  >
                    {{ TO_TIME_FORMAT(hour) }}
                  </option>
                </select>
              </div>
              <span class="time-tips">:</span>
              <div class="select fieldset-abreast-item">
                <select v-model="resource.time.minute">
                  <option
                    v-for="minute in timeMinuteList"
                    :key="minute"
                    :value="minute"
                  >
                    {{ TO_TIME_FORMAT(minute) }}
                  </option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div class="col col-100">
          <div class="fieldset">
            <label
              class="fieldset-caption"
              for="from__notes"
            >備註</label>
            <textarea
              id="from__notes"
              v-model="resource.notes"
            />
          </div>
        </div>
        <div class="col col-100">
          <div class="fieldset">
            <label
              class="fieldset-caption"
              for="from__tags"
            >標籤</label>
            <ul class="hashtag-list">
              <li
                v-for="(hashtag, index) in resource.tags"
                :key="hashtag"
              >
                <button
                  class="hashtag-item"
                  @click.stop="deleateHashtagHandler(index)"
                >
                  {{ hashtag }}
                </button>
              </li>
            </ul>
            <div class="fieldset-tags">
              <input
                id="from__tags"
                v-model.trim="hashtagInput"
                class="fieldset-tags__input"
                type="text"
                @keyup.enter="createHashtagHandler"
              >
              <button
                class="fieldset-tags__btn"
                title="新增"
                @click.stop="createHashtagHandler"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="row is-center">
        <button
          class="btn"
          title="送出"
          @click.stop="submitHandler"
        >
          送出
        </button>
        <button
          class="btn"
          :title="resetButtonText"
          @click.stop="resetHandler"
        >
          {{ resetButtonText }}
        </button>
      </div>
    </div>
    <lightbox-component
      :control="calendarDialogCtrl"
      @click-overlay="calendarDialogCtrl = false"
    >
      <calendarDailog-component
        :default-time="resource.time"
        @submit="updateResourceTime"
        @cancel="calendarDialogCtrl = false"
      />
    </lightbox-component>
  </div>
</template>

<script>
import header from '~/components/header.vue';
import lightbox from '~/components/lightbox.vue';
import calendarDailog from '~/components/calendarDailog.vue';

export default {
  data() {
    return {
      isRecord: true,
      headerName: '',
      resource: {
        id: '',
        name: '',
        isExpense: true,
        price: 0,
        store: '',
        categories: '',
        subcategories: '',
        time: {
          year: 0,
          month: 0,
          date: 0,
          hour: 0,
          minute: 0
        },
        tags: [],
        notes: ''
      },
      categoriesData: {},
      hashtagInput: '',
      calendarDialogCtrl: false
    };
  },
  components: {
    'header-component': header,
    'lightbox-component': lightbox,
    'calendarDailog-component': calendarDailog
  },
  created() {
    this.categoriesData = require('../../assets/categories');
    this.setRecordType();

    if (this.isRecord === true) {
      // 填入基本預設類別
      this.setDefaultCategorie('expense');

      // 取得現在時間
      this.getNowTimeData();

      // 日期欄位更新成目前選取日期
      Object.keys(this.$store.state.currentDate).forEach(key => {
        this.resource.time[key] = this.$store.state.currentDate[key];
      });

      // 填入id
      this.setResourceId();
    }
  },
  methods: {
    // 判斷調整類型為新增還是編輯
    setRecordType() {
      // 有從 Params 傳來資料為編輯
      if (this.$route.params.defaultData) {
        this.isRecord = false;
        this.headerName = '編輯記帳';

        // 填入編輯資料類別
        this.setDefaultResource();
      } else {
        this.isRecord = true;
        this.headerName = '';
      }
    },
    // 設定基本預設類別
    setDefaultCategorie(type) {
      const defaultCategorie = this.categoriesData[type][0];
      this.resource.categories = defaultCategorie.id;
      if (this.resource.isExpense === true) {
        this.resource.subcategories = defaultCategorie.subcategories[0].id;
      } else {
        this.resource.subcategories = '';
      }
    },
    // 設定編輯資料類別
    setDefaultResource() {
      Object.keys(this.resource).forEach(key => {
        this.resource[key] = this.$route.params.defaultData[key];
      });
    },
    // 取得現在時間
    getNowTimeData() {
      this.resource.time.year = this.$dayjs().utcOffset(8).year();
      this.resource.time.month = this.$dayjs().utcOffset(8).month() + 1;
      this.resource.time.date = this.$dayjs().utcOffset(8).date();
      this.resource.time.hour = this.$dayjs().utcOffset(8).hour();
      this.resource.time.minute = this.$dayjs().utcOffset(8).minute();
    },
    // 設定 ID
    setResourceId() {
      const date = new Date();
      this.resource.id = `${date.getTime()}`;
    },
    // 資料編輯送出
    submitHandler() {
      let result = this.DEEP_CLONE(this.resource);
      let accounts = [...this.$store.state.accounts];

      Object.keys(result).forEach(key => {
        result[key] = this.STRING_TRIM(result[key]);
      });

      if (this.isRecord === true) {
        // 新增記帳
        accounts.push(result);
      } else {
        // 編輯記帳
        const index = accounts.findIndex(account => account.id === result.id);
        accounts[index] = this.DEEP_CLONE(result);
      }

      // 更新至 Vuex
      this.$store.commit('SET_ACCOUNTS_DATA', accounts);

      // 更新目前選取日期
      this.$store.commit('SET_CURRENT_DATE', {
        year: this.resource.time.year,
        month: this.resource.time.month,
        date: this.resource.time.date
      });

      // 導向首頁
      this.$router.push({ name: 'index' });
    },
    // 取消／重置
    resetHandler() {
      if (this.isRecord === true) {
        if (process.client) {
          let isConfirm = window.confirm('確定要重置所有欄位？');
          if (isConfirm === true) {

            // 新增記帳（重置）
            Object.keys(this.resource).forEach(key => {
              let itemValue = this.resource[key];
              const types = typeof(itemValue);

              if (types === 'string') {
                itemValue = '';
              } else if (types === 'number') {
                itemValue = 0;
              } else if (Array.isArray(itemValue) === true) {
                itemValue = [];
              }

              this.resource[key] = itemValue;
            });

            // 填入基本預設類別
            this.setDefaultCategorie(this.expenseKeyword);
            // 取得現在時間
            this.getNowTimeData();
            // 填入id
            this.setResourceId();
          }
        }
      } else {
        // 編輯記帳（取消）
        this.$router.push({ name: 'index' });
      }
    },
    // 新增 hashtag
    createHashtagHandler() {
      if (this.resource.tags.indexOf(this.hashtagInput) < 0 && this.hashtagInput !== '') {
        this.resource.tags.push(this.hashtagInput);
      }
      this.hashtagInput = '';
    },
    // 刪除 hashtag
    deleateHashtagHandler(index) {
      this.resource.tags.splice(index, 1);
    },
    // Price input focus event
    priceFocusHandler() {
      // 金額輸入時如果為0，則轉成空字串
      if (this.resource.price === 0) {
        this.resource.price = '';
      }
    },
    // Price input blur event
    priceBlurHandler() {
      if (this.resource.price === '') {
        this.resource.price = 0;
      }
    },
    // 更新日期資料
    updateResourceTime(payload) {
      Object.keys(payload).forEach(key => {
        this.resource.time[key] = payload[key];
      });

      this.calendarDialogCtrl = false;
    }
  },
  computed: {
    // 金額
    computePrice: {
      get() {
        return this.resource.price;
      },
      set(value) {
        let reg = /^[0-9]*$/;
        let verification = reg.test(value) ? true : false;
        this.resource.price = verification === true ? value : 0;
      }
    },
    // 主類別列表
    categorieList() {
      return this.categoriesData[this.expenseKeyword].map(item => {
        return { id: item.id, name: item.name };
      });
    },
    // 次類別列表
    subcategorieList() {
      if (this.resource.isExpense === false || this.resource.categories === '') {
        return [];
      } else {
        const categorieItem = this.categoriesData['expense'].filter(item => item.id === this.resource.categories);
        return categorieItem[0].subcategories || [];
      }
    },
    // 主類別
    computeCategories: {
      get() {
        return this.resource.categories;
      },
      set(value) {
        this.resource.categories = value;

        if (this.resource.isExpense === true) {
          const categorieItem = this.categoriesData['expense'].filter(item => item.id === value);
          this.resource.subcategories = categorieItem[0].subcategories[0].id || '';
        } else {
          this.resource.subcategories = '';
        }
      }
    },
    // 次類別
    computeSubcategories: {
      get() {
        return this.resource.subcategories;
      },
      set(value) {
        this.resource.subcategories = value;
      }
    },
    // 收入／支出關鍵字
    expenseKeyword() {
      return this.resource.isExpense === true ? 'expense' : 'income';
    },
    // 取消／重置按鈕文字
    resetButtonText() {
      return this.isRecord === true ? '重置' : '取消';
    },
    // 日期文字
    textDate() {
      return `${this.resource.time.year}年${this.TO_TIME_FORMAT(this.resource.time.month)}月${this.TO_TIME_FORMAT(this.resource.time.date)}日`;
    },
    // 日期列表（時）
    timeHourList() {
      let result = [];
      for (let i = 0; i < 24; i++) {
        result.push(i);
      }
      return result;
    },
    // 日期列表（分）
    timeMinuteList() {
      let result = [];
      for (let i = 0; i < 60; i++) {
        result.push(i);
      }
      return result;
    }
  },
  watch: {
    'resource.isExpense': {
      handler(value, oldValue) {
        this.setDefaultCategorie(this.expenseKeyword);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
  @import '~/assets/scss/utils/_utils.scss';
  @import '~/assets/scss/_form.scss';

  .select-radio {
    display: flex;
    align-items: center;
    overflow: hidden;
    border: 2px $color-yellow solid;
    border-radius: 5px;
    margin-bottom: 1rem;
  }

  .select-radio-btn {
    width: 100%;
    padding: 7px;
    display: block;
    position: relative;
    color: $color-white;
    flex-grow: 1;

    span {
      position: relative;

      &::before {
        @include fontawesome;

        content: '\f00c';
        width: 20px;
        display: inline-block;
        position: absolute;
        left: -20px;
        opacity: 0;
      }
    }

    &.current {
      background-color: $color-yellow;

      span {
        color: $color-black-light;

        &::before {
          opacity: 1;
        }
      }
    }
  }

  .hashtag-list {
    display: flex;
    flex-wrap: wrap;

    > li {
      margin-right: 5px;
      margin-bottom: 7px;
    }
  }

  .hashtag-item {
    padding: 5px 7px 5px 10px;
    display: block;
    font-size: 0.85rem;
    background-color: rgba($color-black-dark, 0.6);
    border-radius: 5px;
    line-height: 1em;

    &::before {
      content: '#';
    }

    &::after {
      @include fontawesome;

      content: '\f057';
      margin-left: 5px;
    }
  }

  .btn {
    width: 100%;
  }

  .date-btn {
    margin-right: 0;
    margin-left: 0;

    &::before {
      @include fontawesome;

      content: '\f073';
      margin-right: 5px;
    }
  }
</style>
