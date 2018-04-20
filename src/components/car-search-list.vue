<!--
主页上方搜索栏页面组件
包括未搜索时页面和搜索后的展示页
有数据后的展示页类似car-list页
 -->
<template>
  <div class="search-list-container">
    <div class="result-wrap">
     <!-- 初始页面 -->
     <div v-if="nodata==false" class="result-init-page">
        <div>精确搜索</div>
        <div>快速找到要找的车辆</div>
      </div>
      <!-- 没有数据的时候  -->
      <div v-else-if="nodata==true&&totalPage==0" class="result-no-data" style="display:none">
        <img src='@/../static/image/search/blank@2x.png' class='search-result-img' />
        <div class="search-result-tips">暂无搜索结果</div>
      </div>
      <!-- 有数据的时候 -->
      <div v-else class="list-wrap">
        <common-scroll ref="scroll" :startY="parseInt(startY)"
          :data="carList"  :scrollbar="scrollbarObj"
          :pullDownRefresh="pullDownRefreshObj" :pullUpLoad="pullUpLoadObj"
          @pullingDown="onPullingDown"   @pullingUp="onPullingUp"
        >
          <div slot="scroll-list">
            <car-list :carList="carList" @phoneCall="phoneCall" style="min-height: 95vh"></car-list>
          </div>
        </common-scroll>
      </div>
      <call-dialog @cancel="cacelCall" @confirm="confirmCall" :show="showCallDialog" :mobile="mobileToCall"></call-dialog> -->
    </div>
  </div>
</template>


<script>
import commonScroll from '@/components/common/common-scroll';
import callDialog from '@/components/call-dialog';
import carList from '@/components/car-list';


import api from '@/api';
import { setPage } from '@/lib/method';
import noCarImgSrc from '@/../static/image/icon_nodata.png';

export default {
  // props: {
  //
  // },
 components: {
    commonScroll,
    carList,
    callDialog,
  },
   data() {
     return {
       mobileToCall: '',
       showCallDialog: false,
       tabNameList: ['场内在售', '待入场', '未入场', '待出场', '已出场'],
       tabIndex: 0,
       nodata: false,
       noCarImgSrc: noCarImgSrc,
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
    startY() {
      this.rebuildScroll();
    },
  },
  created() {
    this.getCarList(0);
  },
  methods: {
    goHomePage() {
     this.$router.go(-1);
   },
    confirmCall() {
      this.showCallDialog = false;
      window.location.href = `'tel://${this.mobileToCall}`;
    },
    cacelCall() {
      this.showCallDialog = false;
    },
    phoneCall(mobile) {
      this.showCallDialog = true;
      this.mobileToCall = mobile;
    },
    // 分页处理，一次请求十条
    getCarList(status) {
      this.params.marketStatus = status + 1;
      api.getCarList(this.params).then((res) => {
        this.carList = res.data.data.record;
        this.totalPage = setPage(res.data.data.total, this.pageSize);
        // 不存在数据，调用nodata页面
        if (res.data.data.total == 0) {
          this.nodata = true;
        }
        // 找出少于十条，则全部显示，禁用上下拉刷新
        else if (res.data.data.total < 10) {
          this.pullDownRefresh = false;
          this.pullUpLoad = false;
          this.nomore = true;
          this.nodata = false;
        }
        // 多于十条则显示并允许上下拉刷新重新加载
        else {
          this.pullDownRefresh = true;
          this.pullUpLoad = true;
          this.nomore = false;
          this.nodata = false;
        }
      });
    },
    onPullingDown() {
      this.pamams.pageNo = 1;
      // 设置最长等待时间 1000ms
      setTimeout(() => {
        this.getCarList(this.tabIndex);
      }, 1000);
    },
    onPullingUp() {
      // 记录当前页面是第几页
      this.params.pageNo++;
      this.params.marketStatus = this.tabIndex + 1;
      setTimeout(() => {
        // 如果当前还不是最后一页，再次请求
        if (this.pageNo <= this.totalPage) {
          let newPage = [];
          api.getCarList(this.params).then((res) => {
            newPage = res.data.data.record;
            this.totalPage = setPage(res.data.data.total, this.pageSize);
            // concat() 方法用于连接两个或多个数组。
            // 该方法不会改变现有的数组，而仅仅会返回被连接数组的一个副本。
            // 此处将newPage连接到carList
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

.search-header-container{
   border-bottom: 1px solid #f9f6f6;
}
.child-view{
  background-color: white;
}
.search-list-container {
  height: px2rem(100px);
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;

  .result-wrap {
    @include font-dpr(26px);
    height: px2rem(60px);
    line-height: px2rem(60px);
    margin-left: 10px;
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

  .list-wrap {

  }
}
</style>
