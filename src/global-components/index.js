import Vue from 'vue';
// 利用require.context特性，注册所有全局组件
const componentsContext = require.context('./', true, /\.js$/);
componentsContext.keys().filter(path => path !== './index.js').forEach(path => {
  const componentConfig = componentsContext(path);
  // 获取导出来的对象
  const component = componentConfig.default || componentConfig;
  Vue.component(component.name, component);
});
