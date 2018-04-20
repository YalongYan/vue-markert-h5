<!-- /*
这是车辆品牌列表组件，用于CarPicker页面选择车辆品牌
*/ -->
<template>
  <div class="index-list">
    <common-scroll
      ref="indexList"
      :listen-scroll="listenScroll"
      :probe-type="probeType"
      :data="data"
      :click="true"
      :startY="50"
      :refreshDelay="0"
      @scroll="scroll">
      <div class="index-list-content" ref="content" slot="scroll-list">
        <ul ref="groups">
          <li v-for="(group, index) in data" ref="listGroup" :key="index">
            <h2 class="index-list-anchor">{{group.name}}</h2>
            <ul>
              <li
                :key="index"
                class="index-list-item"
                v-for="(item,index) in group.items"
                @touchstart="addActiveCls"
                @touchend="removeActiveCls"
                @click="selectItem(item)">
                <p>{{item.name}}</p>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </common-scroll>
    <div class="index-list-nav" v-if="tabShow" @touchstart="onShortcutTouchStart" @touchmove.stop.prevent="onShortcutTouchMove">
      <ul>
        <li v-for="(item, index) in shortcutList" :key="index" :data-index="index" :class="{active: currentIndex === index}">{{item}}</li>
      </ul>
    </div>
    <div class="index-list-fixed" ref="fixed" v-show="fixedTitle">
      {{fixedTitle}}
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { getData, addClass, removeClass } from '@/lib/dom';
import commonScroll from '@/components/common/common-scroll.vue';

const COMPONENT_NAME = 'index-list';
const EVENT_SELECT = 'select';
const ACTIVE_CLS = 'index-list-item_active';
const TITLE_HEIGHT = 0;
const SUBTITLE_HEIGHT = 40;
// 判断窗口显示区是否大于480，大于赋值18，否则17，为了适应不同屏幕
const ANCHOR_HEIGHT = window.innerHeight <= 480 ? 17 : 18;

export default {
  name: COMPONENT_NAME,
  // 传递给子组件的值
  props: {
    tabShow: {
      type: Boolean,
      default: true,
    },
    data: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  components: {
    commonScroll,
  },
  data() {
    return {
      // 初始页数
      currentIndex: 0,
      scrollY: -1,
      diff: -1,
    };
  },
  // 进入页面时创建对象并赋值
  created() {
    this.probeType = 3;
    this.listenScroll = true;
    this.listHeight = [];
    this.touch = {};
  },
  mounted() {
    setTimeout(() => {
      this._calculateHeight();
    }, 20);
  },
  computed: {
    // 如果
    fixedTitle() {
      if (this.scrollY > -TITLE_HEIGHT) {
        return '';
      }
      return this.data[this.currentIndex] ? this.data[this.currentIndex].name : '';
    },
    shortcutList() {
      return this.data.map(group => group.name.substr(0, 1));
    },
  },
  methods: {
    refresh() {
      this.$refs.indexList.refresh();
    },
    selectItem(item) {
      this.$emit(EVENT_SELECT, item);
    },
    scroll(pos) {
      this.scrollY = pos.y;
    },
    onShortcutTouchStart(e) {
      const anchorIndex = getData(e.target, 'index');
      const firstTouch = e.touches[0];
      this.touch.y1 = firstTouch.pageY;
      this.touch.anchorIndex = anchorIndex;
      this._scrollTo(anchorIndex);
    },
    onShortcutTouchMove(e) {
      const firstTouch = e.touches[0];
      this.touch.y2 = firstTouch.pageY;
      const delta = (this.touch.y2 - this.touch.y1) / ANCHOR_HEIGHT | 0;
      const anchorIndex = parseInt(this.touch.anchorIndex, 10) + delta;

      this._scrollTo(anchorIndex);
    },
    addActiveCls(e) {
      addClass(e.currentTarget, ACTIVE_CLS);
    },
    removeActiveCls(e) {
      removeClass(e.currentTarget, ACTIVE_CLS);
    },
    _calculateHeight() {
      const list = this.$refs.listGroup;
      if (!list) {
        return;
      }
      this.listHeight = [];
      let height = TITLE_HEIGHT;
      this.listHeight.push(height);
      for (let i = 0; i < list.length; i++) {
        const item = list[i];
        height += item.clientHeight;
        this.listHeight.push(height);
      }
    },
    _scrollTo(index) {
      if (!index && index !== 0) {
        return;
      }
      if (index < 0) {
        index = 0;
      } else if (index > this.listHeight.length - 2) {
        index = this.listHeight.length - 2;
      }
      this.$refs.indexList.scrollToElement(this.$refs.listGroup[index], 0);
      this.scrollY = this.$refs.indexList.scroll.y;
    },
  },
  watch: {
    data() {
      setTimeout(() => {
        this._calculateHeight();
      }, 20);
    },
    diff(newVal) {
      const fixedTop = (newVal > 0 && newVal < SUBTITLE_HEIGHT) ? newVal - SUBTITLE_HEIGHT : 0;
      if (this.fixedTop === fixedTop) {
        return;
      }
      this.fixedTop = fixedTop;
      this.$refs.fixed.style.transform = `translate3d(0,${fixedTop}px,0)`;
    },
    scrollY(newY) {
      const listHeight = this.listHeight;
      // 当滚动到顶部，newY>0
      if (newY > -TITLE_HEIGHT) {
        this.currentIndex = 0;
        return;
      }
      // 在中间部分滚动
      for (let i = 0; i < listHeight.length - 1; i++) {
        const height1 = listHeight[i];
        const height2 = listHeight[i + 1];
        if (-newY >= height1 && -newY < height2) {
          this.currentIndex = i;
          this.diff = height2 + newY;
          return;
        }
      }
      // 当滚动到底部，且-newY大于最后一个元素的上限
      this.currentIndex = listHeight.length - 2;
    },
  },
};
</script>

<style lang="scss" >
  @import "../assets/css/common";
  .index-list{
      position: relative;
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
    .list-wrapper{
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      overflow: hidden;
      background: $bgfff;
    }
    .index-list-content{
      min-height: 50px;
      background:$bgfff;
      border-radius: 2px;
      .index-list-anchor{
        border-top: 1px solid $borderlightgrey;
        border-bottom: 1px solid $borderlightgrey;
        padding-left:px2rem(36px);
        // margin-right:px2rem(28px);
        height:px2rem(60px);
        line-height:px2rem(60px);
        font-size: 15px;
        color: $fontlightgrey;
        background: $bggrey;
      }

       .index-list-item{
         position: relative;
         box-sizing: border-box;
         min-height: px2rem(85px);

         p{
           position: absolute;
           top: 50%;
           -webkit-transform: translateY(-50%);
           line-height: px2rem(40px);
           padding-left: px2rem(36px);
           margin-right:px2rem(28px);
           font-size: px2rem(30px);
         }
         color: $fontblack;
          &:last-child{
            &:after{
              border:none;
            }
          }
       }
      .index-list-item:after{
        content: " ";
        position: absolute;
        left: 0;
        top: px2rem(85px);
        right: 0;
        height: 1px;
        border-bottom: 1px solid #e0e6ed;
        -webkit-transform-origin: 0 0;
        transform-origin: 0 0;
        -webkit-transform: scaleY(0.5);
        transform: scaleY(0.5);
        left: 15px;
      }
       .index-list-item_active{
         background:#cccccc;
       }

    }
    .index-list-fixed{
      padding-left:px2rem(36px);
      height:px2rem(60px);
      line-height:px2rem(60px);
      position: absolute;
      top: 0;
      left: 0;
      right:0;
      box-sizing: border-box;
      font-size: 15px;
      color: #999;
      background:$bggrey;
    }
    .index-list-nav {
      position: absolute;
      z-index: 30;
      right: 0;
      top: 50%;
      -webkit-transform: translateY(-50%);
      transform: translateY(-50%);
      > ul {
        padding: 0;
        margin: 0;
        > li {
          padding: 6px 0 0 16px;
          line-height: 1;
          text-align: center;
          font-size: 15px;
          color:$fontblack;
          &.active{
            color: $fontblue;
          }
        }
      }
    }
  }
</style>
