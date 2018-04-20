/*
* 这是通用头部的组件 根据props中backDisplay
* 来控制图片是否显示以及文字部分是否具有右边距
*/
<template>
  <div class="header">
    <!-- 后退 -->
    <div v-show="backDisplay" class="img-container" @click="goBack">
      <img class="back-icon" :src="backIcon"/>
    </div>
    <div class="header-title"><p :class="{fixTitleCenter: backDisplay}">{{title}}</p></div>
  </div>
</template>

<script>
import backIcon from '@/../static/image/back.png';

export default {
  props: {
    title: {
      type: String,
      default: '',
    },
    backIcon: {
      type: String,
      default: backIcon,
    },
    backDisplay: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    goBack() {
      window.history.back();// 点击历史记录后退
    },
  },
};
</script>

<style lang="scss" >
@import "../../assets/css/common";

.header{
  height: px2rem(100px);
  width: 100%;
  background:$bgblue;
  display: flex;
  flex-direction: row;
  align-items: center;

  .img-container {
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: center;
    .back-icon {
      width: px2rem(40px);
      height: px2rem(44px);
    }
  }

  .header-title {
    flex: 6;
    text-align: center;
    overflow: hidden;
    >p {
      color:$fontfff;
      font-size: px2rem(36px);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      line-height: px2rem(100px);
      margin-bottom: px2rem(-10px);
    }
   }

   .fixTitleCenter {
     margin-right: px2rem(100px);
   }
 }

</style>
