/*
* 这是Vue单页应用的根组件，统一设置导航栏，路由切换，底部菜单栏
* 页面跳转动画和原生交互等
* Vue基础开发参照：https://cn.vuejs.org/v2/guide/
* 市场H5项目主要功能是市场人员查看车辆详情，并且对车辆进行入场与出场控制。
*/
<template>
  <div id="app">
    <!-- 头部导航栏，首页不展示 -->
    <common-header v-show="isShowHeader" :title="currentPageTitle"  :back-display="backDisplay"></common-header>
    <common-loading v-show="fetchLoading"></common-loading>
    <div class="content" >
      <!-- 动画跳转实现，该项目只做了路由的左右切换，具体使用方式参照：https://cn.vuejs.org/v2/api/#transition -->
      <transition :name="transitionName">
        <!-- 页面缓存实现，具体使用参照：https://cn.vuejs.org/v2/api/#keep-alive -->
        <keep-alive :include="cachedComponents">
          <!-- 渲染路径匹配到的视图组件,具体参照：https://router.vuejs.org/zh-cn/api/router-view.html -->
          <router-view class="child-view" ></router-view>
        </keep-alive>
      </transition>
    </div>
    <!-- 底部导航菜单 -->
    <footer-tabs v-if="isShowTabbar" :tabNames="tabNames"></footer-tabs>
  </div>
</template>

<script>
/*
* 引入APP单页通用组件
*/
import { mapState, mapActions } from 'vuex';
import footerTabs from '@/components/footer-tabs';
import commonHeader from '@/components/common/common-header';
import commonLoading from '@/components/common/common-loading';

import api from '@/api';

// 引入底部菜单栏的图片
import homeIcon from '@/../static/image/tabs/tabbar_home_normal@2x.png';
import homeIconActive from '@/../static/image/tabs/tabbar_home_selected@2x.png';
import mineIcon from '@/../static/image/tabs/tabbar_my_normal@2x.png';
import mineIconActive from '@/../static/image/tabs/tabbar_my_selected@2x.png';

export default {
  name: 'app',
  /*
  * 在APP中应用组件，使用的是es6语法，如footerTabs对应的标签是<footer-tabs>
  */
  components: {
    footerTabs,
    commonHeader,
    commonLoading,
  },
  /*
  * APP对象变量，Vue语法建议data需要是一个函数
  * {string} transitionName：动画使用的方式，默认slide-left
  * {array} cachedComponents：需要被缓存的组件名字
  * {array} tabNames：APP底部tab设置
  */
  data() {
    return {
      transitionName: 'slide-left',
      cachedComponents: ['home'],
      tabNames: [
        { name: '车辆管理', icon: homeIcon, iconActive: homeIconActive, url: '/home' },
        { name: '个人中心', icon: mineIcon, iconActive: mineIconActive, url: '/mine' },
      ],
    };
  },
  /*
  * Vue的计算属性，计算和下面的侦听属性参照：https://cn.vuejs.org/v2/guide/computed.html
  */
  computed: {
    /*
    * 使用mapState从state的base.js中获得isShowHeader和currentPageTitle属性，
    * 从user.js中获得loginStatus属性
    */
    ...mapState({
      isShowHeader: state => state.base.isShowHeader,
      fetchLoading: state => state.base.fetchLoading,
      currentPageTitle: state => state.base.currentPageTitle,
      loginStatus: state => state.user.loginStatus,
      // token: state => state.user.token,
    }),
    isShowTabbar() {
      // 根据路由元信息决定是否 显示底部导航栏
      return this.$route.meta.isTab;
    },
    backDisplay() {
      // 根据路由元信息 来决定登录页、首页和个人中心 不展示后退图标
      return this.$route.meta.level > 1; //
    },
  },
  /*
  * Vue的侦听属性
  */
  watch: {
    $route(to, from) {
      const toLevel = Number(to.meta.level);
      const fromLevel = Number(from.meta.level);
      const toTitle = to.meta.title;

      this.setHeader(toTitle); // 设置头部导航栏的标题

      this.resetToLogin(); // 若发现未登录，强制跳转到未登录页面
      this.setRouteTransiton(toLevel, fromLevel); // 设置路由跳转的动画
      if (to.name === 'searchList' && from.name === 'home') {
        this.cachedComponents.push('searchList');
      }
      if (from.name === 'searchList' && to.name === 'home') {
        const index = this.cachedComponents.indexOf('searchList');
        if (index > -1) {
          this.cachedComponents.splice(index, 1);
        }
      }
    },
  },
  /*
  * Vue生命周期函数，具体Vue生命周期参照：https://cn.vuejs.org/v2/api/#选项 / 生命周期钩子
  */
  // mounted() {
  //   /*
  //   * 在mounted生命周期函数里调用getUserInfo，获得当前登录用户的信息
  //   */
  //   if (this.loginStatus) {
  //     this.getUserInfo();
  //   }
  // },
  methods: {
    ...mapActions(['setShowHeader', 'setCurrentPageTitle', 'setUserInfo']),
    /*
    * 请求登录用户信息，并且保存信息到vuex的state.user.userInfo
    */
    getUserInfo() {
      api.getUserInfo().then((res) => {
        this.setUserInfo(res.data.data);
      });
    },
    /*
    * 页面头的显示设置函数
    */
    setHeader(toTitle) {
      // 设置页面切换后的头部标题
      this.setCurrentPageTitle(toTitle);
      /*
      * 'home', 'login', 'searchList'页面不显示common header
      */
      const pagesNoHeader = ['home', 'login', 'searchList'];

      if (pagesNoHeader.indexOf(this.$route.name) !== -1) {
        // 对首页的导航栏进行特殊处理
        this.setShowHeader(false);
      } else {
        this.setShowHeader(true);
      }
    },
    /*
    * 如果没有登录，自动跳转到login的页面
    */
    resetToLogin() {
      // 强制未登录的页面跳转到登录页面
      if (!this.loginStatus) {
        this.$router.replace({
          name: 'login',
        });
      }
    },
    /*
    * 设置路由时候的动画，根据路由的level来确定路由的动画选择
    */
    setRouteTransiton(toLevel, fromLevel) {
      // 如果是切换底部tab或首次打开h5 不加动画
      if (toLevel === 1 && fromLevel === 1 || !fromLevel) {
        this.transitionName = '';
      } else {
        // 根据路由 元信息的层级判断 切换的动画
        this.transitionName = toLevel < fromLevel ? 'slide-right' : 'slide-left';
      }
    },
  },
};
</script>

<style lang="scss">
@import "assets/css/common";

html,body {
  height: 100%;
  width: 100%;
  overflow: hidden;
  margin:0;
  padding:0;
}

input:focus {
  outline: none;
}

#app {
  @include flexbox;
  flex-direction: column;
  height: 100%;
  background: #f8f8f8;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  .content {
     flex: 1;
     height: 100%;
     overflow-y: auto;
     overflow-x: hidden;

     .child-view {
       height: 100%;
     }
  }

  .slide-left-enter-active {
    animation: slideLeft .3s;
  }
  .slide-right-enter-active {
    animation: slideRight .3s;
  }
  .fold-enter-active, .fold-leave-active {
    transition: transform .3s ease-in;
  }
  .fold-enter, .fold-leave-active {
    transform: translate3d(0, 100%, 0);
  }

  @keyframes slideLeft {
    from {
      transform: translate3d(100%, 0, 0);
      visibility: visible;
    }
    to {
      transform: translate3d(0, 0, 0);
    }
  }

  @keyframes slideRight {
    from {
      transform: translate3d(-100%, 0, 0);
      visibility: visible;
    }
    to {
      transform: translate3d(0, 0, 0);
    }
  }
}
</style>
