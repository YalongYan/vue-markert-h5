/*
* 业务描述:展示车辆相关描述信息
* 跳转路径:车辆详情页面->点击车辆描述
*
*/
<template>
  <!-- 请求出错处理 -->
<network-error v-if="isReqError"></network-error>
<div v-else>
  <div class="car_remarks" v-if="carDesc">
    <group>
      <div class="equipment">
        <p class="letter-break">
            {{ carDesc }}
        </p>
      </div>
    </group>
  </div>
  <nocar-page v-else :imgSrc="iconNodata" :noCarText="'暂无内容'"></nocar-page>
</div>
</template>
<script>
import { Group, Cell } from 'vux';
import nocarPage from '@/components/common/common-nocar-page';
import api from '@/api';
// 错误处理
import networkError from '@/components/network-error';
// 引入 vuex
import { mapState } from 'vuex';

export default {
  components: {// 注册组件
    Group,
    Cell,
    nocarPage,
    networkError,
  },
  data() {
    return {
      carDesc: '',
      id: '',
      iconNodata: require('../../static/image/icon_nodata.png'), // 引入图片,注意路径格式(../../***)
    };
  },
  created() {
    // lifecycle,请求数据
    this.getCarDesc();
  },
  methods: {
  // 获取车辆描述
    getCarDesc() {
      api.getCarDescByCarId(this.$route.params.id).then((res) => {
        this.carDesc = res.data.data.externalDesc;
      });
    },
  },
  computed: {
    ...mapState({
      isReqError: state => state.base.isReqError,
    }),
  },
};
</script>
<style lang="scss">
  @import "../assets/css/common";
  .car_remarks {
    width: 100%;
    height: 100%;

    .weui-cells__title{
      height: px2rem(60px);
      line-height: px2rem(60px);
      margin: 0;
      color: #368cda;
    }
    .weui-cell{
      @include  font-dpr(30px);
      .vux-cell-primary{
        color: #495362;
      }
      .weui-cell__ft{
        color: #000000;
        @include  font-dpr(28px);
        line-height: px2rem(28px);
      }
    }
    .equipment{
      color: #000000;
      @include font-dpr(28px);
      padding: 10px 15px;
    }
  }
</style>
