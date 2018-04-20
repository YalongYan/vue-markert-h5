/*
* 业务描述:请求失败后的刷新页面
* 跳转路径:错误页面
*
* 创建人:宋金委
* 时间:2018-03-26
*/
<template>
  <div class="notfound">
    <div>
      <div class="error"></div>
      <div class="etext">页面正在抢修中...</div>
      <div class="reload">
        <!-- 刷新页面方法 -->
        <span class="reload-btn" @click="refresh"><span class="icon"></span>点击刷新</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  created() {},
  methods: {
    refresh() {
      // 原页面刷新
      this.$router.go(0);
    },
  },
};
</script>

<style lang="css" scoped>
  .notfound {
    display: flex;
    /* align-items: center; */
  }
  .notfound > div {
    width: 100%;

    margin-top: 100px;
    height: 200px
  }
  .error{
      width: 100px;
      height: 100px;
      margin: 0px auto;
      background: url(../../static/image/icon_404@3.png) no-repeat;
      background-size: 100%;
  }
   .etext{
     text-align: center;
     font-size: 14px;
     color: $fontblack;
     margin-top: 15px;
   }
   .reload {
     text-align: center;
     font-size: 15px;
     color: #429AEB;
     margin-top: 30px;
   }
   .reload-btn {
     width: 100px;
     height: 32px;
     border: 1px solid #429AEB;
     border-radius: 4px;
     padding: 5px;
     cursor: pointer;
   }
   .reload-btn .icon {
     width: 16px;
     height: 16px;
     margin-right: 5px;
     display: inline-block;
     vertical-align: bottom;
     background: url(../../static/image/icon_refresh@3.png) no-repeat;
     background-size: 100%;
   }
</style>
