import BasicLayout from '@/layout/BasicLayout';
export default {
  path: '/excel',
  component: BasicLayout,
  redirect: '/excel/index',
  children: [
    {
      path: 'index',
      component: () => import(/* webpackChunkName: "excel" */ '@/views/excel')
    }
  ]
};
