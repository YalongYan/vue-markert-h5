<!--
确定|取消弹窗组件
 -->
<template>
  <div v-transfer-dom class="exit-edit-content">
    <x-dialog v-model="showCallDialog" class="confirm-call-dialog">
      <div class="dialog-title">{{title}}</div>
      <div class="dialog-body">{{tip}} {{mobile}}？</div>
      <div class="dialog-footer">
      <span @click="cacel">取消</span>
      <span @click="confirm">确定</span>
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
    title: {
      type: String,
      default: '',
    },
    tip: {
      type: String,
      default: '',
    },
    mobile: {
      type: String,
      default: '',
    },
    show: { // dialog显示隐藏
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      showCallDialog: this.show,
    };
  },
  methods: {
    cacel() {
      this.$emit('cancel');
    },
    confirm() {
      this.$emit('confirm');
    },
  },
  watch: {
    // show为true时显示
    show(val) {
      this.showCallDialog = val;
    },
  },
};
</script>

<style lang="scss" >
@import "../assets/css/common";
.confirm-call-dialog{
  .weui-dialog{
    width:px2rem(490px);
    max-width:none;
    border-radius: px2rem(24px);

    .dialog-title {
      @include font-dpr(34px);
      margin-top: 20px;
    }
    .dialog-body{
      @include font-dpr(30px);
      line-height: px2rem(240px);
      border-bottom:1px solid #E0E6ED;
      color: $fontblack;
    }
    .dialog-footer{
      display: flex;
      span{
        height:px2rem(100px);
        flex-grow: 1;
        line-height:px2rem(100px);
        @include font-dpr(32px);
        color: #636D7C;
      }
      span:first-child{
        color: #636D7C;
        border-right:1px solid #E0E6ED;
      }
      span:last-child{
        background-color: $fontblue;
        color: $fontfff;
      }
    }
  }
}
</style>
