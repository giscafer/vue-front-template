/** When your routing open-middle-platform is too long, you can split it into small modules **/

import Layout from '@/layout';

const openMiddlePlatformRouter = {
  path: '/open',
  component: Layout,
  redirect: '/open/user-manage',
  name: '开放中台',
  meta: {
    title: '开放中台',
    icon: 'international'
  },
  children: [
    {
      path: 'user-manage',
      component: () => import('@/views/open/user-manage/index'),
      name: 'UserManage',
      meta: { title: '用户管理' }
    },
    {
      path: 'api-manage',
      component: () => import('@/views/open/user-manage/index'),
      name: 'ApiManage',
      meta: { title: 'API 管理' }
    }
  ]
};
export default openMiddlePlatformRouter;
