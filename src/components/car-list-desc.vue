<!--
车辆列表里的车辆信息组件，与car-detail-desc高度相似
 -->

<template>
  <div class="list-desc-container">
    <div class="brand-desc-wrap">
      {{brandDescription}}
    </div>
    <div class="license-odograph-wrap">
      {{firstLicenseTag}}上牌 | {{odographNum}}
    </div>
    <div class="plate-color-wrap">
      {{licencePlateNum}} | {{bodyColorId}}
    </div>
    <div class="vin-code-wrap">
      VIN码：{{vinCode}}
    </div>
    <div class="market-status-wrap">
      <span>{{initMarketStatus}}</span>
      <span>入场{{entryMarketTime}}天</span>
      <div class="admission-state" @click.stop="changeState($event)">
        {{marketStatus}}
      </div>
    </div>

    <change-dialog :title=title :tip=tip @cancel="cacelCallChange" @confirm="confirmCallChange" :show="showChangeDialog" ></change-dialog>
  </div>
</template>

<script>
import api from '@/api';
import changeDialog from '@/components/common-dialog';

export default {
  props: {
    brandDescription: { // 车型描述 品牌、车系、车型
      type: String,
      default: '',
    },
    firstLicenseTag: { // 首次上牌时间
      type: String,
      default: '',
    },
    odographNum: { // 表显里程
      type: String,
      default: '',
    },
    licencePlateNum: { // 车牌号码
      type: String,
      default: '',
    },
    bodyColorId: { // 车身颜色
      type: String,
      default: '',
    },
    vinCode: { // VIN 码
      type: String,
      default: '',
    },
    entryMarketTime: { // 入场时间 天数
      type: String,
      default: '',
    },
    marketStatus: { // 入场状态
      type: String,
      default: '',
    },
    initMarketStatus: {// 原始的状态
      type: String,
      default: '',
    },
    carId: {
      default: '',
    },
  },
  data() {
    return {
      showChangeDialog: false,
      title: '',
      tip: '',
    };
  },
  components: {
    changeDialog,
  },
  methods: {
    changeState(event) {
      const el = event.currentTarget.innerHTML;
      // console.log(`当前对象的内容：${el}`);
      this.title = el;
      this.tip = `确定将该车辆${el}吗`;
      this.showChangeDialog = true;
    },
    cacelCallChange() {
      this.showChangeDialog = false;
    },
    confirmCallChange() {
      // 去掉头尾的空格
      const _title = this.title.trim();
      if (_title == '出场') {
        api.setCarOut(this.carId).then((res) => {
          if (res.status == 200) {
            // 执行父类的初始化函数  相当于重新请求接口
            this.$emit('getCarList_change');
          }
          this.showChangeDialog = false;
        });
        // console.log(`出厂${this.carId}`);
      } else if (_title == '入场') {
        api.setCarEnter(this.carId).then((res) => {
          // 执行父类的初始化函数  相当于重新请求接口
          if (res.status == 200) {
            this.$emit('getCarList_change');
          }
          this.showChangeDialog = false;
        });
        // console.log(`入厂${this.carId}`);
      }
    },
    getCarDetails() {
      this.$emit('getCarDetails');
    },
    getCarConfigs() {
      this.$emit('getCarConfigs');
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/css/common";
.list-desc-container {
  position: relative;
  // @include flexbox;
  @include  font-dpr(28px);
  flex-direction: column;
  padding:0 px2rem(10px);
  width: 100%;

  .brand-desc-wrap{
    @include lines(1);
    @include  font-dpr(30px);
    /* autoprefixer: off */
    -webkit-box-orient: vertical;
    /* autoprefixer: on */
    -webkit-box-direction: normal;
    line-height: 25px;
    height: 25px;
    text-overflow: ellipsis;
    font-family: "PingFangSC-Medium";
    // padding-bottom: px2rem(10px);
    word-break: break-all;
  }
  .license-odograph-wrap{
    @include  font-dpr(24px);
    color: #495362;
    padding-top: px2rem(10px);
    line-height: 0.32rem;
    padding-top: 0;
  }
  .plate-color-wrap{
    @include  font-dpr(24px);
    line-height: px2rem(24px);
    margin-top: px2rem(10px);
  }
  .vin-code-wrap{
    color: #8492A6;
    line-height: px2rem(26px);
    //line-height: 0.39rem;
    height: px2rem(24px);
    margin-top: px2rem(14px);
    //margin-top: 0.1rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: 82%;
    /* iphone4 */
    @media screen and (device-width: 320px) and (device-height: 480px) and (-webkit-device-pixel-ratio: 2){
      line-height: 0.42rem;
      height: 0.38rem;
      margin-top: 0.1rem;
      max-width: 98%;
    }
    /* iphone5 */
   @media screen and (device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2){
     line-height: 0.42rem;
     height: 0.38rem;
     margin-top: 0.1rem;
     max-width: 98%;
   }
  }
  .market-status-wrap{
    @include  font-dpr(24px);
    color: #636D7C;
    line-height: px2rem(30px);
    margin-top: px2rem(10px);

    span{
      display: inline-block;
      background: #F4F8FE;
      border: 1px solid #DADEE3;
      border-radius: 4px;
      padding: px2rem(4px);
    }
  }
 .admission-state{
   color: #368CDA;
   width: px2rem(100px);
   // height: px2rem(45px);
   line-height: px2rem(45px);
   text-align: center;
   border: 1px solid #91bee6;
   border-radius: px2rem(6px);
   position: absolute;
   right: px2rem(30px);
   top: 1.96rem;
   @include  font-dpr(24px);
 }
}
</style>
