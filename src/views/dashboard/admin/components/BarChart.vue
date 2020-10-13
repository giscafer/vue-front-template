<template>
  <ve-bar-chart :data="chartData" :class="className" :height="height" theme="macarons" />
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
    return {
      chartData: {
        dimensions: {
          name: 'Week',
          data: ['Mon.', 'Tue.', 'Wed.', 'Thu.', 'Fir.', 'Sat.', 'Sun.']
        },
        measures: [
          {
            name: 'PV',
            data: [256, 767, 1356, 2087, 803, 582, 432]
          },
          {
            name: 'UV',
            data: [287, 707, 1756, 1822, 987, 432, 322]
          }
        ]
      }
    };
  },
  mounted() {},
  beforeDestroy() {},
  methods: {}
};
</script>
