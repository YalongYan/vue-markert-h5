<!--
搜索页的搜索框组件
 -->
<template>
  <div class="search-header-container">
    <!-- 返回首页按钮 -->
     <img src="../../static/image/btn_back2.png" class="go-back-img" @click="goHomePage">
    <div class="search-wrap">
      <img :src="searchIcon" class="header-search-btn" @click="searchCars"/>
      <input placeholder="车源编号／VIN码后4位／车牌号" @keyup.enter="searchCars" v-model="searchCode"/>
      <img :src="deleteIcon" class="header-search-del" @click="clearInput"/>

    </div>
    <div class="cancel-wrap" @click="searchCars">
      搜索
    </div>
  </div>
</template>

<script>
import searchIcon from '@/../static/image/search/icon_search@2x.png';
import deleteIcon from '@/../static/image/search/icon_delete@2x.png';

export default {
  data() {
    return {
      searchCode: '',
      searchIcon,
      deleteIcon,
    };
  },
  methods: {
    goHomePage() {
      this.$emit('goHomePage');
    },
    searchCars() {
      if (this.searchCode) {
        this.$emit('searchCars', this.searchCode);
      } else {
        this.$emit('clearList');
      }
    },
    clearInput() {
      this.searchCode = '';
    },
  },
};
</script>

<style lang="scss" >
@import "../assets/css/common";

.search-header-container {
  @include flexbox;
  height: px2rem(100px);
  width: 100%;
  background:$bgblue;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: white;
  border-bottom: 1px solid #f9f6f6;

  .go-back-img{
    width: px2rem(24px);
    height: px2rem(44px);
    margin-left: px2rem(24px);
  }
  .search-wrap {
    margin-left: 10px;
    width: 100%;
    height: px2rem(60px);
    background-color: #F4F4F4;
    border-radius: px2rem(10px);

    .header-search-btn {
      width: px2rem(30px);
      height: px2rem(30px);
      margin-left: px2rem(20px);
      vertical-align: middle;
      margin-top: px2rem(-2px);
      cursor: pointer;
    }

    .header-search-del {
      width: px2rem(30px);
      height:px2rem(30px);
      margin-right:px2rem(20px);
      float: right;
      margin-top: 0.2rem;
      cursor: pointer;
    }

    input {
      // width: px2rem(460px);
      width: 5.4rem;
      height: px2rem(60px);
      border-radius: px2rem(8px);
      background-color: #F4F4F4;
      @include font-dpr(26px);
    }
  }

  .cancel-wrap {
    @include font-dpr(28px);
    color: #495362;
    // margin-right: 10px;
    width: 18%;
    text-align: center;
    cursor: pointer;
  }
}
</style>
