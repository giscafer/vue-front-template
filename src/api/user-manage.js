import { get } from '@/shared/request';

export function fetchList(query) {
  return get('/vue-admin-template/user/list', query)
}
