<template>
  <ve-pie-chart
    :data="chartData"
    :settings="chartSettings"
    :class="className"
    :height="height"
    legend-position="bottom-center"
    theme="macarons"
  />
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
      default: 300
    }
  },
  data() {
    this.chartSettings = {
      roseType: 'radius',
      radius: [15, 95],
      left: 'center',
      bottom: '10'
    };
    return {
      chartData: {
        dimensions: {
          name: 'type',
          data: ['Industries', 'Technology', 'Forex', 'Gold', 'Forecasts']
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        measures: [
          {
            name: 'WEEKLY WRITE ARTICLES',
            data: [320, 240, 149, 100, 59],
            animationEasing: 'cubicInOut',
            animationDuration: 2600
          }
        ]
      }
    };
  },
  mounted() {},

  methods: {}
};
</script>
