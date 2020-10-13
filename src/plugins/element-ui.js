import Vue from 'vue';
import Element from 'element-ui';
import Cookies from 'js-cookie';
import '@/styles/element-variables.scss';

Vue.use(Element, {
  size: Cookies.get('size') || 'medium' // set element-ui default size
});
