/**
 * 需要全局注册的组件才在此引入，否则建议页面内按需加载
 */

import Vue from 'vue';
import STable from './Table';

Vue.component('STable', STable);
