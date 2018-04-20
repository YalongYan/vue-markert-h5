<!--
底部信息组件，车辆管理和个人中心
 -->
<template>
	<div class="tabar">
		<router-link :to="tab.url" v-for="(tab, index) in tabNames" :key="index" >
			<div class="tab-item">
				<!-- 根据当前位置决定显示哪个图片 -->
				<img class="tab-icon" :src="navIndex === index ? tab.iconActive : tab.icon"/>
				<div class="tabName" :class="{ textActive: navIndex === index }">{{tab.name}}</div>
			</div>
		</router-link>
	</div>
</template>

<script>
export default {
  name: 'footer-tabs',
  props: {
    tabNames: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  computed: {
    navIndex() {
      const CurRouteArray = this.$route.path.split('/');
      switch (CurRouteArray[1]) {
        case 'home':
          return 0;
        case 'mine':
          return 1;
        default:
          return 0;
      }
    },
  },
};
</script>

<style scoped lang="scss">
@import "../assets/css/common";

.tabar {
	display: flex;
	justify-content: space-around;
	width: 100%;
	height: px2rem(120px);
	background: $bgfff;
	box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.2);

	.tab-item{
		@include flexbox;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		margin-top: 5px;

		.tab-icon{
			width: 27px;
			height:27px;
		}

		.tabName {
			margin-top: 5px;
			color: #2c2c2c;
		}
		.textActive {
			color: #1296db;
		}
	}
}
</style>
