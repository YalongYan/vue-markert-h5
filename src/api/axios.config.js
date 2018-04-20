// axios配置
import axios from 'axios';
// axios设置公共的headers
const token = localStorage.getItem('token');

axios.defaults.headers['X-Requested-With'] = 'XMLHttpRequest';
axios.defaults.headers['x-app-version'] = '1.0.0'; // 应用版本
axios.defaults.headers['x-client'] = 'H5'; // 客户端类型
axios.defaults.headers['x-access-token'] = token ? JSON.parse(token) : ''; // 从本地获取token

// axios设置request的拦截器 这里相当于没拦截
axios.interceptors.request.use((config) => {
  // 设置请求是否失败的标志位
  window.app.$store.dispatch('setNetworkError', false);
  return config;
}, (error) => {
  window.app.$store.dispatch('setNetworkError', true);
  return Promise.reject(error);
});
// axios设置response的拦截器data.code是120011的时候拦截了data.code不是0 的时候 用vux的toast提示组件 提示data.msg
axios.interceptors.response.use((response) => {
  window.app.$store.dispatch('setNetworkError', false);
  // window.app.$store.dispatch('setFetchLoading', true);
  if (response.data.code === 12011) {
    window.app.$router.replace({ name: 'login' });
  } else if (response.data.code !== 0) {
    window.app.$vux.toast.text(response.data.msg, 'middle');
  }
  if (response.data.code == 0) {
    // 每次请求成功把setFetchLoading设置成fale 隐藏loading
    window.app.$store.dispatch('setFetchLoading', false);
  }
  return response;
}, (err) => { // 这里是返回状态码不为200时候的错误处理
  window.app.$store.dispatch('setNetworkError', true);
  return Promise.reject(err);
});

export default axios;
