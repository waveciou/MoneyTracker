<template>
  <div>
    <header-component />
    <div class="wrap">
      <div class="analysis-header">
        <button
          class="arrow-btn btn-prevmonth"
          title="Previous"
          @click.prevent="changeMonth(false)"
        >
          <span>Previous</span>
        </button>
        <div class="analysis-title">
          {{ activeDate.year }}年{{ activeDate.month }}月
        </div>
        <button
          class="arrow-btn btn-nextmonth"
          title="Next"
          @click.prevent="changeMonth(true)"
        >
          <span>Next</span>
        </button>
      </div>

      <ul class="enumeration-list">
        <li
          v-for="typeItem in enumerationList"
          :key="typeItem.id"
        >
          <button
            class="enumeration-btn"
            :title="typeItem.name"
            :class="{ 'current': enumeration === typeItem.id }"
            @click.stop="enumeration = typeItem.id"
          >
            {{ typeItem.name }}
          </button>
        </li>
      </ul>

      <client-only>
        <analysisCategories
          v-if="enumeration === 'categories'"
          :account-list="accountList"
        />
      </client-only>
    </div>
  </div>
</template>

<script>
import NoSSR from 'vue-no-ssr';
import header from '~/components/header.vue';
import analysisCategories from '~/components/analysisCategories.vue';

export default {
  data() {
    return {
      activeDate: {
        year: 0,
        month: 0
      },
      enumeration: 'categories',
      enumerationList: [
        {
          id: 'categories',
          name: '類別'
        },
        {
          id: 'hashtag',
          name: '標籤'
        }
      ]
    };
  },
  components: {
    'client-only': NoSSR,
    'header-component': header,
    'analysisCategories': analysisCategories
  },
  created() {
    // 取得現在的時間
    this.activeDate.year = this.$dayjs().utcOffset(8).year();
    this.activeDate.month = this.$dayjs().utcOffset(8).month() + 1;
  },
  methods: {
    // 切換月份
    changeMonth(isNext) {
      let _month = this.activeDate.month;
      let month = isNext === true ? _month + 1 : _month - 1;

      if (month <= 0) {
        month = 12;
        this.activeDate.year = this.activeDate.year - 1;
      }

      if (month > 12) {
        month = 1;
        this.activeDate.year = this.activeDate.year + 1;
      }

      this.activeDate.month = month;
    },
  },
  computed: {
    // 篩選出對應日期的資料
    accountList() {
      let accountList = [...this.$store.state.accounts];
      return accountList.filter(item => {
        return Object.keys(this.activeDate).every(key => this.activeDate[key] === item.time[key]);
      });
    }
  }
};
</script>

<style lang="scss" scoped>
  @import '~/assets/scss/utils/_utils.scss';

  .analysis-header {
    padding-right: 10px;
    padding-left: 10px;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .arrow-btn {
      display: flex;

      > span {
        display: none;
      }

      &::before {
        @include fontawesome;

        display: block;
        font-size: map-get($font-size, base);
        color: $color-white;
      }

      &.btn-prevmonth::before {
        content: '\f053';
      }

      &.btn-nextmonth::before {
        content: '\f054';
      }
    }
  }

  .analysis-title {
    font-size: map-get($font-size, xs);
  }

  .enumeration-list {
    width: 100%;
    margin-bottom: 1rem;
    display: flex;
    overflow-x: auto;
    overflow-y: hidden;
    word-break: break-all;
    white-space: nowrap;
  }

  .enumeration-btn {
    padding: 12px 15px;
    line-height: 1em;
    position: relative;

    &::after {
      content: '';
      width: 100%;
      height: 3px;
      display: block;
      position: absolute;
      bottom: 0;
      left: 0;
      background-color: transparent;
    }

    &.current {
      color: $color-yellow;

      &::after {
        background-color: $color-yellow;
      }
    }
  }
</style>
