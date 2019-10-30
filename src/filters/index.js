import Vue from 'vue';
const moduleContext = require.context('./', true, /\.js$/);
moduleContext.keys().filter(path => path !== './index.js').forEach(path => {
  const m = moduleContext(path);
  const mDefault = m.default || m;
  Vue.filter(mDefault.name, mDefault);
});
