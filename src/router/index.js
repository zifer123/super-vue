import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [];

const routesConfig = require.context('./', true, /\.js$/);
routesConfig.keys().filter(path => path !== './index.js').forEach(path => {
  const routeModule = routesConfig(path);
  routes.push(routeModule.default || routeModule);
});

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
