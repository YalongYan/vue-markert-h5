/*
* 这是一个显示对象中leftText和rightValue的组件
*/
<template>
  <div class="text-input-container" :class="{line: !isShowLine}">
    <div class="left-text-wrap">
      {{config.leftText}}
    </div>
    <div class="right-value-wrap">
      {{config.rightValue}}
    </div>
  </div>
</template>

<script>

export default {
  props: {
    config: {
      type: Object,
      default() {
        return {};
      },
    },
    isShowLine: {
      type: Boolean,
      default: false, // 用来判断是否显示下边框
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/css/common";
.text-input-container {
  @include flexbox;
  @include  font-dpr(28px);
  height:px2rem(80px);
  align-items: center;
  justify-content: space-between;
  margin: 0 10px;

  .left-text-wrap {
    @include flexbox;
  }
  .right-value-wrap {
    @include flexbox;
  }
}

.line {
  border-bottom: 1px solid #E0E6ED;
}
</style>
