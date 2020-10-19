import Layout from '@/layout';

const demoRouter = {
  path: '/demo',
  component: Layout,
  redirect: '/demo/s-table',
  name: 'Demo',
  meta: {
    title: 'Demo',
    icon: 'table'
  },
  children: [
    {
      path: 'container-demo',
      component: () => import('@/views/demo/container-demo/index'),
      name: 'Container Demo',
      meta: { title: 'Container Demo' }
    },
    {
      path: 'table',
      component: () => import('@/views/demo/table/index'),
      name: 'STable Demo',
      meta: { title: 'STable Demo' }
    },
    {
      path: 'drag-table',
      component: () => import('@/views/table/drag-table'),
      name: 'DragTable',
      meta: { title: 'Drag Table' }
    }
  ]
};
export default demoRouter;
