<!-- /*
*车辆配置信息组件，显示车辆配置列表
*CarDetails调用此组件，暂未使用的静态页面
*/ -->
<template>
  <div class="detail-config-container">
    <div class="title-container">配置信息</div>
    <div class="equipment">
      <span v-show="carConfigure.electricRearviewMirrorControl>0">后视镜电动调节</span>
      <span v-show="carConfigure.vehicleNavigation>0">车载导航</span>
      <span v-show="carConfigure.dvd>0">CD/DVD</span>
      <span v-show="carConfigure.airCondition>0">空调</span>
      <span v-show="carConfigure.centralLock>0">中控锁</span>
      <span v-show="carConfigure.remoteKey>0">遥控钥匙</span>
      <span v-show="carConfigure.spareTire>0">备用轮胎</span>
      <span v-show="carConfigure.srs>0">安全气囊</span>
      <span v-show="carConfigure.sunroof>0">天窗</span>
      <span v-show="carConfigure.electricFrontSeatControl>0">前座椅电动调节</span>
      <span v-show="carConfigure.leatherSeat>0">真皮座椅</span>
      <span v-show="carConfigure.reversingRadar>0">倒车雷达	</span>
      <span v-show="carConfigure.reversingCamera>0">倒车影像</span>
      <span v-show="carConfigure.radio>0">收音机</span>
      <span v-show="carConfigure.cruiseControl>0">定速巡航</span>
      <span v-show="carConfigure.pushButtonStart>0">一键启动</span>
      <span v-show="carConfigure.electricWindow>0">电动车窗</span>
      <span v-show="carConfigure.vehicleNavigation>0">车载导航	</span>
      <span v-show="carConfigure.abs>0">防抱死制动系统</span>
      <span v-show="carConfigure.eba>0">刹车辅助系统</span>
      <span v-show="carConfigure.esp>0">车身稳定系统</span>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    carConfigure: {
      type: Object,
      default() {
        return {};
      },
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/css/common";
.detail-config-container {

  .title-container {
    height: 30px;
    line-height: 30px;
    margin-left: 10px;
    //@include font-dpr(28px);
    color: #8492A6;
    @include  font-dpr(24px);
  }

  .equipment {
    @include font-dpr(28px);
    background-color: $bgfff;
    color: #000;
    padding: 10px 15px;
    line-height: px2rem(50px);

    span {
      margin-right: px2rem(28px);
    }
  }
}
</style>
