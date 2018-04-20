<!--
商家信息和拨打电话组件
可以在此处呼出电话
 -->
<template>
  <div class="contact-item-container">
    <div class="left-content-wrap">
      {{dealerNo}} {{shopName}}
    </div>
    <!--
      @click.stop 方法使点击后页面不跳转不刷新
    -->
    <div class="right-content-wrap" @click.stop="clickToCall">
      {{mobile}}
      <span class="right-space"></span>
      <img :src="btnPhoneImg">
    </div>
  </div>
</template>

<script>
import btnPhoneImg from '@/../static/image/btn_phone.png';

export default {
  props: {
    dealerNo: {
      type: String,
      default: '',
    },
    shopName: {
      type: String,
      default: '',
    },
    mobile: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      btnPhoneImg: btnPhoneImg,
    };
  },
  methods: {
    clickToCall() {
      this.$emit('phoneCall', this.mobile);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/css/common";
.contact-item-container {
  @include flexbox;
  @include  font-dpr(28px);
  height:px2rem(80px);
  width: 100%;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #EFF2F7;

  .left-content-wrap {
    @include flexbox;
    @include font-dpr(26px);

    margin-left: px2rem(20px);
    color: #495362;
    line-height: px2rem(26px);
  }
  .right-content-wrap {
    @include flexbox;
    margin-right : px2rem(20px);
    align-items: center;
    @include  font-dpr(26px);
    color: #368CDA;
    line-height: 26px;

    .right-space{
      width: px2rem(10px);
    }

    img {
      width: 15px;
      height: 15px;
    }
  }
}
</style>
