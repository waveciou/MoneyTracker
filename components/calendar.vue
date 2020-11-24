<template>
  <div class="calendar">
    <div class="calendar__header">
      <a
        href="javascript:;"
        class="arrow-btn btn-prevmonth"
        @click.prevent="changeMonth(false)"
      >Prev</a>
      <div
        class="calendar__title"
        @click.prevent="backToToday()"
      >
        <span class="caption-year">{{ current.year }} 年</span>
        <span class="caption-month">{{ current.month }} 月</span>
      </div>
      <a
        href="javascript:;"
        class="arrow-btn btn-nextmonth"
        @click.prevent="changeMonth(true)"
      >Next</a>
    </div>
    <div class="calendar__body">
      <ul class="calendar__heading">
        <li
          v-for="item in heading"
          :key="item"
        >
          <div class="calendar__item">
            {{ item }}
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
              'current': item.current === true
            }"
            @click.prevent="getDateData(item)"
          >{{ item.number }}</a>
        </li>
      </ul>
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
        date: 0
      },
      today: {
        year: 0,
        month: 0,
        date: 0
      },
      heading: ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']
    };
  },
  mounted() {
    this.getTodayData();
    this.backToToday();
  },
  methods: {
    changeMonth(isNext) {
      let _month = this.current.month;
      let month = isNext === true ? _month + 1 : _month - 1;

      if (month <= 0) {
        month = 12;
        this.current.year = this.current.year - 1;
      }

      if (month > 12) {
        month = 1;
        this.current.year = this.current.year + 1;
      }

      this.current.month = month;
      this.current.date = 1;
    },
    getDateData(data) {
      if (data.none === true) {
        return false;
      } else {
        if (data.years === this.current.year && data.month === this.current.month && data.date === this.current.date) {
          return false;
        } else {
          this.current.year = data.years;
          this.current.month = data.month;
          this.current.date = data.date;
        }
      }
    },
    backToToday() {
      this.current.year = this.today.year;
      this.current.month = this.today.month;
      this.current.date = this.today.date;
    },
    getTodayData() {
      this.today.year = this.$dayjs().year();
      this.today.month = this.$dayjs().month() + 1;
      this.today.date = this.$dayjs().date();
    }
  },
  computed: {
    buildCalendar() {
      let myYears = this.current.year;
      let myMonth = this.current.month;
      let myDate = this.current.date;

      let monthText = myMonth < 10 ? `0${myMonth}` : myMonth.toString();

      let dateArray = [];

      let totalDate = this.$dayjs(`${myYears}-${monthText}`).daysInMonth();
      let week = this.$dayjs(`${myYears}-${monthText}`).format('d');

      for (let i = 0; i < totalDate; i++) {
        let dateNum = i + 1;
        let isToday = false;
        let isCurrent = false;
        let dateText = '';

        if (myYears === this.today.year && myMonth === this.today.month && dateNum === this.today.date) {
          isToday = true;
        }

        if (dateNum === myDate) {
          isCurrent = true;
        }

        dateNum < 10 ? dateText = `0${dateNum}` : dateText = dateNum.toString();

        let result = {
          id: `${myYears}-${myMonth}-${dateNum}`,
          years: myYears,
          month: myMonth,
          date: dateNum,
          number: dateText,
          today: isToday,
          current: isCurrent
        };

        dateArray.push(result);
      }

      // 補上前面的日期
      for (let i = 0; i < week; i++) {
        let obj = {
          number: '',
          none: true
        };
        dateArray.splice(i, 0, obj);
      }

      // 補上後面的日期
      let patchNum = (dateArray.length % 7 === 0) ? 0 : 7 - (dateArray.length % 7);

      for (let i = 0; i < patchNum; i++) {
        let obj = {
          number: '',
          none: true
        };
        dateArray.splice(dateArray.length, 0, obj);
      }

      return dateArray;
    }
  }
};
</script>

<style lang="scss" scoped>
@import '~/assets/scss/utils/_utils.scss';

$color-gray: #f2f2f2;
$color-gray-default: #e5e5e5;
$color-gray-dark: #929292;

.calendar {
  margin-top: 1rem;
  margin-bottom: 1rem;
  overflow: hidden;
  border-radius: 7px;
}

.calendar__heading,
.calendar__content {
  width: 100%;
  display: flex;
  flex-wrap: wrap;

  > li {
    width: 14.2857142%;
  }
}

.calendar__item {
  width: 100%;
  height: 100%;
  padding-top: 10px;
  padding-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: $color-black;
  border-radius: 3px;
  transition: all 0.3s;

  &.current {
    background-color: $color-gray-default;
  }

  &.is-today {
    color: $color-white;
    background-color: $color-black;
  }
}

.calendar__header {
  padding: 15px 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: $color-gray-default;

  .arrow-btn {
    display: flex;
    font-size: 0;

    &::before {
      content: '';
      width: 0;
      height: 0;
      display: block;
      border-style: solid;
    }

    &.btn-prevmonth::before {
      border-width: 10px 13px 10px 0;
      border-color: transparent $color-black transparent transparent;
    }

    &.btn-nextmonth::before {
      border-width: 10px 0 10px 13px;
      border-color: transparent transparent transparent $color-black;
    }
  }
}

.calendar__title {
  font-size: map-get($font-size, sm);
  text-align: center;
  cursor: pointer;
}

.calendar__heading {
  padding-right: 5px;
  padding-left: 5px;
  background-color: $color-gray;

  .calendar__item {
    color: $color-black;
  }
}

.calendar__content {
  padding: 5px;
  position: relative;
  background-color: $color-white;

  .calendar__item {
    font-size: map-get($font-size, sm);
    cursor: pointer;
  }
}
</style>