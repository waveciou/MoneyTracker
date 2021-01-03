<template>
  <client-only>
    <div class="chartItem">
      <div v-if="seriesData.length > 0">
        <Apexchart
          type="pie"
          width="100%"
          height="300px"
          :options="options"
          :series="series"
        />
      </div>
      <p
        v-if="seriesData.length <= 0"
        class="none-tips"
      >
        目前尚無任何資料
      </p>
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
        colors: ['#50aaf8', '#32c8a4', '#f76c83', '#ffdf5e', '#94c962', '#ac93e8'],
        labels: [],
        legend: {
          labels: {
            colors: '#fff',
          },
          formatter: (seriesName) => {
            const index = parseInt(seriesName.substr(7)) - 1;
            return this.labelsData[index];
          }
        },
        tooltip: {
          y: {
            title: {
              formatter: (seriesName) => {
                const index = parseInt(seriesName.substr(7)) - 1;
                return `${this.labelsData[index]}:`;
              }
            }
          }
        },
        stroke: {
          width: 1
        }
      }
    };
  },
  components: {
    'client-only': NoSSR,
  },
  props: {
    seriesData: Array,
    labelsData: Array
  },
  watch: {
    seriesData: {
      immediate: true,
      handler(value) {
        this.series = value;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
  @import '~/assets/scss/utils/_utils.scss';
</style>