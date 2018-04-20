<!--
主页面头组件
包括品牌 搜索入口
 -->
<template>
  <div class="home-header-container">
    <div class="select-wrap" @click="goCarPicker">
      品牌
    </div>
    <img :src="moreIcon" class="search-more-img" />
    <div class="search-wrap">
      <img :src="searchIcon" class="header-search-btn" />
      <input placeholder="车源编号／VIN码后4位／车牌号" @focus="goSearchPage"/>
    </div>
  </div>
</template>

<script>
import moreIcon from '@/../static/image/search/icon_more@2x.png';
import searchIcon from '@/../static/image/search/icon_search@2x.png';

export default {
  data() {
    return {
      searchIcon,
      moreIcon,
    };
  },
  methods: {
    goCarPicker() {
      this.$emit('goCarPicker');
    },
    goSearchPage() {
      this.$emit('goSearchPage');
    },
  },
};
</script>

<style lang="scss" >
@import "../assets/css/common";

.home-header-container {
  height: px2rem(100px);
  width: 100%;
  background:$bgblue;
  display: flex;
  flex-direction: row;
  align-items: center;

  .select-wrap {
    @include font-dpr(26px);
    color: $fontfff;
    margin-left: 10px;
  }

  .search-wrap {
    margin-left: 10px;
    width: px2rem(590px);
    height: px2rem(60px);
    border-radius: px2rem(8px);
    background-color: white;

    input {
      vertical-align: middle;
      width: px2rem(450px);
      height: px2rem(60px);
      border-radius: px2rem(8px);
    }
    .header-search-btn{
      width: px2rem(30px);
      height: px2rem(30px);
      vertical-align: middle;
      margin-left: px2rem(20px);
      margin-top: px2rem(-2px);
    }
  }
  .search-more-img{
    width: px2rem(16px);
    height: px2rem(8px);
    margin-left: px2rem(10px);
    margin-top: px2rem(-4px);
  }
}
</style>
