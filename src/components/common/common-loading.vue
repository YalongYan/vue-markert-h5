/*
* 这是一个表示加载的gif图片
*/
<template>
  <div class="mf-loading-container">
    <img src="@/assets/loading.gif">
  </div>
</template>
<script type="text/ecmascript-6">
const COMPONENT_NAME = 'loading';
export default {
  name: COMPONENT_NAME,
};
</script>
<style lang="scss" >
@import "../../assets/css/common";
.mf-loading-container{
    position: fixed;
    width: 100%;
    height: 100%;
    z-index: 99;
 img{
    width: 2rem;
    height: 2rem;
    position: absolute;
    left: 50%;
    margin-left: -1rem;
    top: 50%;
    margin-top: -1rem;
 }
}
</style>
