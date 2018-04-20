/*
*  这是一个弹出框通用组件
*/
<template>
  <div v-transfer-dom class="exit-edit-content">
    <x-dialog v-model="showDialog" class="exit-edit-dialog">
      <!-- 主体内容 -->
      <div class="dialog-body">{{tipText}}</div>
      <div class="dialog-footer">
        <!-- 取消内容 -->
        <span @click="cancel">{{cancelText}}</span>
        <!-- 确定内容 -->
        <span @click="confirm">{{confirmText}}</span>
      </div>
    </x-dialog>
  </div>
</template>

<script>
import { XDialog, TransferDomDirective as TransferDom } from 'vux';

export default {
  directives: {
    TransferDom,
  },
  components: {
    XDialog,
  },
  props: {
    show: { // dialog显示隐藏
      type: Boolean,
      default: false,
    },
    tipText: { // 提示文本
      type: String,
      default: '确认放弃本次编辑？',
    },
    cancelText: { // 取消按钮文案
      type: String,
      default: '取消',
    },
    confirmText: { // 确认按钮文案
      type: String,
      default: '确认',
    },
  },
  data() {
    return {
      showDialog: this.show,
    };
  },
  methods: {
    cancel() {
      this.$emit('cancel');// 向上传递cancel和confirm时间
    },
    confirm() {
      this.$emit('confirm');
    },
  },
  watch: {
    show(val) {
      this.showDialog = val;
    },
  },
};
</script>

<style lang="scss" >
@import "../../assets/css/common";
.exit-edit-content{
  .exit-edit-dialog{
    .weui-dialog{
      width:px2rem(490px);
      max-width:none;
      border-radius: px2rem(24px);
      .dialog-body{
        padding:px2rem(52px) px2rem(75px) px2rem(38px);
        border-bottom:1px solid #E0E6ED;
        @include font-dpr(32px);
        font-family: PingFangSC-Regular;
      }
      .dialog-footer{
        display: flex;
        span{
          height:px2rem(88px);
          flex-grow: 1;
          line-height:px2rem(88px);
          font-family: PingFangSC-Regular;
          @include font-dpr(32px);
        }
        span:first-child{
          color: #636D7C;
          border-right:1px solid #E0E6ED;
        }
        span:last-child{
          color: $fontblue;
        }
      }
    }
  }
}
</style>
