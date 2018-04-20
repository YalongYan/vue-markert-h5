/*
* 业务描述:展示车辆详情中的基本信息
* 跳转路径:车辆详情页面
*
* 创建人:宋金委
* 时间:2018-03-18
*/
<template>
  <div class="base-info-container">
    <div class="title-container">基本信息</div>
    <form-items :formConfigs="formConfigs"></form-items>
  </div>
</template>

<script>
import formItems from '@/components/form-items';
import baseInfoObj from '@/lib/baseinfo';// 基础数据包含地址等

const cities = baseInfoObj.cities;// 获取地址编号集合
export default {
  props: {// 初始化父组件传递的参数
    vinCode: { // VIN(0/17)
      type: String,
      default: '1',
    },
    carType: { // 品牌车型
      type: String,
      default: '',
    },
    odographNum: { // 表显里程
      type: String,
      default: '',
    },
    firstLicenseTag: { // 初次上牌
      type: String,
      default: '',
    },
    keyNum: { // 钥匙数量
      type: String,
      default: '',
    },
    bodyColorId: { // 车身颜色
      type: String,
      default: '',
    },
    interiorColorId: { // 内饰颜色
      type: String,
      default: '',
    },
    region: { // 车辆所在地
      type: Number,
      default: 0,
    },
    belongRegion: { // 车辆归属地
      type: Number,
      default: 0,
    },
    licencePlateNum: { // 车牌号
      type: String,
      default: '',
    },
    manufactureDate: { // 出厂日期
      type: String,
      default: '',
    },
    carProperty: { // 车辆性质
      type: String,
      default: '',
    },
    useProperty: { // 使用性质
      type: String,
      default: '',
    },
    outputVolume: { // 排量
      type: String,
      default: '',
    },
    emissionStandard: { // 排放标准
      type: String,
      default: '',
    },
    warrantyTime: { // 质保时间
      type: String,
      default: '',
    },
    warrantyMileage: { // 质保里程
      type: String,
      default: '',
    },
  },
  components: {// 注册组件
    formItems,
  },
  data() { // 初始化数据
    return {
      formConfigs: [],
      regionName: '--',
      belongRegionName: '--',
    };
  },
  watch: {// 监听数据
    bodyColorId() {
      this.setFormData();
    },
  },
  methods: {
    // 整理 formItem组件 需要的数据
    setFormData() {
      // 通过编号获取相应的地址
      if (this.region !== 0) {
        this.regionName = `${cities[this.region]}`;
      }
      // 通过编号获取相应的地址
      if (this.belongRegion !== 0) {
        this.belongRegionName = `${cities[this.belongRegion]}`;
      }
      this.formConfigs.push({ type: 'text', leftText: `VIN (${this.vinCode == '--' ? 0 : this.vinCode.length}/17)`, rightValue: this.vinCode });
      this.formConfigs.push({ type: 'text', leftText: '车辆类型', rightValue: this.carType });
      this.formConfigs.push({ type: 'text', leftText: '表显里程', rightValue: this.odographNum });
      this.formConfigs.push({ type: 'text', leftText: '初次上牌', rightValue: this.firstLicenseTag });
      this.formConfigs.push({ type: 'text', leftText: '钥匙数量', rightValue: this.keyNum });
      this.formConfigs.push({ type: 'text', leftText: '车身颜色', rightValue: this.bodyColorId });
      this.formConfigs.push({ type: 'text', leftText: '内饰颜色', rightValue: this.interiorColorId });
      this.formConfigs.push({ type: 'text', leftText: '车辆所在地', rightValue: this.regionName });
      this.formConfigs.push({ type: 'text', leftText: '车辆归属地', rightValue: this.belongRegionName });
      this.formConfigs.push({ type: 'text', leftText: '车牌号', rightValue: this.licencePlateNum });
      this.formConfigs.push({ type: 'text', leftText: '出厂日期', rightValue: this.manufactureDate });
      this.formConfigs.push({ type: 'text', leftText: '车辆性质', rightValue: this.carProperty });
      this.formConfigs.push({ type: 'text', leftText: '使用性质', rightValue: this.useProperty });
      this.formConfigs.push({ type: 'text', leftText: '排量', rightValue: this.outputVolume });
      this.formConfigs.push({ type: 'text', leftText: '排放标准', rightValue: this.emissionStandard });
      this.formConfigs.push({ type: 'text', leftText: '质保时间', rightValue: this.warrantyTime });
      this.formConfigs.push({ type: 'text', leftText: '质保里程', rightValue: this.warrantyMileage });
    },
  },
};
</script>
<style lang="scss" scoped>
@import "../assets/css/common";
.base-info-container {
  @include flexbox;
  flex-direction: column;

  .title-container {
    background-color: #F4F4F4;
    @include  font-dpr(24px);
    color: #8492A6;
    height: px2rem(60px);
    line-height: 30px;
    padding-left: 10px;
  }
}
</style>
