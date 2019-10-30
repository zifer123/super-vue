const CompressionPlugin = require('compression-webpack-plugin');

const isProd = process.env.NODE_ENV === 'production';
const cdnDomain = 'https:/aaa.bbb.com';
module.exports = {
  publicPath: isProd ? cdnDomain : '/', // 配置cdn厂商
  chainWebpack: config => {
    // 对环境的配置（可以去掉，vue/cli本来就对.env文件做了处理）
    config.plugin('define').tap(args => {
      args[0]['process.env'].BASE_URL = JSON.stringify(process.env.BASE_URL)
      return args;
    });

    // gzip处理
    if (process.env.NODE_ENV === 'production') {
      config.plugin('compression').use(CompressionPlugin, {
        asset: '[path].gz[query]',
        algorithm: 'gzip',
        test: new RegExp('\\.(' + ['js', 'css'].join('|') + ')$'),
        threshold: 10240,
        minRatio: 0.8,
        cache: true
      });
    }

    // cdn处理
    const externals = {
      vue: 'Vue',
      axios: 'axios',
      'vue-router': 'VueRouter',
      vuex: 'vuex'
    };
    config.externals(externals);

    const cdn = {
      css: [],
      js: [
        'https://cdn.bootcss.com/vue/2.6.10/vue.min.js', // vue
        'https://cdn.bootcss.com/vuex/3.1.1/vuex.min.js', // vuex
        'https://cdn.bootcss.com/vue-router/3.1.3/vue-router.min.js', // vue-router
        'https://cdn.bootcss.com/axios/0.19.0-beta.1/axios.min.js' // axios
      ]
    };
    config.plugin('html').tap(args => {
      args[0].cdn = cdn;
      return args;
    });
  }
};
