<template>
  <ve-line-chart :data="chartData" :height="height" :settings="chartSettings" theme="macarons" :class="className" />
</template>

<script>
export default {
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: Number,
      default: 350
    },
    autoResize: {
      type: Boolean,
      default: true
    },
    data: {
      type: Object,
      required: true
    }
  },
  data() {
    this.chartSettings = {
      smooth: true
    };
    return {
      chartData: {
        dimensions: {
          name: 'Week',
          data: ['Mon.', 'Tue.', 'Wed.', 'Thu.', 'Fir.', 'Sat.', 'Sun.']
        },
        measures: [
          {
            name: 'expected',
            data: [],
            animationDuration: 2800,
            animationEasing: 'cubicInOut'
          },
          {
            name: 'actual',
            data: [],
            animationDuration: 2800,
            animationEasing: 'quadraticOut'
          }
        ]
      }
    };
  },
  watch: {
    data: {
      deep: true,
      handler({ expectedData, actualData }) {
        this.chartData.measures[0].data = expectedData;
        this.chartData.measures[1].data = actualData;
      }
    }
  },
  mounted() {
    this.chartData.measures[0].data = this.data.expectedData;
    this.chartData.measures[1].data = this.data.actualData;
  },

  methods: {}
};
</script>
