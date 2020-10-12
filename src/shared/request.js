import { getToken } from '@/shared/auth';
import store from '@/store';
import axios from 'axios';
import { Message, MessageBox } from 'element-ui';
import {
  ERR_MESSAGE_SHOW_DURATION,
  REQ_OVERTIME_DURATION,
  RES_PERMISSION_DENIED_CODE,
  RES_SUCCESS_DEFAULT_CODE,
  RES_UNAUTHORIZED_CODE
} from './constants';

// 数据订阅中心
export const DATACENTER_BASE_URL = process.env.VUE_APP_DATACENTER_API;

const ignoreInterceptor = resp => {
  if (resp.config.url.indexOf('.md') > -1) {
    return true;
  }
  if (resp.config.params && resp.config.params.ignoreInterceptor) {
    return true;
  }
  return false;
};

// create an axios instance
const service = axios.create({
  baseURL: `${process.env.VUE_APP_BASE_API}`, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: REQ_OVERTIME_DURATION // request timeout
});

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent

    if (store.getters.token) {
      // let each request carry token
      // ['X-Access-Token'] is a custom headers key
      // please modify it according to the actual situation
      config.headers['X-Access-Token'] = getToken();
    }
    config.headers['Content-Type'] = 'application/json';
    return config;
  },
  error => {
    // do something with request error
    console.log(error); // for debug
    return Promise.reject(error);
  }
);

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data;
    // if the custom code is not 2000, it is judged as an error.
    if (res.code !== RES_SUCCESS_DEFAULT_CODE && !ignoreInterceptor(response)) {
      // 4010: Illegal token; Other clients logged in;  Token expired;
      if (res.code === RES_UNAUTHORIZED_CODE) {
        // to re-login
        MessageBox.confirm('您已经登出，您可以取消以停留在此页面，或再次登录', '确认注销', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          logout();
        });
      } else if (res.code === RES_PERMISSION_DENIED_CODE) {
        // token不存在,请重新登录账户
        Message({
          message: res.desc || res.message || 'Error',
          type: 'error',
          duration: ERR_MESSAGE_SHOW_DURATION
        });
        setTimeout(() => {
          logout();
        }, 1000);
      } else {
        Message({
          message: res.desc || res.message || 'Error',
          type: 'error',
          duration: ERR_MESSAGE_SHOW_DURATION
        });
      }
      return Promise.reject(new Error(res.message || 'Error'));
    } else {
      return res;
    }
  },
  error => {
    console.log('err', error); // for debug
    Message({
      message: error.desc || error.message || '服务器出错',
      type: 'error',
      duration: 5 * 1000
    });
    return Promise.reject(error);
  }
);

/* const service2 = axios.create({
  baseURL: DATACENTER_BASE_URL,
  timeout: REQ_OVERTIME_DURATION
});  */

export function post(endpoint, params) {
  return service.post(endpoint, params);
}

export function get(endpoint, params) {
  return service.get(endpoint, {
    params: { ...params }
  });
}
/**
 * 后端没有服务统一转发，多了BASE_URL地址，多写一个
 */
export function postDataReaderCenter(endpoint, params, headers = {}) {
  return service.post(endpoint, params, {
    baseURL: `${DATACENTER_BASE_URL}/api/tech`,
    headers
  });
}
/**
 * 后端没有服务统一转发，多了BASE_URL地址，多写一个
 */
export function getDataReaderCenter(endpoint, params, headers = {}) {
  return service.get(endpoint, {
    baseURL: `${DATACENTER_BASE_URL}/api/tech`,
    headers,
    params: { ...params }
  });
}

function logout() {
  store.dispatch('user/resetToken').then(() => {
    if (reloadExcept()) {
      location.reload();
    }
  });
}

function reloadExcept() {
  return location.pathname.indexOf('/login') === -1;
}

export default service;
