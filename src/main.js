import Vue from 'vue';

import 'normalize.css/normalize.css'; // a modern alternative to CSS resets
import '@/plugins'; // 第三方插件使用
import '@/styles/index.scss'; // global css，在plugins之后引入，有些样式可以直接覆盖
import App from './App';
import store from './store';
import router from './router';

import './icons'; // icon
import './permission'; // permission control
import './directive/global';

import * as filters from './filters'; // global filters

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock');
  mockXHR();
}

// register global utility filters
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key]);
});

Vue.config.productionTip = false;

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
});
