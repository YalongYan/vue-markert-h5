<!--
表单输入框组件
用于个人中心信息框
 -->
<template>
  <div class="form-items-container">
    <div v-for="(config, index) in formConfigs" :key="index" class="items-wrap">
      <text-input v-if="config.type === 'text'" :config="config" :isShowLine="++index === formConfigs.length"></text-input>
    </div>
  </div>
</template>

<script>
// 不存在组件
import textInput from '@/components/inputs/text-input';

export default {
  props: {
    formConfigs: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  components: {
    textInput,
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
.form-items-container{
  background: $bgfff;
}
</style>
