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
        <div class="col col-100 fieldset">
          <label
            class="fieldset-caption"
            for="from__price"
          >金額</label>
          <input
            id="from__price"
            v-model.number="resource.price"
            type="number"
          >
        </div>
        <div class="col col-100 fieldset">
          <label
            class="fieldset-caption"
            for="from__name"
          >名稱</label>
          <input
            id="from__name"
            v-model.trim="resource.name"
            type="text"
          >
        </div>
        <div class="col col-100 fieldset">
          <label
            class="fieldset-caption"
            for="from__store"
          >商家</label>
          <input
            id="from__store"
            v-model.trim="resource.store"
            type="text"
          >
        </div>
        <div class="col col-33 fieldset">
          <label
            class="fieldset-caption"
            for="from__time-year"
          >年</label>
          <input
            id="from__time-year"
            v-model.number="resource.time.year"
            type="number"
          >
        </div>
        <div class="col col-33 fieldset">
          <label
            class="fieldset-caption"
            for="from__time-month"
          >月</label>
          <input
            id="from__time-month"
            v-model.number="resource.time.month"
            type="number"
          >
        </div>
        <div class="col col-33 fieldset">
          <label
            class="fieldset-caption"
            for="from__time-date"
          >日</label>
          <input
            id="from__time-date"
            v-model.number="resource.time.date"
            type="number"
          >
        </div>
        <div class="col col-50 fieldset">
          <label
            class="fieldset-caption"
            for="from__time-hour"
          >時</label>
          <input
            id="from__time-hour"
            v-model.number="resource.time.hour"
            type="number"
          >
        </div>
        <div class="col col-50 fieldset">
          <label
            class="fieldset-caption"
            for="from__time-minute"
          >分</label>
          <input
            id="from__time-minute"
            v-model.number="resource.time.minute"
            type="number"
          >
        </div>
        <div class="col col-100 fieldset">
          <label
            class="fieldset-caption"
            for="from__notes"
          >備註</label>
          <textarea
            id="from__notes"
            v-model.trim="resource.notes"
          />
        </div>
      </div>
      <div class="row is-center">
        <a
          href="javascript:;"
          class="btn"
          @click.stop="submitHandler"
        >送出</a>
        <a
          href="javascript:;"
          class="btn"
          @click.stop="cancelHandler"
        >取消</a>
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
      }
    };
  },
  components: {
    'header-component': header
  },
  created() {
    // * 判斷調整類型為新增還是編輯
    // * 有從 Params 傳來資料為編輯
    if (this.$route.params.defaultData) {
      this.isRecord = false;
      this.headerName = '編輯記帳';
    } else {
      this.isRecord = true;
      this.headerName = '';
      this.getNowTimeData();
    }
  },
  methods: {
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

    }
  }
};
</script>

<style lang="scss" scoped>
  @import '~/assets/scss/utils/_utils.scss';

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

  .btn {
    width: 100%;
  }
</style>
