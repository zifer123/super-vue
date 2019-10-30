import BasicLayout from '@/layout/BasicLayout';
export default {
  path: '/dashboard',
  component: BasicLayout,
  redirect: '/dashboard/index',
  children: [
    {
      path: 'index',
      component: () => import(/* webpackChunkName: "dashboard" */ '@/views/dashboard')
    }
  ]
};
