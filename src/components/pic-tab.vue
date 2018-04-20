<!--
车辆详情页面的图片展示组件
 -->
<template>
  <div class="pic-tab-container">
    <ul class="img-list">
      <!-- 如果index !=imgList.length-1==2,就赋予marginR类，用来添加图片右边距 -->
      <li v-for="(item,index) in  imgList"  :class="{'marginR':index!= imgList.length-1}" @click="goImgListPage" :key="index">
        <img :src="item.cdnUrl"  alt="">
      </li>
      <span>{{ this.carPicture.length }}张</span>
    </ul>
  </div>
</template>

<script>
import defaultCarPic from '@/../static/image/middle.png';

export default {
  props: {
    carNumber: {
      type: String,
      default: '',
    },
    carPicture: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      totalImg: this.carPicture.length,
      // imgList初始值,当图片不足三张时显示的缺省图
      imgList: [
        {
          cdnUrl: defaultCarPic,
        },
        {
          cdnUrl: defaultCarPic,
        },
        {
          cdnUrl: defaultCarPic,
        },
      ],
    };
  },
  watch: {
    carPicture() {
      // 需要考虑只有不到3张图片时如何展示的问题
      // 判断有几张图然后分别处理
      if (this.carPicture.length === 1) {
        this.imgList[0].cdnUrl = this.carPicture[0].cdnUrl;
      } else if (this.carPicture.length === 2) {
        this.imgList[0].cdnUrl = this.carPicture[0].cdnUrl;
        this.imgList[1].cdnUrl = this.carPicture[1].cdnUrl;
      } else if (this.carPicture.length > 2) {
        this.imgList = this.carPicture.slice(0, 3);
      }
    },
  },
  methods: {
    goImgListPage() {
      this.$emit('goImgListPage');
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/css/common";
.pic-tab-container {
  @include flexbox;

  .img-list {
    width: 100%;
    height: px2rem(164px);
    @include flexbox;
    position: relative;

    li {
      height: px2rem(164px);
      @include flexN(1);
      img{
        width: 100%;
        height: 100%;
      }
    }

    span {
      width: px2rem(64px);
      height: px2rem(26px);
      text-align: center;
      line-height: px2rem(26px);
      position: absolute;
      right: 0;
      bottom: 0;
      background:rgba(0,0,0,0.50);
      @include font-dpr(16px);
       color: $fontfff;
    }
  }
  .marginR{
    margin-right: px2rem(6px);
  }
}
</style>
