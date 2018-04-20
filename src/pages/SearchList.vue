<!-- 这是搜索页面,输入内容点击回车 或者点击搜索都可以进行数据查询 -->
<template>
  <div class="search-container">
    <!-- 这是搜索页面的头部组件
     通过 @searchCars="searchCars" 把当前页面的searchCars方法传递给search-heade 子组件
    通过@goHomePage="goHomePage 把当前页面的goHomePage方法传递给 search-heade子组件 -->
    <search-header @searchCars="searchCars" @clearList="clearList" @goHomePage="goHomePage"></search-header>
    <!-- 请求出错处理 -->
    <network-error v-if="isReqError"></network-error>
    <!-- <car-search-list></car-search-list> -->
    <div v-else class="search-list-container">
      <div class="result-wrap">
        <!-- dataStatus初始值是0  展示初始页面  获取值之后如果数据为0条  dataStatus是2 如果数据不是0条 dataStatus是1 -->
       <!-- 初始页面 -->
       <!-- dataStatus是0 的时候 展示初始页面 -->
       <div v-if="dataStatus===0" class="result-init-page">
          <div>精确搜索</div>
          <div>快速找到要找的车辆</div>
        </div>
       <!-- 没有数据的时候 -->
       <!-- dataStatus是2 的时候 展示暂无搜页面 -->
        <div v-else-if="dataStatus===2" class="result-no-data">
          <img src='@/../static/image/search/blank@2x.png' class='search-result-img' />
          <div class="search-result-tips">暂无搜索结果</div>
        </div>
        <!-- 有数据的时候 -->
        <!-- dataStatus是1 的时候 展示列表页面 -->
        <div v-else class="search-list">
          <!-- common-scroll是下拉加载组件 -->
          <!-- 只要想要在Vue中直接操作DOM元素，就必须用ref属性进行注册 参考链接http://blog.csdn.net/tian361zyc/article/details/72884272 -->
          <common-scroll
            ref="scroll"
            :data="carList"
            :scrollbar="scrollbarObj"
            :pullDownRefresh="pullDownRefreshObj"
            :pullUpLoad="pullUpLoadObj"
            :startY="parseInt(startY)"
            @pullingUp="onPullingUp"
          >
            <div slot="scroll-list">
              <!-- 把searchCars_change方法传递到car-list子组件 把carList传到car-list子组件 把 phoneCall 方法传递到car-list子组件 -->
              <car-list @getCarList_change="searchCars_change" :carList="carList" @phoneCall="phoneCall" style="min-height: 95vh"></car-list>
            </div>
          </common-scroll>
        </div>
        <!-- 拨打电话弹框组件:
        showCallDialog控制显示隐藏,
        mobileToCall是手机号
        cacelCall是关闭弹框的方法(把showCallDialog控制显示隐藏变成false) -->
        <common-dialog @cancel="cacelCall" @confirm="confirmCall" :show="showCallDialog" :mobile="mobileToCall"></common-dialog>
      </div>
    </div>
  </div>
</template>

<script>
// 引入头部的搜索组件
import searchHeader from '@/components/search-header';
// 引入下拉加载组件
import commonScroll from '@/components/common/common-scroll';
// 引入拨打电话的弹框组件
import commonDialog from '@/components/common-dialog';
// 引入汽车列表组件
import carList from '@/components/car-list';

// 引入请求的api @/api下已经配置好了.
import api from '@/api';
// setpage是计算分页的 (传入总的页数 返回第几页 )
import { setPage } from '@/lib/method';
// 引入没有数据的提示图片   在这里没用到  可以去掉
import noCarImgSrc from '@/../static/image/icon_nodata.png';
// 错误处理
import networkError from '@/components/network-error';
// 引入 vuex
import { mapState } from 'vuex';

export default {
  name: 'searchList',
  // 注册上面引入的组件
  components: {
    searchHeader,
    commonScroll,
    carList,
    commonDialog,
    networkError,
  },
  data() {
    // data都有初始值
    return {
      mobileToCall: '',
      showCallDialog: false, // 控制打电话对话框的显示隐藏
      tabIndex: 0,
      dataStatus: 0, // dataStatus初始值是0  展示初始页面  获取值之后如果数据为0条  dataStatus是2 如果数据不是0条 dataStatus是1
      noCarImgSrc: noCarImgSrc, // 这个在本页面没用到 可以去掉
      carList: [], // 列表数据
      totalPage: 0,
      params: { // 分页的参数
        pageNo: 1, // 第一页
        pageSize: 10, // 每页10条
        code: '', // 搜索内容 (默认为空)
      },
      startY: 0,
      nomore: '',
      pullDownRefresh: false,
      pullDownRefreshThreshold: 40,
      pullDownRefreshStop: 40,
      pullUpLoad: true,
      pullUpLoadThreshold: 0,
      pullUpLoadMoreTxt: '上拉加载更多',
      pullUpLoadNoMoreTxt: '没有更多数据了',
    };
  },
  computed: {
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
    ...mapState({
      isReqError: state => state.base.isReqError,
    }),
  },
  watch: { // 这些方法好像没用
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
  activated() {
    if (this.params.code !== '') {
      this.searchCars_change();
    }
  },
  methods: {
    rebuildScroll() {
      // $nextTick 是在下次 DOM 更新循环结束之后执行延迟回调，在修改数据之后使用 $nextTick，则可以在回调中获取更新后的 DOM
      this.$nextTick(() => {
        // 通过 $refs 获取scroll  执行 initScroll 方法
        this.$refs.scroll.initScroll();
      });
    },
    goHomePage() {
      // 返回上一页
      // $router其实是对window.history的封装  相当于 window.history.go(-1)
      this.$router.go(-1);
    },
    confirmCall() {
      // showCallDialog变成false 隐藏弹框
      this.showCallDialog = false;
      // 拨打电话
      window.location.href = `tel://${this.mobileToCall}`;
    },
    cacelCall() {
      // showCallDialog变成false 隐藏弹框
      this.showCallDialog = false;
    },
    phoneCall(mobile) {
      // showCallDialog变成true 显示弹框
      this.showCallDialog = true;
      // 把mobile的值赋给mobileToCall 显示在弹框里面
      this.mobileToCall = mobile;
    },
    clearList() {
      this.carList = [];
      this.dataStatus = 0;
    },
    searchCars(searchCode) {
      this.params.pageNo = 1;
      this.params.code = searchCode;
      api.getCarList(this.params).then((res) => {
        this.carList = res.data.data.record;
        this.totalPage = setPage(res.data.data.total, this.params.pageSize);
        if (res.data.data.total == 0) { // 数据为0 条时 dataStatus是2 出现没有结果的页面
          this.dataStatus = 2;
        // 数据小于10条 多余10条时 dataStatus是1
        } else if (res.data.data.total < 10) {
          this.pullDownRefresh = false;
          this.pullUpLoad = false;
          this.nomore = true;
          this.dataStatus = 1;
        } else {
          this.pullDownRefresh = false;
          this.pullUpLoad = true;
          this.nomore = false;
          this.dataStatus = 1;
        }
      });
    },
    // 点击出场  入场 成功之后 触发这个方法
    searchCars_change() {
      // 由于 this.params会还存在内存中 可以再使用 这个方法 就是点击出场 入场之后 再根据搜索框里面的内容进行一次搜索 这样就改变了列表的内容(例如:出场状态变成入场状态了)
      // 这个方法跟上面的 searchCars 类似 注释参考 searchCars
      this.params.pageNo = 1;
      api.getCarList(this.params).then((res) => {
        this.carList = res.data.data.record;
        this.totalPage = setPage(res.data.data.total, this.params.pageSize);
        if (res.data.data.total == 0) {
          this.dataStatus = 2;
        } else if (res.data.data.total < 10) {
          this.pullDownRefresh = false;
          this.pullUpLoad = false;
          this.nomore = true;
          this.dataStatus = 1;
        } else {
          this.pullDownRefresh = false;
          this.pullUpLoad = true;
          this.nomore = false;
          this.dataStatus = 1;
        }
      });
    },
    onPullingDown() {
      this.params.pageNo = 1;
      setTimeout(() => {
        this.searchCars();
      }, 1000);
    },
    onPullingUp() {
      this.params.pageNo++;
      setTimeout(() => {
        if (this.params.pageNo <= this.totalPage) {
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
<style lang="scss" >
@import "../assets/css/common";

.search-container {
  .child-view{
    background-color: white;
  }
  .search-list-container {
    // height: px2rem(100px);
    // position: relative;
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;

    .result-wrap {
      @include font-dpr(26px);
      height: px2rem(60px);
      line-height: px2rem(60px);
      // margin-left: 10px;
      width: 100%;
      .search-result-img{
        margin: 0 auto;
        display: block;
        margin-top: px2rem(300px);
        width: px2rem(200px);
        height: px2rem(200px);
      }
      .search-result-tips{
        text-align: center;
       color: #495362;
       @include font-dpr(26px);
       margin-top: px2rem(30px);
      }
      .result-init-page{
        @include font-dpr(26px);
        color: #495362;
        text-align: center;
        line-height: px2rem(37px);
        margin-top: px2rem(200px);
      }
    }
    .search-list{
     min-height: 90vh;
     position: relative;
     height: calc(100% - 35px);
     overflow: auto;
    }
  }
  .scroll-list-item{
    overflow: hidden;
  }
}
</style>
