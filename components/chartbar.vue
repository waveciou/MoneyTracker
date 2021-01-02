<template>
  <client-only>
    <div class="chartItem">
      <Apexchart
        ref="chart"
        type="bar"
        :width="chartWidth"
        height="300px"
        :options="options"
        :series="series"
      />
    </div>
  </client-only>
</template>

<script>
import NoSSR from 'vue-no-ssr';

export default {
  data() {
    return {
      series: [],
      options: {
        chart: {
          type: 'bar',
          toolbar: {
            show: false
          },
          zoom: {
            enabled: false
          }
        },
        colors: ['#ff6670', '#8bc34a'],
        dataLabels: {
          enabled: false
        },
        xaxis: {
          categories: [],
          labels: {
            style: {
              colors: '#fff',
            }
          }
        },
        yaxis: {
          labels: {
            style: {
              colors: '#fff',
            },
            formatter: (value) => {
              return this.TO_CUSTOM_NUMBER_FORMAT(value);
            }
          }
        },
        fill: {
          opacity: 1
        },
        legend: {
          labels: {
            colors: '#fff',
          },
          horizontalAlign: 'left' 
        },
        tooltip: {
          enabled: true,
          theme: false
        }
      }
    };
  },
  components: {
    'client-only': NoSSR,
  },
  props: {
    seriesData: Array,
    xaxisList: Array
  },
  computed: {
    chartWidth() {
      let value = Math.ceil(this.xaxisList.length / 8);
      let result = value < 1 ? 100 : value * 100;
      return `${result}%`;
    }
  },
  watch: {
    seriesData: {
      immediate: true,
      handler(value) {
        this.series = value;
      }
    },
    xaxisList: {
      immediate: true,
      handler(value) {
        this.options.xaxis.categories = value;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
  @import '~/assets/scss/utils/_utils.scss';

  .chartItem {
    width: 100%;
    overflow-x: auto;
    overflow-y: hidden;
  }
</style>

<style lang="scss">
  @import '~/assets/scss/utils/_utils.scss';

  .chartItem {
    .apexcharts-tooltip {
      color: $color-black;
      background-color: $color-yellow;
    }

    .apexcharts-tooltip-title {
      color: $color-white;
      background-color: $color-black;
      line-height: 1.4em;
    }

    .apexcharts-tooltip-y-group {
      line-height: 1.4em;

      > span {
        color: $color-black;
      }
    }
  }
</style>