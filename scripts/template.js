module.exports = {
  vueTemplate: componentName => {
    return `<template>
  <div>
    ${componentName}组件
  </div>
</template>

<script>
export default {
  name: '${componentName}'
};
</script>

<style lang="less" scoped>
  .${componentName} {

  }
</style>
`;
  },
  entryTemplate: `import Main from './main.vue';
export default Main;
`,
  routeTemplate: name => {
    return `import BasicLayout from '@/layout/BasicLayout';
export default {
  path: '/${name}',
  component: BasicLayout,
  redirect: '/${name}/index',
  children: [
    {
      path: 'index',
      component: () => import(/* webpackChunkName: "${name}" */ '@/views/${name}')
    }
  ]
};
`;
  }
};
