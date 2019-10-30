import axios from 'axios';
import router from '../router';

const instance = axios.create({
  timeout: 60000,
  baseURL: process.env.VUE_APP_BASE_API
});

instance.interceptors.request.use((config) => {
  // const token = localStorage.getItem('token');
  // if (token) {
  //   config.headers['Authorization'] = token;
  // }
  // 显示菊花图
  // loading.start();
  return config;
}, (err) => {
  return Promise.reject(err);
});

instance.interceptors.response.use((response) => {
  // if (loading) {
  //   // 关闭菊花图
  //   loading.close();
  // }
  if (response.status === 200) {
    return Promise.resolve(response);
  } else {
    return Promise.reject(response);
  }
}, (err) => {
  // if (loading) {
  //   // 关闭菊花图
  //   loading.close();
  // }
  const responseCode = err.response.status;
  // 断网处理
  if (!err.response) {
    if (err.message.includes('timeout')) {
      console.log('请求超时,请检查网络是否正常');
    } else {
      console.log('请求失败，请检查网络连接状态');
    }
    return;
  }
  switch (responseCode) {
    case 401:
      router.replace({
        path: '/login'
      });
      break;
    case 403:
      console.log('登陆信息已失效，请重新登陆');
      setTimeout(() => {
        router.replace({
          path: '/login'
        });
      }, 1000);
      break;
    case 404:
      console.log('网络请求不存在');
      break;
    default:
      console.log(err.response.data.message);
  }
  return Promise.reject(err);
});

export const uploadFile = (url, formData) => {
  return instance.request({
    method: 'post',
    url,
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
};

export default instance;
