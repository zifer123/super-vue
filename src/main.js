import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

// 注册全局组件
import './global-components';
// 注册全局过滤器
import './filters';

Vue.config.productionTip = false;


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
