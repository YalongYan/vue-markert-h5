/*
* 业务描述:展示车辆品牌列表,选择作为搜索条件
* 跳转路径:首页->品牌
*
*/
<template>
  <div>
    <div class="view-wrapper">
      <brand-list :data="brands" @select="brandChoice" ></brand-list>
      <div v-transfer-dom>
        <popup v-model="seriesShow" position="right" width="80%" :show-mask="false" class="l-border" >
           <brand-list :data="series" :tabShow="false" @select="seriesChoice" ></brand-list>
        </popup>
        <popup v-model="typesShow" position="right" width="60%" :show-mask="false" class="l-border">
           <brand-list  :data="types" :tabShow="false" @select="typesChoice"></brand-list>
        </popup>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { Popup, TransferDom } from 'vux';
import api from '@/api';
import brandList from '@/components/car-brand-list.vue';

export default {
  directives: {
    TransferDom, // 如果当前组件所在位置某一父级使用了 ViewBox 组件或者直接使用了 Safari 的 overflowScrolling:touch，请引入指令 transfer-dom 以解决其带来的 z-index 失效问题。如果你没有使用，那么不需要参照 demo 加上v-transfer-dom
  },
  props: {
    model: Boolean,
  },
  components: {// 注册组件
    brandList,
    Popup,
  },
  data() {
    return {// 初始化数据
      defaultData: [{
        spell: '*',
        brands: [
          {
            brandname: '不限品牌',
            brandid: '',
          },
        ],
      }],
      brandData: [],
      seriesShow: false,
      seriesData: [],
      typesShow: false,
      typesData: [],
    };
  },
  created() {
    // 请求车辆品牌数据
    api.getBaseCarBrand().then((res) => {
      this.brandData = this.defaultData.concat(res.data.data);
    });
  },
  methods: {
    ...mapActions(['setCarBrand', 'setCarSeries', 'setCarType']),
    // 选择品牌
    brandChoice(item) {
      this.setCarBrand(item);
      const brandId = this.carData.brand.value;

      if (brandId === '') {
        this.$router.go(-1);
      } else {
        this.typesShow = false;
        api.getBaseCarSeries(brandId).then((res) => {
          res.data.data.unshift({
            subbrand: '*',
            serials: [
              {
                serialname: '不限车系',
                serialid: '',
              },
            ],
          });
          this.seriesData = res.data.data;
          this.seriesShow = !this.seriesShow;
        });
      }
    },
    // 选择车型
    seriesChoice(item) {
      this.setCarSeries(item);
      const seriesId = this.carData.series.value;
      if (seriesId === '') {
        this.$router.go(-1);
      } else {
        api.getBaseCarTypes(seriesId).then((res) => {
          res.data.data.unshift({
            caryear: '*',
            carmodels: [
              {
                carname: '不限车型',
                carid: '',
              },
            ],
          });
          this.typesData = res.data.data;
          this.typesShow = !this.typesShow;
        });
      }
    },
    // 选择型号,之后返回
    typesChoice(item) {
      this.setCarType(item);
      if (this.model) {
        this.$emit('onchange', item);
      } else {
        this.$router.go(-1);
      }
    },
  },
  computed: {
    ...mapState({
      carData: state => state.carPicker.carData,
    }),
    brands() {
      const ret = [];
      this.brandData.forEach((brandGroup) => {
        const group = {};
        group.name = brandGroup.spell;
        group.items = [];
        brandGroup.brands.forEach((brand) => {
          const item = {};
          item.name = brand.brandname;
          item.value = brand.brandid;
          group.items.push(item);
        });
        ret.push(group);
      });
      return ret;
    },
    series() {
      const ret = [];
      this.seriesData.forEach((seriesGroup) => {
        const group = {};
        group.name = seriesGroup.subbrand;
        group.items = [];
        seriesGroup.serials.forEach((series) => {
          const item = {};
          item.name = series.serialname;
          item.value = series.serialid;
          group.items.push(item);
        });
        ret.push(group);
      });
      return ret;
    },
    types() {
      const ret = [];
      this.typesData.forEach((typesGroup) => {
        const group = {};
        group.name = typesGroup.caryear;
        group.items = [];
        typesGroup.carmodels.forEach((types) => {
          const item = {};
          item.name = types.carname;
          item.value = types.carid;
          group.items.push(item);
        });
        ret.push(group);
      });
      return ret;
    },
  },
};
</script>

<style scoped lang="scss">
@import "../assets/css/common";
  .view-wrapper{
    width: 100%;
    height: 100%;
    position: relative;
    overflow-y: auto;
  }
  .vux-popup-dialog{
    padding:0;
    .index-list{
      .index-list-content{
        .index-list-anchor{
          margin-right:0;
        }
      }
    }
  }
.l-border{
  .index-list{
     border-left: 1px solid #e0e6ed;
  }
}

</style>
