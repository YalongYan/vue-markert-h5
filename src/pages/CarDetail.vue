<template>
  <!-- 请求出错处理 -->
  <network-error v-if="isReqError"></network-error>
  <div v-else class="car-detail-container">
    <!-- 这是图片的tab组件 -->
    <!-- goImgListPage是跳转到图片预览页面 -->
    <!-- carNumber  carPicture 传到pic-tab组件待用 -->
    <pic-tab @goImgListPage="goImgListPage" :carNumber="carDetails.carNumber" :carPicture="carDetails.carPicture"></pic-tab>
    <!-- 详情描述 -->
    <!-- 这里用到了过滤器 比如:carType = "carDetails.carType | carTypeFilter"  就是用carTypeFilter方法过滤 carDetails.carType 然后赋值给carType  其他的类似-->
    <detail-desc
      :carType = "carDetails.carType | carTypeFilter"
      :brandDescription="carDetails.brandDescription"
      :firstLicenseTag="carDetails.firstLicenseTag | formatDate('yyyy-MM')"
      :odographNum="carDetails.odographNum | formatMillion"
      :licencePlateNum="carDetails.licencePlateNum"
      :bodyColorId="carDetails.bodyColorId | bodyColorFilter"
      :entryMarketTime="carDetails.entryMarketTime"
      :vinCode="carDetails.vinCode | checkValue"
      :marketStatus="carDetails.marketStatus | markerStatusFilter"
      :newCarPrice="carDetails.newCarPrice | formatMillion('万元')"
      :carId="carDetails.id"
      :initMarketStatus="carDetails.marketStatus | initMarkerStatusFilter"
      @getCarDetails="getCarDetails"
      @getCarConfigs="getCarConfigs"
    >
    </detail-desc>
    <!-- 电话联系组件 -->
    <contact-item class="contact-item" @phoneCall="phoneCall" :dealerNo="carDetails.dealerNo" :shopName="carDetails.shopName" :mobile="mobile"></contact-item>
    <!-- 基本信息 也用到了过滤器-->
    <detail-info
      :vinCode = "carDetails.vinCode | checkValue"
      :carType = "carDetails.carType | carTypeFilter"
      :odographNum = "carDetails.odographNum | formatMillion"
      :firstLicenseTag = "carDetails.firstLicenseTag | formatDate"
      :keyNum = "carDetails.keyNum | formatText('把')"
      :bodyColorId = "carDetails.bodyColorId | bodyColorFilter"
      :interiorColorId = "carDetails.interiorColorId | interiorColorFilter"
      :region = "carDetails.region"
      :belongRegion= "carDetails.belongRegion"
      :licencePlateNum= "carDetails.licencePlateNum | checkValue"
      :manufactureDate= "carDetails.manufactureDate | formatDate"
      :carProperty= "carDetails.carProperty | carProperty"
      :useProperty= "carDetails.useProperty | useProperty"
      :outputVolume= "carDetails.outputVolume | formatText('L')"
      :emissionStandard= "carDetails.emissionStandard | emissionStandard"
      :warrantyTime= "carDetails.warrantyTime | formatText('个月')"
      :warrantyMileage= "carDetails.warrantyMileage | formatMillion"
    >
    </detail-info>
    <!-- 配置信息 -->
    <!-- carConfigs 传递给detail-config 子组件 -->
    <detail-config
      :carConfigure="carConfigs"
    >
    <!-- 车辆描述 -->
    </detail-config>
    <!-- goCarDesc 跳转到详细的车辆描述页面 -->
    <div @click="goCarDesc" class="desc-wrap">车辆描述<span class="edit-icon"></span></div>
    <!-- 拨打电话的弹框组件 -->
    <common-dialog title="拨打电话" tip="确定拨打电话" @cancel="cacelCall" @confirm="confirmCall" :show="showCallDialog" :mobile="mobile"></common-dialog>
  </div>
</template>

<script>
import picTab from '@/components/pic-tab.vue';
import detailDesc from '@/components/car-detail-desc';
import detailConfig from '@/components/car-detail-config';
import detailInfo from '@/components/car-detail-info';
import commonDialog from '@/components/common-dialog';
import contactItem from '@/components/contact-item';
// 引入api
import api from '@/api';
// 错误处理
import networkError from '@/components/network-error';
import { mapState } from 'vuex';

export default {
  components: {
    picTab,
    detailDesc,
    detailConfig,
    detailInfo,
    commonDialog,
    contactItem,
    networkError,
  },
  data() {
    return {
      carId: '',
      mobile: '',
      showCallDialog: false, // 控制打电话弹框的显示 隐藏
      carDetails: {},
      carConfigs: {},
      // baseInfo: [],
    };
  },
  // 组件实例创建完成 就执行getCarDetails getCarConfigs 方法 获取数据
  created() {
    // carId  mobile 是用地址栏获取的
    this.carId = this.$route.params.id;
    this.mobile = this.$route.params.mobile;

    this.getCarDetails();
    this.getCarConfigs();
  },
  // 在create之前把setFetchLoading 设置成true 显示loading
  beforeCreate: function () {
    window.app.$store.dispatch('setFetchLoading', true);
  },
  computed: {
    ...mapState({
      isReqError: state => state.base.isReqError,
    }),
  },
  methods: {
    // 跳转到车辆描述详情页
    goCarDesc() {
      this.$router.push({ name: 'carDesc', params: { id: this.carId } });
    },
    // 获取车源信息
    getCarConfigs() {
      api.getCarConfigsByCarId(this.carId).then((res) => {
        this.carConfigs = res.data.data;
      });
    },
    // 获取车源配置信息
    getCarDetails() {
      api.getCarDetailByCarId(this.carId).then((res) => {
        this.carDetails = res.data.data;
      });
    },
    // 获取图片列表数据
    goImgListPage() {
      this.$router.push({ name: 'imgList', params: { carPicture: this.carDetails.carPicture } });
    },
    // 点击拨打电话 显示弹框
    phoneCall(mobile) {
      this.showCallDialog = true;
      this.mobileToCall = mobile;
    },
    // 点击电话弹框的确认按钮 打电话 并关闭弹框
    confirmCall() {
      this.showCallDialog = false;
      window.location.href = `tel://${this.mobileToCall}`;
    },
    // 点击打电话的取消按钮 弹框
    cacelCall() {
      this.showCallDialog = false;
    },
  },
};
</script>
<style lang="scss" scoped>
@import "../assets/css/common";
.car-detail-container {
  background: $bgfff;

  .contact-item {
    width: 100%;
    background: $bgfff;
  }

  .desc-wrap {
    position: relative;
    background: $bgfff;
    padding-left: 10px;
    height: 40px;
    line-height: 40px;
    margin: 10px 0;
    @include font-dpr(28px);
    .edit-icon {
      position: absolute;
      // top: px2rem(5px);
      right: px2rem(20px);
      height: 45px;
      line-height: 40px;
      width: 0.65rem;
      transform: scale(0.3);
      background: url(../../static/image/shape.png) no-repeat;
    }
  }

}
</style>
