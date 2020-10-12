import request from '@/shared/request';

export function fetchList(query) {
  return request({
    url: '/vue-admin-template/user/list',
    method: 'get',
    params: query
  });
}
