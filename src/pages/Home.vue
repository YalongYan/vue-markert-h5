/*
* Home主页，home中包含头部的查询搜索栏，包括品牌和模糊搜索框。
* 主体部分是车辆列表根据车辆不同的状态分为：
* '场内在售', '未入场', '待入场', '待出场', '已出场'
* 品牌和车辆状态并集显示
* 列表实现定位，从车辆详情和个人信息返回到列表保持跳转之前的状态
* 如果在车辆详情修改了车辆状态，定位位置由列表后车辆补上
* 从品牌和搜索跳转到列表页面时不做定位
*/
<template>
  <div class="home-container">
    <home-header @goCarPicker="goCarPicker" @goSearchPage="goSearchPage"></home-header>
    <!-- tab切换组件，通过tabIndex来展示不同tab对应的内容 -->
    <tab class="tab-container" :line-width="2" custom-bar-width="60px" active-color="#368cda" v-model="tabIndex">
      <tab-item v-for="(item, index) in tabNameList" :key="index"
        @on-item-click="onItemClick"
      >
        {{item}}
      </tab-item>
    </tab>
    <!-- 请求出错处理 -->
    <network-error v-if="isReqError"></network-error>
    <div v-else class="home-list">
      <nocar-page v-if="nodata === true" :noCarText="'暂无车源'"></nocar-page>
      <div v-else>
        <common-scroll
          ref="scroll"
          :data="carList"
          :scrollbar="scrollbarObj"
          :pullDownRefresh="pullDownRefreshObj"
          :pullUpLoad="pullUpLoadObj"
          :startY="parseInt(startY)"
          @pullingDown="onPullingDown"
          @pullingUp="onPullingUp"
        >
          <div slot="scroll-list">
            <car-list :carList="carList" @getCarList_change="getCarList" @phoneCall="phoneCall" style="min-height: 95vh"></car-list>
          </div>
        </common-scroll>
      </div>
    </div>
    <common-dialog  title="拨打电话" tip="确定拨打电话" @cancel="cacelCall" @confirm="confirmCall" :show="showCallDialog" :mobile="mobileToCall"></common-dialog>
  </div>
</template>

<script>
import { Tab, TabItem } from 'vux';
import { mapState, mapActions } from 'vuex';
import homeHeader from '@/components/home-header';
import commonScroll from '@/components/common/common-scroll';
import nocarPage from '@/components/common/common-nocar-page';
import carList from '@/components/car-list';
import commonDialog from '@/components/common-dialog';
import networkError from '@/components/network-error';

import api from '@/api';
import { setPage } from '@/lib/method';

export default {
  name: 'home',
  components: {
    Tab,
    TabItem,
    homeHeader,
    commonScroll,
    nocarPage,
    carList,
    commonDialog,
    networkError,
  },
  /*
  * {string} mobileToCall: 要拨打的电话
  * {boolean} showCallDialog: 是否显示拨打电话框
  * {array} tabNameList: tab标签的名字
  * {number} tabIndex: tab标签当前位置
  * {boolean} nodata: 是否获得车辆数据
  * {array} carList: 获得的车辆列表
  * {number} totalPage: 总页数
  * {object} params: 请求参数
  * {number} startY: 滚动开始位置
  * {boolean} nomore: 是否还有更多数据
  * {boolean} pullDownRefresh: 是否同意下拉
  * {number} pullDownRefreshThreshold: 下拉条目限制
  * {number} pullDownRefreshStop: 下拉停止条目限制
  * {boolean} pullUpLoad: 是否同意上拉
  * {number} pullUpLoadThreshold: 上啦条目显示
  * {string} pullUpLoadMoreTxt: 上拉提示
  * {string} pullUpLoadNoMoreTxt: 上啦没有数据提示
  */
  data() {
    return {
      mobileToCall: '',
      showCallDialog: false,
      tabNameList: ['场内在售', '未入场', '待入场', '待出场', '已出场'],
      tabIndex: 0,
      nodata: false,
      carList: [],
      totalPage: 0,
      params: {
        marketStatus: 1,
        pageNo: 1,
        pageSize: 10,
      },
      startY: 0,
      nomore: '',
      pullDownRefresh: true,
      pullDownRefreshThreshold: 40,
      pullDownRefreshStop: 40,
      pullUpLoad: true,
      pullUpLoadThreshold: 0,
      pullUpLoadMoreTxt: '上拉加载更多',
      pullUpLoadNoMoreTxt: '没有更多数据了',
    };
  },
  computed: {
    /*
    * 获得从carpicker中对cardata设置的数据
    */
    ...mapState({
      carData: state => state.carPicker.carData,
      isReqError: state => state.base.isReqError,
    }),
    scrollbarObj() {
      return this.scrollbar ? { fade: this.scrollbarFade } : false;
    },
    pullDownRefreshObj() {
      return this.pullDownRefresh ? {
        threshold: parseInt(this.pullDownRefreshThreshold, 10),
        stop: parseInt(this.pullDownRefreshStop, 10),
      } : false;
    },
    pullUpLoadObj() {
      return this.pullUpLoad ? { threshold: parseInt(this.pullUpLoadThreshold, 10), txt: { more: this.pullUpLoadMoreTxt, noMore: this.pullUpLoadNoMoreTxt } } : false;
    },
  },
  watch: {
    scrollbarObj() {
      this.rebuildScroll();
    },
    pullDownRefreshObj() {
      this.rebuildScroll();
    },
    pullUpLoadObj() {
      this.rebuildScroll();
    },
    startY() {
      this.rebuildScroll();
    },
  },
  /*
  * 因为home设置了keep alive，所以会调用activated的生命周期hook，生命周期具体参照APP.vue
  * 中的链接
  */
  activated() {
    this.params.pageNo = 1;// 从别的页面跳转回到该页面时设置请求第一页
    this.getCarList(this.tabIndex);// 请求api获得当前状态下车辆的列表
    /*
    * 设置跳转到home页后的位置，从个人信息和车辆详情返回实现定位
    */
    const scroll = this.$refs.scroll;
    if (scroll) {
      scroll.refresh();
      scroll.scrollTo(0, this.scrollY);
    }
  },
  /*
  * 在跳转到'mine', 'cardetail'的之前记录当前的y轴数据，并且设置请求的数据为第一页但数据量
  * 为当前页数乘以10
  */
  beforeRouteLeave(to, from, next) {
    if (['mine', 'cardetail'].indexOf(to.name) === -1) {
      this.scrollY = this.startY;
    } else if (this.$refs.scroll) { // 列表数据为空时 页面没渲染 所以this.$refs.scroll是undefine
      this.scrollY = this.$refs.scroll.scroll.y;
      this.params.pageSize = this.params.pageNo * 10;
    }
    next();
  },
  // 在create之前把setFetchLoading 设置成true 显示loading
  beforeCreate: function () {
    window.app.$store.dispatch('setFetchLoading', true);
  },
  methods: {
    /*
    * 从vuex中拿到需要的方法
    */
    ...mapActions(['setCarBrand', 'setCarSeries', 'setCarType']),
    /*
    * 滚轮的重新构建方法
    */
    rebuildScroll() {
      this.$nextTick(() => {
        this.$refs.scroll.initScroll();
      });
    },
    /*
    * 确定拨打电话按钮处理函数
    */
    confirmCall() {
      this.showCallDialog = false;
      window.location.href = `tel://${this.mobileToCall}`;
    },
    /*
    * 放弃拨打电话按钮处理函数
    */
    cacelCall() {
      this.showCallDialog = false;
    },
    /*
    * 点击电话显示拨打电话确认框
    */
    phoneCall(mobile) {
      this.showCallDialog = true;
      this.mobileToCall = mobile;
    },
    /*
    * 使tab标签和车辆的状态对应，并且与车辆品牌形成并集
    */
    setParams(status) {
      switch (status) {
        case 0: {
          this.params.marketStatus = 3;// 场内在售
          break;
        }
        case 1: {
          this.params.marketStatus = 1;// 未入场
          break;
        }
        case 2: {
          this.params.marketStatus = 2;// 待入场
          break;
        }
        case 3: {
          this.params.marketStatus = 4;// 待出场
          break;
        }
        case 4: {
          this.params.marketStatus = 5;// 已出场
          break;
        }
        default: {
          this.params.marketStatus = 3;// 默认场内在售
        }
      }
      this.params.brandId = this.carData.brand.value ? this.carData.brand.value : -1;
      this.params.seriesId = this.carData.series.value ? this.carData.series.value : -1;
      this.params.motorcycleTypeId = this.carData.type.value ? this.carData.type.value : -1;
    },
    /*
    * 获取车辆列表信息
    */
    getCarList() {
      this.setParams(this.tabIndex);
      api.getCarList(this.params).then((res) => {
        this.carList = res.data.data.record;
        /*
        * 设置定位之后，从汽车详情页返回仍旧需要请求carlist，但是为了实现定位需要重写pageSize。
        * 如果在active中重新设置pageSize到10的话，因为异步原因，请求的pageSize会为10，不是
        * 期望的pageSize，所以讲pageSize的重置放到此处。
        */
        this.params.pageSize = 10;
        this.totalPage = setPage(res.data.data.total, this.params.pageSize);
        if (res.data.data.total == 0) { // 没有请求到数据的时候
          this.nodata = true;
        } else if (res.data.data.total < 10) { // 请求的数据少于10条的时候
          this.pullDownRefresh = true;
          this.pullUpLoad = false;
          this.nomore = true;
          this.nodata = false;
        } else {
          this.pullDownRefresh = true;
          this.pullUpLoad = true;
          this.nomore = false;
          this.nodata = false;
        }
      });
    },
    /*
    * tab标签点击时处理函数，点击标签获得该标签对应的该状态的车辆列表
    */
    onItemClick(index) {
      this.tabIndex = index;
      this.params.pageNo = 1;
      this.getCarList(index);
    },
    /*
    * 跳转到search页
    */
    goSearchPage() {
      this.$router.push({ name: 'searchList' });
    },
    /*
    * 跳转到车辆品牌选择页
    */
    goCarPicker() {
      this.$router.push({ name: 'carPicker' });
    },
    /*
    * 下拉时的处理函数
    */
    onPullingDown() {
      this.params.pageNo = 1;
      setTimeout(() => {
        this.getCarList(this.tabIndex);
      }, 1000);
    },
    /*
    * 上拉时的处理函数
    */
    onPullingUp() {
      this.setParams(this.tabIndex);
      setTimeout(() => {
        this.params.pageNo++;// 上拉请求的页数加1
        if (this.params.pageNo <= this.totalPage) { // 根据总页数决定是否继续请求数据
          let newPage = [];
          api.getCarList(this.params).then((res) => {
            newPage = res.data.data.record;
            this.totalPage = setPage(res.data.data.total, this.params.pageSize);
            this.carList = this.carList.concat(newPage);
          });
        } else {
          // 如果没有新数据
          this.$refs.scroll.forceUpdate();
        }
      }, 1000);
    },
  },
};
</script>
<style lang="scss" scoped>
@import "../assets/css/common";
.home-container{
  width: 100%;
  .tab-container {
    background-color: $bgfff;
    z-index: 10;
  }
  .home-list{
    position:relative;
    height:calc(100% - 80px);
    overflow: auto;
  }
}
</style>
