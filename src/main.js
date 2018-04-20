/* eslint-disable */
/*
*这是h5 vue单页应用的入口文件
*创建 vue 对象实例，引入全局插件，挂载根组件，注册路由和全局状态管理
*/
/* eslint-enable */
import Vue from 'vue';
import FastClick from 'fastclick';
import { ToastPlugin } from 'vux';
import 'lib-flexible'; // 引入淘宝移动端布局库

import App from '@/App';
import router from '@/router';
import store from '@/vuex'; // 引入公共数据管理配置
import '@/lib/filter'; // 引入全局注册的过滤器，用于格式化数据

Vue.config.productionTip = false;
Vue.use(ToastPlugin);
// 添加Fastclick移除移动端点击延迟
FastClick.attach(document.body);

/* eslint-disable no-new */
window.app = new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  store,
});
