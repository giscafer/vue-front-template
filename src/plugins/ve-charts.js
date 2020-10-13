import Vue from 'vue';

// 为了减少体积按需引入 https://vueblocks.github.io/ve-charts/#/base-usage

import { VeBarChart, VeLineChart, VePieChart, VeDonutChart, VeScatterChart } from 've-charts'; // 引入单个图表

Vue.component('VeBarChart', VeBarChart);
Vue.component('VeLineChart', VeLineChart);
Vue.component('VePieChart', VePieChart);
Vue.component('VeDonutChart', VeDonutChart);
Vue.component('VeScatterChart', VeScatterChart);
