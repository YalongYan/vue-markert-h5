/*
* 这是一个当props传入imgSrc为空时候显示的页面
*/
<template>
  <div class="no-data">
    <div>
      <img :src="imgSrc" alt="" >
      <p>{{noCarText}}</p>
    </div>
  </div>
</template>
<script>
import noCarImgSrc from '@/../static/image/icon_nodata.png';

export default {
  props: {
    imgSrc: {
      type: String,
      default: noCarImgSrc,
    },
    noCarText: {
      type: String,
      default: '',
    },
  },
};
</script>

<style  lang="scss" scoped>
  @import "../../assets/css/common";
  .no-data{
    width: 100%;
    height: 100%;
    position: relative;
    div{
      position: absolute;
      top: 40%; left: 50%;
      -webkit-transform: translate(-50%,-50%);
      -ms-transform: translate(-50%,-50%);
      transform: translate(-50%,-50%);
      text-align: center;
      img{
        width: px2rem(300px);
        height: px2rem(300px);
      }
      p:nth-child(2){
        @include font-dpr(28px);
        margin-top: px2rem(50px);
        color: $font000;
      }
      p:nth-child(3){
        @include font-dpr(24px);
        line-height: px2rem(40px);
        color: #2a2a2a;
      }
    }
  }

</style>
