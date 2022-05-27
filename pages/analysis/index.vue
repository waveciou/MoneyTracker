<template>
  <div>
    <HeaderModule />
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
          {{ activeDate.year }}年{{ TO_TIME_FORMAT(activeDate.month) }}月
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
            :class="{'current': enumeration === typeItem.id}"
            @click.stop="enumeration = typeItem.id"
          >
            {{ typeItem.name }}
          </button>
        </li>
      </ul>

      <client-only>
        <div
          v-for="typeItem in enumerationList"
          :key="`${typeItem.id}-component`"
        >
          <component
            :is="typeItem.componentName"
            v-if="enumeration === typeItem.id"
            :class-type="typeItem.id"
            :account-list="accountList"
          />
        </div>
      </client-only>
    </div>
  </div>
</template>

<script>
  import NoSSR from 'vue-no-ssr';
  import HeaderModule from '~/components/header.vue';
  import AnalysisCategories from '~/components/analysisCategories.vue';
  import AnalysisClassification from '~/components/analysisClassification.vue';

  export default {
    data() {
      return {
        activeDate: {
          year: 0,
          month: 0,
        },
        enumeration: 'categories',
        enumerationList: [
          {
            id: 'categories',
            name: '類別',
            componentName: 'AnalysisCategories',
          },
          {
            id: 'name',
            name: '名稱',
            componentName: 'AnalysisClassification',
          },
          {
            id: 'store',
            name: '商家',
            componentName: 'AnalysisClassification',
          },
          {
            id: 'tags',
            name: '標籤',
            componentName: 'AnalysisClassification',
          },
        ],
      };
    },
    components: {
      'client-only': NoSSR,
      HeaderModule,
      AnalysisCategories,
      AnalysisClassification,
    },
    created() {
      // 取得現在的時間
      this.activeDate.year = this.$dayjs().utcOffset(8).year();
      this.activeDate.month = this.$dayjs().utcOffset(8).month() + 1;
    },
    methods: {
      // 切換月份
      changeMonth(isNext) {
        let month = isNext === true ? this.activeDate.month + 1 : this.activeDate.month - 1;

        if (month <= 0) {
          month = 12;
          this.activeDate.year -= 1;
        } else if (month > 12) {
          month = 1;
          this.activeDate.year += 1;
        }

        this.activeDate.month = month;
      },
    },
    computed: {
      // 篩選出對應日期的資料
      accountList() {
        const accountList = [...this.$store.state.accounts];

        return accountList.filter((item) => Object.keys(this.activeDate).every((key) => this.activeDate[key] === item.time[key]));
      },
    },
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
    display: flex;
    justify-content: space-between;
    overflow-x: auto;
    overflow-y: hidden;
    white-space: nowrap;
    margin-bottom: 1rem;
    word-break: break-all;

    > li {
      display: block;
      flex-grow: 1;
    }
  }

  .enumeration-btn {
    min-width: 100%;
    padding: 12px 7px;
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
