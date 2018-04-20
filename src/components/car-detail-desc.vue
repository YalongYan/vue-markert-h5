<!-- /*
*车辆详情的车辆描述组件，用于展示车辆主要的属性
*不包括车辆图片
*页面过多的CSS写入，格式有待优化
*/ -->
<template>
  <div class="contact-item-container">
    <!-- 显示在车辆属性标签 -->
    <div class="brand-desc-wrap">
    <!--  if isNew===true class=type-new,else class=type-old -->
      <span :class="isNew ? 'type-new' : 'type-old'">{{carType}}</span>
      {{brandDescription}}
    </div>
    <div class="license-odograph-wrap">
      {{firstLicenseTag}}上牌 | {{odographNum}} | {{licencePlateNum}} | {{bodyColorId}}
      <span class="car-price">￥{{newCarPrice}}</span>
    </div>
    <div class="vin-code-wrap">
      VIN码：{{vinCode}}
    </div>
    <div class="market-status-wrap">
      <span class="market-status-wrap-span">{{initMarketStatus}}</span>
      <span class="market-status-wrap-span">入场{{entryMarketTime}}天</span>
      <!-- 出|入场按钮，点击触发事件，$event传入当前按钮的value -->
      <span @click="changeStatus($event)" class="admission-state">{{marketStatus}}</span>
    </div>
    <!-- 事件确定组件，cancel取消，confir确定，show为true时显示 -->
    <change-dialog :title=title :tip=tip @cancel="cacelCallChange" @confirm="confirmCallChange" :show="showChangeDialog" ></change-dialog>
  </div>
</template>

<script>
import changeDialog from '@/components/common-dialog';
import api from '@/api';

export default {
  props: {
    carType: { // 车辆类型 新车|二手车
      type: String,
      default: '',
    },
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
      type: Number,
      default: 0,
    },
    marketStatus: { // 入场状态
      type: String,
      default: '',
    },
    newCarPrice: { // 新车价格
      type: String,
      default: '',
    },
    carId: {
      default: '',
    },
    initMarketStatus: {
      default: '',
    },
  },
  data() {
    return {
      // change-dialog组件显示默认值 不显示
      showChangeDialog: false,
      title: '',
      tip: '',
    };
  },
  // 申明调用的组件
  components: {
    changeDialog,
  },
  methods: {
    // 出场|入场按钮的响应
    changeStatus(event) {
      // 使用 event.currentTarget.innerHTML 来返回元素的内容
      const el = event.currentTarget.innerHTML;
      // console.log(`当前对象的内容：${el}`);
      this.title = el;
      this.tip = `确定将该车辆${el}吗`;
      // 调用change-dialog组件
      this.showChangeDialog = true;
    },
    cacelCallChange() {
      // 点击后隐藏组件
      this.showChangeDialog = false;
    },
    confirmCallChange() {
      // 根据获取的当前状态，决定调用出场或入场接口
      if (this.title == '出场') {
        api.setCarOut(this.carId).then((res) => {
          if (res.status == 200) {
            // 执行父类的初始化函数  相当于重新请求接口
            // 出|入场操作完成后重新获取车辆列表并渲染
            this.getCarDetails();
            this.getCarConfigs();
          }
          // 点击并响应后隐藏组件
          this.showChangeDialog = false;
        });
      } else if (this.title == '入场') {
        api.setCarEnter(this.carId).then((res) => {
          // 执行父类的初始化函数  相当于重新请求接口
          if (res.status == 200) {
            this.getCarDetails();
            this.getCarConfigs();
          }
          this.showChangeDialog = false;
        });
      }
    },
    // 方法传递
    getCarDetails() {
      this.$emit('getCarDetails');
    },
    getCarConfigs() {
      this.$emit('getCarConfigs');
    },
  },
  computed: {
    // 新车判断
    isNew() {
      if (this.carType === '新车') {
        return true;
      }
      return false;
    },
  },
  //  created() {
  //   this.getCarDetails();
  //   this.getCarConfigs();
  // },
};
</script>

<style lang="scss" scoped>
@import "../assets/css/common";
.contact-item-container {
  @include flexbox;
  @include  font-dpr(28px);
  background-color: $bgfff;
  font-family: "PingFangSC-Regular";
  flex-direction: column;
  line-height: px2rem(40px);
  margin: px2rem(20px) px2rem(24px) 0;
  padding-bottom: px2rem(20px);
  border-bottom: 1px dashed #ACBACA;

  .brand-desc-wrap{
    height:px2rem(80px);
    font-family: "PingFangSC-Medium";

    .type-new {
      display: inline-block;
      border-radius: 4px;
      color: #FF6E46;
      @include font-dpr(22px);
      border:  1px solid #FF6E46;
    }

    .type-old {
      display: inline-block;
      border-radius: 4px;
      color: #34BE85;
      border:  1px solid #34BE85;
      @include font-dpr(22px);
    }
  }

  .license-odograph-wrap{
    @include flexbox;
    justify-content: space-between;
    align-items: center;
    @include  font-dpr(20px);
    color: #495362;
    line-height: 24px;
    // margin-bottom: px2rem(10px);
    .car-price{
      float: right;
      @include  font-dpr(26px);
      color: #D0021B;
      line-height: 30px;
    }
  }

  .vin-code-wrap{
    @include  font-dpr(24px);
    color: #495362;
    padding-bottom: px2rem(10px);
  }

  .market-status-wrap-span{
    background: #F4F8FE;
    border: 1px solid #DADEE3;
    border-radius: 4px;
    @include  font-dpr(22px);
    color: #636D7C;
  }
  .admission-state{
    @include  font-dpr(24px);
    color: #368CDA;
    color: #368CDA;
    width: 1.33333rem;
    line-height: 0.6rem;
    text-align: center;
    border: 1px solid #91bee6;
    border-radius: 0.08rem;
    display: inline-block;
    float: right;
    cursor: pointer;
  }

  .left-content-wrap {
    @include flexbox;
  }
  .right-content-wrap {
    @include flexbox;
    align-items: center;

    img {
      width: 15px;
      height: 15px;
    }
  }

}
</style>
