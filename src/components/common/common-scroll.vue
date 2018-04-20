/*
* better-scroll 是一个基于 iscroll 的重写的移动端滚动的库
* 本组件主要是对 better-scroll 做一层 Vue 的封装，通过 props 的形式，
* 把一些对 better-scroll 定制化的控制权交给父组件
* 通过 methods 暴露的一些方法对 better-scroll 的方法做一层代理；
* 父组件只需要把数据 data 通过 prop 传给 scroll 组件，就可以保证 scroll 组件的滚动效果。
* 同时，如果想实现下拉刷新的功能，只需要通过 prop 把 pulldown 设置为 true，
* 并且监听 pulldown 的事件去做一些数据获取并更新的动作即可
*/
<template>
  <div ref="wrapper" class="list-wrapper">
    <div class="scroll-content">
      <!-- data列表循环显示 -->
      <slot name="scroll-list">
        <ul ref="list" class="list-content">
          <li @click="clickItem($event,item)" class="list-item" v-for="(item, index) in data" :key="index">{{item}}</li>
        </ul>
      </slot>
      <!-- 上拉加载更多数据pullUpLoad为真 isPullUpLoad为假显示 pullUpTxt否则显示加载动画-->
      <slot name="pullup" :pullUpLoad="pullUpLoad" :isPullUpLoad="isPullUpLoad">
        <div class="pullup-wrapper" v-if="pullUpLoad">
          <div class="before-trigger" v-if="!isPullUpLoad">
            <span>{{pullUpTxt}}</span>
          </div>
          <div class="after-trigger" v-else>
            <loading></loading>
          </div>
        </div>
      </slot>
    </div>
    <!-- 下拉刷新 -->
    <slot name="pulldown" :pullDownRefresh="pullDownRefresh" :pullDownStyle="pullDownStyle"
      :beforePullDown="beforePullDown" :pulling="pulling" :bubbleY="bubbleY"
    >
      <!-- 发生下拉刷新显示 -->
      <div ref="pulldown" class="pulldown-wrapper" :style="pullDownStyle" v-if="pullDownRefresh">
        <!-- 下拉刷新发生之前 -->
        <div class="before-trigger" v-if="beforePullDown">
          <div class="refresh-box">
            <span class="refresh-gif"></span>
            <span class="refresh-text">下拉刷新</span>
          </div>
        </div>
        <!-- 刷新时显示 -->
        <div class="after-trigger" v-else>
          <div v-if="pulling" class="loading">
            <div class="refresh-box">
              <img class="refresh-gif" src="@/../static/image/refresh.gif">
              <span class="refresh-text">正在刷新</span>
            </div>
          </div>
          <!-- 刷新后显示 -->
          <div v-else>
            <div class="refresh-box">
              <span class="refresh-gif"></span>
              <span class="refresh-text">刷新完成</span>
            </div>
          </div>
        </div>
      </div>
    </slot>
  </div>
</template>

<script type="text/ecmascript-6">
import BScroll from 'better-scroll';
import Loading from '@/components/common/common-loading.vue';
import Bubble from '@/components/common/common-bubble.vue';
import { getRect } from '@/lib/dom';

const COMPONENT_NAME = 'scroll';
const DIRECTION_H = 'horizontal';
const DIRECTION_V = 'vertical';

export default {
  name: COMPONENT_NAME,
  components: {
    Loading,
    Bubble,
  },
  props: {
    data: {
      type: Array,
      default() {
        return [];
      },
    },
    probeType: {
      type: Number,
      default: 1,
    },
    click: {
      type: Boolean,
      default: true,
    },
    listenScroll: {
      type: Boolean,
      default: false,
    },
    listenBeforeScroll: {
      type: Boolean,
      default: false,
    },
    direction: {
      type: String,
      default: DIRECTION_V,
    },
    scrollbar: {
      type: null,
      default: false,
    },
    pullDownRefresh: {
      type: null,
      default: false,
    },
    pullUpLoad: {
      type: null,
      default: false,
    },
    startY: {
      type: Number,
      default: 0,
    },
    refreshDelay: {
      type: Number,
      default: 20,
    },
    freeScroll: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      beforePullDown: true,
      isRebounding: false,
      isPullingDown: false,
      pulling: false,
      isPullUpLoad: false,
      pullUpDirty: true,
      pullDownStyle: '',
      bubbleY: 0,
    };
  },
  computed: {
    pullUpTxt() {
      // 根据pullUpDirty的值返回moreTxt或noMoreTxt
      const moreTxt = this.pullUpLoad && this.pullUpLoad.txt && this.pullUpLoad.txt.more || '上拉加载更多';

      const noMoreTxt = this.pullUpLoad && this.pullUpLoad.txt && this.pullUpLoad.txt.noMore || '没有更多数据咯';

      return this.pullUpDirty ? moreTxt : noMoreTxt;
    },
    refreshTxt() {
      return this.pullDownRefresh && this.pullDownRefresh.txt || '刷新完成';
    },
  },
  created() {
    this.pullDownInitTop = -50;
  },
  mounted() {
    // Vue中数据更新是异步的，在数据还没有加载完之前，BScroll是无法获取目标内容容器的高度的，就会出现无法滚动的现象。
    setTimeout(() => { // 其实也可以用 Vue 异步函数 this.$nextTick 来确保 DOM 已经渲染
      this.initScroll();
    }, 20);
  },
  methods: {
    initScroll() {
      if (!this.$refs.wrapper) {
        return;
      }
      if (this.$refs.list && (this.pullDownRefresh || this.pullUpLoad)) {
        this.$refs.list.style.minHeight = `${getRect(this.$refs.wrapper).height}px`;
      }

      const options = {
        probeType: this.probeType,
        click: this.click,
        scrollY: this.freeScroll || this.direction === DIRECTION_V,
        scrollX: this.freeScroll || this.direction === DIRECTION_H,
        scrollbar: this.scrollbar,
        pullDownRefresh: this.pullDownRefresh,
        pullUpLoad: this.pullUpLoad,
        startY: this.startY,
        freeScroll: this.freeScroll,
      };
      if (!this.scroll) {
        this.scroll = new BScroll(this.$refs.wrapper, options);
      } else {
        this.scroll.destroy();
        this.scroll = new BScroll(this.$refs.wrapper, options);
      }
      if (this.listenScroll) {
        this.scroll.on('scroll', (pos) => {
          this.$emit('scroll', pos);
        });
      }

      if (this.listenBeforeScroll) {
        this.scroll.on('beforeScrollStart', () => {
          this.$emit('beforeScrollStart');
        });
      }

      if (this.pullDownRefresh) {
        this._initPullDownRefresh();
      }

      if (this.pullUpLoad) {
        this._initPullUpLoad();
      }
    },
    disable() {
      this.scroll && this.scroll.disable();
    },
    enable() {
      this.scroll && this.scroll.enable();
    },
    refresh() {
      this.scroll && this.scroll.refresh();
    },
    scrollTo() {
      this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments);
    },
    scrollToElement() {
      this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments);
    },
    clickItem(e, item) {
      this.$emit('click', item);
    },
    destroy() {
      this.scroll.destroy();
    },
    forceUpdate(dirty) {
      if (this.pullDownRefresh && this.isPullingDown) {
        this.pulling = false;
        this._reboundPullDown().then(() => {
          this._afterPullDown();
        });
      } else if (this.pullUpLoad && this.isPullUpLoad) {
        this.isPullUpLoad = false;
        this.scroll.finishPullUp();
        this.pullUpDirty = dirty;
        this.refresh();
      } else {
        this.isPullUpLoad = false;
        this.scroll.finishPullUp();
        this.pullUpDirty = dirty;
        this.refresh();
      }
    },
    _initPullDownRefresh() {
      this.scroll.on('pullingDown', () => {
        this.beforePullDown = false;
        this.isPullingDown = true;
        this.pulling = true;
        this.$emit('pullingDown');
      });

      this.scroll.on('scroll', (pos) => {
        if (this.beforePullDown) {
          this.bubbleY = Math.max(0, pos.y + this.pullDownInitTop);
          this.pullDownStyle = `top:${Math.min(pos.y + this.pullDownInitTop, 10)}px`;
        } else {
          this.bubbleY = 0;
        }

        if (this.isRebounding) {
          this.pullDownStyle = `top:${10 - (this.pullDownRefresh.stop - pos.y)}px`;
        }
      });
    },
    _initPullUpLoad() {
      this.scroll.on('pullingUp', () => {
        this.isPullUpLoad = true;
        this.$emit('pullingUp');
      });
    },
    _reboundPullDown() {
      const { stopTime = 600 } = this.pullDownRefresh;
      return new Promise((resolve) => {
        setTimeout(() => {
          this.isRebounding = true;
          this.scroll.finishPullDown();
          this.isPullingDown = false;
          resolve();
        }, stopTime);
      });
    },
    _afterPullDown() {
      setTimeout(() => {
        this.pullDownStyle = `top:${this.pullDownInitTop}px`;
        this.beforePullDown = true;
        this.isRebounding = false;
        this.refresh();
      }, this.scroll.options.bounceTime);
    },
  },
  watch: {
    data() {
      setTimeout(() => {
        this.forceUpdate(true);
      }, this.refreshDelay);
    },
  },
};

</script>

<style lang="scss" scoped>
@import "../../assets/css/common";
  .list-wrapper{
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background: $bggrey;
    .list-content{
      position: relative;
      z-index: 10;
      background: $bgfff;
      .list-item{
        height: 60px;
        line-height: 60px;
        font-size: 18px;
        padding-left: 20px;
        border-bottom: 1px solid #e5e5e5;
       }
    }
    .pulldown-wrapper{
      position: absolute;
      width: 100%;
      left: 0;
      display: flex;
      justify-content:center;
      align-items:center;
      transition: all;
      .after-trigger{
        margin:0;
      }
    }
    .pullup-wrapper{
      width: 100%;
      display: flex;
      justify-content :center;
      align-items :center;
      padding: 16px 0;
    }
    .refresh-box{
      display:flex;
      .refresh-gif{
        justify-content:center;
        width:px2rem(100px);
        height:px2rem(60px);
        line-height:px2rem(60px);
        background-size: px2rem(100px) px2rem(60px);
      }
      .refresh-text{
        height:px2rem(60px);
        line-height:px2rem(60px);
        color:$fontgrey;
      }
    }
  }
</style>
