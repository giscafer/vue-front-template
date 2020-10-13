import Vue from 'vue';

// 为了减少体积按需引入 https://vueblocks.github.io/ve-charts/#/base-usage

import { VeBarChart, VeLineChart, VePieChart, VeDonutChart, VeRadarChart, VeScatterChart } from 've-charts'; // 引入单个图表
require('echarts/theme/macarons'); // echarts theme，可根据具体情况修改解决UI样式的主题，这样自定义样式就少很多工作量

Vue.component('VeBarChart', VeBarChart);
Vue.component('VeLineChart', VeLineChart);
Vue.component('VePieChart', VePieChart);
Vue.component('VeDonutChart', VeDonutChart);
Vue.component('VeRadarChart', VeRadarChart);
Vue.component('VeScatterChart', VeScatterChart);
