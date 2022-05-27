<template>
  <div class="calendar">
    <div class="calendar__header">
      <a
        href="javascript:;"
        class="arrow-btn btn-prevmonth"
        title="Previous"
        @click.prevent="changeMonth(false)"
      >
        <span>Previous</span>
      </a>
      <div
        class="calendar__title"
        @click.prevent="directToToday()"
      >
        <span class="caption-year">{{ current.year }} 年</span>
        <span class="caption-month">{{ TO_TIME_FORMAT(current.month) }} 月</span>
      </div>
      <a
        href="javascript:;"
        class="arrow-btn btn-nextmonth"
        title="Next"
        @click.prevent="changeMonth(true)"
      >
        <span>Next</span>
      </a>
    </div>
    <div class="calendar__body">
      <ul class="calendar__heading">
        <li
          v-for="weekdate in weekdates"
          :key="weekdate"
        >
          <div class="calendar__item">
            {{ weekdate }}
          </div>
        </li>
      </ul>
      <ul class="calendar__content">
        <li
          v-for="item in buildCalendar"
          :key="item.id"
        >
          <a
            href="javascript:;"
            class="calendar__item"
            :class="{
              'is-today': item.today === true,
              'current': item.current === true,
              'disabled': item.none === true
            }"
            :title="item.id"
            @click.prevent="getDateData(item)"
          >{{ item.number }}</a>
        </li>
      </ul>
    </div>
    <div class="calendar__footer">
      <button
        class="reset-btn"
        @click.stop="directToToday"
      >
        移動至今天
      </button>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        current: {
          year: 0,
          month: 0,
          date: 0,
        },
        today: {
          year: 0,
          month: 0,
          date: 0,
        },
        weekdates: ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'],
      };
    },
    props: {
      defaultDate: Object,
    },
    mounted() {
      // 取得今天日期
      this.getTodayData();

      if (this.defaultDate) {
        // 移動至傳入的時間
        Object.keys(this.current).forEach((key) => {
          this.current[key] = this.defaultDate[key];
        });
      } else {
        // 移動至今天
        this.directToToday();
      }
    },
    methods: {
      // 切換月份
      changeMonth(isNext) {
        let month = isNext === true ? this.current.month + 1 : this.current.month - 1;

        if (month <= 0) {
          month = 12;
          this.current.year -= 1;
        } else if (month > 12) {
          month = 1;
          this.current.year += 1;
        }

        this.current.month = month;
        this.current.date = 1;
      },
      // 取得日期資料
      getDateData(data) {
        if (data.none === true) {
          return false;
        }
        this.current.year = data.year;
        this.current.month = data.month;
        this.current.date = data.date;
        return true;
      },
      // 移動至今天
      directToToday() {
        this.current.year = this.today.year;
        this.current.month = this.today.month;
        this.current.date = this.today.date;
      },
      // 取得今天資料
      getTodayData() {
        this.today.year = this.$dayjs().utcOffset(8).year();
        this.today.month = this.$dayjs().utcOffset(8).month() + 1;
        this.today.date = this.$dayjs().utcOffset(8).date();
      },
    },
    computed: {
      // 產生月曆
      buildCalendar() {
        const resultList = [];
        const myYears = this.current.year;
        const myMonth = this.current.month;
        const myDate = this.current.date;

        const monthText = this.TO_TIME_FORMAT(myMonth);

        const totalDate = this.$dayjs(`${myYears}-${monthText}`).utcOffset(8).daysInMonth();

        for (let i = 0; i < totalDate; i++) {
          const dateNumber = i + 1;
          let isToday = false;

          if (myYears === this.today.year && myMonth === this.today.month && dateNumber === this.today.date) {
            isToday = true;
          }

          const result = {
            id: `${myYears}-${myMonth}-${dateNumber}`,
            year: myYears,
            month: myMonth,
            date: dateNumber,
            number: this.TO_TIME_FORMAT(dateNumber),
            today: isToday,
            current: dateNumber === myDate,
          };

          resultList.push(result);
        }

        // 補上前面的日期
        const week = this.$dayjs(`${myYears}-${monthText}`).utcOffset(8).format('d');

        for (let i = 0; i < week; i++) {
          const obj = {
            number: '',
            none: true,
          };

          resultList.splice(i, 0, obj);
        }

        // 補上後面的日期
        const patchNumber = (resultList.length % 7 === 0) ? 0 : 7 - (resultList.length % 7);

        for (let i = 0; i < patchNumber; i++) {
          const obj = {
            number: '',
            none: true,
          };

          resultList.splice(resultList.length, 0, obj);
        }

        return resultList;
      },
    },
    watch: {
      current: {
        handler(value) {
          this.$emit('get-date', value);
        },
        deep: true,
        immediate: false,
      },
    },
  };
</script>

<style lang="scss" scoped>
  @import '~/assets/scss/utils/_utils.scss';

  .calendar {
    margin-bottom: 1rem;
    overflow: hidden;
    background-color: $color-black-light;
  }

  .calendar__heading,
  .calendar__content {
    width: 100%;
    padding-right: 5px;
    padding-left: 5px;
    display: flex;
    flex-wrap: wrap;

    > li {
      width: 14.2857142%;
      padding-right: 5px;
      padding-left: 5px;
    }
  }

  .calendar__content {
    position: relative;
  }

  .calendar__item {
    width: 100%;
    height: 100%;
    padding-top: 7px;
    padding-bottom: 7px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    color: $color-white;
    border-radius: 3px;
    transition: all 0.3s;

    &.is-today {
      color: $color-yellow;
    }

    &.current {
      color: $color-black-light;
      background-color: $color-yellow;
    }

    &.disabled {
      cursor: default;
    }

    @at-root .calendar__heading & {
      font-size: map-get($font-size, base-small);
      font-weight: 500;

      @include min-width(map-get($phone, sm)) {
        font-size: map-get($font-size, base);
      }
    }

    @at-root .calendar__content & {
      padding-top: 5px;
      padding-bottom: 5px;
      font-size: map-get($font-size, xs);
    }
  }

  .calendar__header {
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: $color-yellow;
    border-radius: 5px;

    .arrow-btn {
      display: flex;

      > span {
        display: none;
      }

      &::before {
        @include fontawesome;

        display: block;
        font-size: map-get($font-size, base);
        color: $color-black-light;
      }

      &.btn-prevmonth::before {
        content: '\f053';
      }

      &.btn-nextmonth::before {
        content: '\f054';
      }
    }
  }

  .calendar__body {
    padding-bottom: 5px;
  }

  .calendar__footer {
    padding-right: 10px;
    padding-left: 10px;
    display: flex;
    justify-content: flex-end;

    .reset-btn {
      font-size: map-get($font-size, base);

      &::before {
        @include fontawesome;

        content: '\f015';
        margin-right: 3px;
        color: $color-yellow;
      }
    }
  }

  .calendar__title {
    font-size: map-get($font-size, xs);
    text-align: center;
    cursor: pointer;

    > span {
      font-weight: 500;
      color: $color-black-light;
    }
  }
</style>
