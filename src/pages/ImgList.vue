/*
* 业务描述:展示车辆相关的图片,点击展示大图
* 跳转路径:车辆详情页面->点击图片
*
*/
<template>
  <div class="img-list-container">
    <ul class="img-list" v-if="imgList.length>0">
      <!-- //一行展示3个图片 -->
      <li v-for="(item, index) in imgList" :key="index" :class="{ 'marginR': index % 2 === 0 }" @click="show('previewer', index)">
        <img :src="item.src" alt="" class="previewer-demo-img">
      </li>
    </ul>
    <!-- 暂无图片 -->
    <nocar-page v-else :noCarText="'暂无其他照片'"></nocar-page>
    <div v-transfer-dom>
      <previewer :list="imgList" ref="previewer" :options="options"></previewer>
    </div>
  </div>
</template>

<script>
import { Previewer, TransferDom } from 'vux';
import nocarPage from '@/components/common/common-nocar-page';

export default {
  directives: {// 自定义标签 v-transfer-dom
    TransferDom,
  },
  components: {// 注册的组件
    Previewer,
    nocarPage, // 组件复用,只是文案修改
  },
  data() {
    return {
      imgList: [],
      options: {
        getThumbBoundsFn(index) {
          // find thumbnail element  //先序遍历nodeList类型的满足 previewer-demo-img类图片
          const thumbnail = document.querySelectorAll('.previewer-demo-img')[index];
          // get window scroll Y  //获取滚动条顶部的Y轴偏移量，window.pageYOffset是chorme新特性更好用，document.documentElement.scrollTop;处理低版本兼容问题
          const pageYScroll = window.pageYOffset || document.documentElement.scrollTop;
          // optionally get horizontal scroll
          // get position of element relative to viewport
          // getBoundingClientRect()返回一个对象 rect 包括 上下左右宽高值
          const rect = thumbnail.getBoundingClientRect();
          // w = width
          // 返回当前图片的位置
          return { x: rect.left, y: rect.top + pageYScroll, w: rect.width };
        },
      },
    };
  },
  mounted() {
    // 整理图片数据cdnURL
    this.formatImgData();
  },
  methods: {
    formatImgData() {
      const imgData = this.$route.params.carPicture;
      for (let i = 0; i < imgData.length; i++) {
        this.imgList.push({ src: imgData[i].cdnUrl });
      }
    },
    // $refs相对document.getElementById的方法，会减少获取dom节点的消耗。
    show(ref, index) {
      this.$refs[ref].show(index);
    },
  },
};
</script>
<style lang="scss" scoped>
@import "../assets/css/common";

.img-list-container {
  width: 100%;

  .img-list {
    height: 100%;
    padding: 0 px2rem(36px);
    margin-bottom: px2rem(28px);
    overflow: auto;
    -webkit-overflow-scrolling: touch;
    box-sizing: border-box;
    li {
      width: px2rem(330px);
      height: px2rem(220px);
      margin-top: px2rem(16px);
      float: left;

      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  .marginR{
    margin-right: px2rem(6px);
  }
}
</style>
