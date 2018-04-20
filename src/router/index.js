/*
*本文件主要用于定义我们 H5 app 的路由，采用的是Vue.js官方的路由插件vue-router，
*它和vue.js是深度集成的，适合用于构建单页面应用。
*vue的单页面应用是基于路由和组件的，路由用于设定访问路径，并将路径和组件映射起来。
*/
import Vue from 'vue';
import Router from 'vue-router';

const Home = () => import('@/pages/Home'); // 首页车辆管理
const Mine = () => import('@/pages/Mine'); // 个人中心
const Login = () => import('@/pages/Login'); // 登录页
const CarDetail = () => import('@/pages/CarDetail'); // 车辆详情
const CarDesc = () => import('@/pages/CarDesc'); // 车辆描述信息
const CarPicker = () => import('@/pages/CarPicker'); // 选择车辆品牌
const SearchList = () => import('@/pages/SearchList'); // 选择车辆品牌
const ImgList = () => import('@/pages/ImgList'); // 展示车辆照片
const NotFound = () => import('@/pages/NotFound'); // 页面不存在

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home',
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
      meta: { level: 1, isTab: true },
    },
    {
      path: '/mine',
      name: 'mine',
      component: Mine,
      meta: { level: 1, isTab: true, title: '我的账户' },
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: { level: 1 },
    },
    {
      path: '/cardetail/:id',
      name: 'cardetail',
      component: CarDetail,
      meta: { level: 3, title: '车辆详情' },
    },
    {
      path: '/carDesc/:id',
      name: 'carDesc',
      component: CarDesc,
      meta: { level: 4, title: '车辆描述' },
    },
    {
      path: '/carPicker',
      name: 'carPicker',
      component: CarPicker,
      meta: { level: 2, title: '车辆品牌' },
    },
    {
      path: '/searchList',
      name: 'searchList',
      component: SearchList,
      meta: { level: 2 },
    },
    {
      path: '/imgList',
      name: 'imgList',
      component: ImgList,
      meta: { level: 3, title: '车辆照片' },
    },
    {
      path: '*',
      name: 'notFound',
      component: NotFound,
      meta: { level: 1, title: '页面不存在' },
    },
  ],
});
