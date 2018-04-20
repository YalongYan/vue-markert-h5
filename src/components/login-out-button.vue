<!--
退出登录按钮组件
 -->
<template>
  <div class="login-out-container" @click="loginOut">
    {{btnText}}
  </div>
</template>

<script>

export default {
  props: {
    btnText: {
      type: String,
      default: '',
    },
  },
  methods: {
    loginOut() {
      this.$emit('loginOut');
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/css/common";
.login-out-container{
  @include flexCenter;
  @include  font-dpr(30px);
  width:100%;
  height:px2rem(88px);
  margin-top: 20px;
  background: $bgfff;
  color: $fontblue;
}
</style>
