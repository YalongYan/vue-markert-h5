/*
* 这是一个根据car-type的值动态改变新车|二手车标识
* 引入汽车图片并在汽车底部添加carnumber
*/
<template>
  <div class="img-container">
    <div v-bind:class="['car-type' ,type==1 ? 'car-type1' : 'car-type2']">
      <!-- 新车/二手车 -->
      {{type==1?'新车':'二手车'}}
    </div>

    <!-- 如果imgSrc为空引用默认图片 -->
    <img :src="imgSrc || cdnUrl" />
    <div class="car-num">
      <p>编号：{{carNumber || '--'}}</p>
    </div>
  </div>
</template>

<script>
import defaultCarPic from '@/../static/image/middle.png';

export default {
  props: {
    imgSrc: {
      type: String,
      default: '',
    },
    type: {
      default: '',
    },
    carNumber: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      cdnUrl: defaultCarPic,
    };
  },
  // computed: {
  //
  // },
};
</script>

<style lang="scss" scoped>
@import "../../assets/css/common";
.img-container {
  float: left;
  width: 112px;
  position: relative;
  margin-right: px2rem(10px);
  img {
    width: 112px;
    height: 84px;
  }
  .car-num {
    position: absolute;
    width: 112px;
    height: px2rem(26px);
    line-height: px2rem(26px);
    top: 71px;
    left: 0px;
    font-size: px2rem(16px);
    text-align: center;
    background-color:rgba(0,0,0,0.6);
    white-space: nowrap;
    color: $fontfff;
    overflow: hidden;
  }
  .car-type{
      position: absolute;
      width: px2rem(97px);
      height:px2rem(32px);
      line-height: px2rem(32px);
      @include font-dpr(20px);
      text-align: center;
      color: white;
      border-radius: px2rem(4px);
      left: px2rem(6px);
  }
  .car-type1{
   background-color: #34BE85;
  }
  .car-type2{
   background-color: #FF6E46;
  }
}
</style>
