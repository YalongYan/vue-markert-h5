<template>
  <div class="notfound">
    <div>
      <div class="error"></div>
      <div class="etext">页面不存在...</div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="css" scoped>
  .notfound {
    display: flex;
    /* align-items: center; */
  }
  .notfound > div {
    width: 100%;
    margin-top: 100px;
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


</style>
