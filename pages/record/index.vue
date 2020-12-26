<template>
  <div class="content">
    <header-component :name="headerName" />
    <div class="wrap">
      <div class="align">
        <div class="col col-100">
          <div class="select-radio">
            <button
              class="select-radio-btn color-red"
              :class="{'current': resource.isExpense === true}"
              @click.stop="resource.isExpense = true"
            >
              <span>支出</span>
            </button>
            <button
              class="select-radio-btn color-green"
              :class="{'current': resource.isExpense === false}"
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
              v-model.number="resource.price"
              type="text"
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
        <div
          class="col"
          :class="{
            'col-50': resource.isExpense === true,
            'col-100': resource.isExpense === false
          }"
        >
          <div class="fieldset">
            <label
              class="fieldset-caption"
              for="from__categories"
            >主類別</label>
            <div class="select">
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
          </div>
        </div>
        <div
          v-if="resource.isExpense === true"
          class="col col-50"
        >
          <div class="fieldset">
            <label
              class="fieldset-caption"
              for="from__subcategories"
            >次類別</label>
            <div class="select">
              <select
                id="from__subcategories"
                v-model="computeSubcategories"
              >
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
        <div class="col col-33">
          <div class="fieldset">
            <label
              class="fieldset-caption"
              for="from__time-year"
            >年</label>
            <input
              id="from__time-year"
              v-model.number="resource.time.year"
              type="text"
            >
          </div>
        </div>
        <div class="col col-33">
          <div class="fieldset">
            <label
              class="fieldset-caption"
              for="from__time-month"
            >月</label>
            <input
              id="from__time-month"
              v-model.number="resource.time.month"
              type="text"
            >
          </div>
        </div>
        <div class="col col-33">
          <div class="fieldset">
            <label
              class="fieldset-caption"
              for="from__time-date"
            >日</label>
            <input
              id="from__time-date"
              v-model.number="resource.time.date"
              type="text"
            >
          </div>
        </div>
        <div class="col col-50">
          <div class="fieldset">
            <label
              class="fieldset-caption"
              for="from__time-hour"
            >時</label>
            <input
              id="from__time-hour"
              v-model.number="resource.time.hour"
              type="text"
            >
          </div>
        </div>
        <div class="col col-50">
          <div class="fieldset">
            <label
              class="fieldset-caption"
              for="from__time-minute"
            >分</label>
            <input
              id="from__time-minute"
              v-model.number="resource.time.minute"
              type="text"
            >
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
          title="取消"
          @click.stop="cancelHandler"
        >
          取消
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import header from '~/components/header.vue';

export default {
  data() {
    return {
      isRecord: true,
      headerName: '',
      resource: {
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
      hashtagInput: ''
    };
  },
  components: {
    'header-component': header
  },
  created() {
    this.categoriesData = require('../../assets/categories');
    this.setRecordType();
  },
  methods: {
    // 判斷調整類型為新增還是編輯
    setRecordType() {
      // 有從 Params 傳來資料為編輯
      if (this.$route.params.defaultData) {
        this.isRecord = false;
        this.headerName = '編輯記帳';
      } else {
        this.isRecord = true;
        this.headerName = '';
        this.getNowTimeData();

        // 填入預設資料
        this.setDefaultCategorie('expense');
      }
    },
    // 設定預設類別
    setDefaultCategorie(type) {
      const defaultCategorie = this.categoriesData[type][0];
      this.resource.categories = defaultCategorie.id;
      if (this.resource.isExpense === true) {
        this.resource.subcategories = defaultCategorie.subcategories[0].id;
      } else {
        this.resource.subcategories = '';
      }
    },
    // 取得現在時間
    getNowTimeData() {
      this.resource.time.year = this.$dayjs().utcOffset(8).year();
      this.resource.time.month = this.$dayjs().utcOffset(8).month() + 1;
      this.resource.time.date = this.$dayjs().utcOffset(8).date();
      this.resource.time.hour = this.$dayjs().utcOffset(8).hour();
      this.resource.time.minute = this.$dayjs().utcOffset(8).minute();
    },
    // 資料編輯送出
    submitHandler() {
      let result = {};
      let accounts = [...this.$store.state.accounts];

      if (this.isRecord === true) {
        // 新增記帳
        Object.keys(this.resource).forEach(key => {
          if (key === 'time') {
            result.time = {};
            Object.keys(this.resource.time).forEach(timeKey => {
              result.time[timeKey] = this.resource.time[timeKey];
            });
          } else {
            result[key] = this.resource[key];
          }
        });

        const date = new Date();
        result.id = date.getTime();
        accounts.push(result);
      } else {
        // 編輯記帳
      }

      this.$store.commit('SET_ACCOUNTS_DATA', accounts);
    },
    // 取消
    cancelHandler() {

    },
    // 新增 hashtag
    createHashtagHandler() {
      if (this.resource.tags.indexOf(this.hashtagInput) < 0) {
        this.resource.tags.push(this.hashtagInput);
      }
      this.hashtagInput = '';
    },
    // 刪除 hashtag
    deleateHashtagHandler(index) {
      this.resource.tags.splice(index, 1);
    }
  },
  computed: {
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
      span::before {
        opacity: 1;
      }
    }

    &.color-red {
      background-color: $color-red;
    }

    &.color-green {
      background-color: $color-green;
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
</style>
