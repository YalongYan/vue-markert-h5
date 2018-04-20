<!--
车辆列表页车列表展示组件
集合了car-list-desc+list-img+common-dialog+
  -->
<template>
  <div  class="car-list">
    <ul class="scroll-list-content" >
      <li v-for="(item,index) in carList" class="scroll-list-item" :key="index" @click="toDetail(item)" >
        <div class="list-item-content">
          <list-img :type="item.type" :imgSrc="item.headImage" :carNumber="item.carNumber"></list-img>
          <list-desc
            :brandDescription="item.brandDescription"
            :firstLicenseTag="item.firstLicenseTag | formatDate('yyyy-MM')"
            :odographNum="item.odographNum | formatMillion"
            :licencePlateNum="item.licencePlateNum | licencePlateNumFilter"
            :bodyColorId="item.bodyColorId | bodyColorFilter"
            :entryMarketTime="item.entryMarketTime | numToStr"
            :vinCode="item.vinCode |checkValue"
            :marketStatus="item.marketStatus | markerStatusFilter"
            :initMarketStatus="item.marketStatus | initMarkerStatusFilter"
            :carId="item.carId"
            @getCarList_change="getCarList_change"
          >
        </list-desc>
        </div>
        <contact-item class="contact-item" @phoneCall="phoneCall" :dealerNo="item.dealerNo" :shopName="item.shopName" :mobile="item.mobile"></contact-item>
      </li>
    </ul>
  </div>
</template>

<script>
import listImg from '@/components/common/common-list-img';
import listDesc from '@/components/car-list-desc';
import contactItem from '@/components/contact-item';

// 传递给子组件的值
export default{
  components: {
    contactItem,
    listImg,
    listDesc,
  },
  props: {
    carList: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  // data() {
  //   return {
  //
  //   };
  // },
  // created() {
  // },
  methods: {
    // 路由跳转到车辆详情页面，传入当前车的ID以及电话
    toDetail(item) {
      this.$router.push({ name: 'cardetail', params: { id: item.carId, mobile: item.mobile } });
    },
    // 方法传递
    phoneCall(mobile) {
      this.$emit('phoneCall', mobile);
    },
    getCarList_change() {
      this.$emit('getCarList_change');
    },

  },
};
</script>
<style lang="scss">
  @import "../assets/css/common";
  .car-list{
    width: 100%;
    height: 100%;

    .scroll-list-content {
      width: 100%;
      height: 100%;

      .scroll-list-item {
        @include flexbox;
        flex-direction: column;
        width: 100%;
        height: px2rem(305px);
        background: #F4F4F4;
        margin-bottom: px2rem(20px);
        background: $bgfff;

        .list-item-content {
          // @include flexbox;
          background: $bgfff;
          border-bottom: 1px solid #EFF2F7;
          padding-bottom: px2rem(13px);
          margin: px2rem(10px) px2rem(10px) 0;
        }
      }

      .contact-item {
        width: 100%;
        background: $bgfff;

      }
    }
  }
</style>
