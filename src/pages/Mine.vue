/*
* 业务描述:展示已登录账户的个人信息
* 跳转路径:底部tabbar->个人中心
*
*/
<template>
  <network-error v-if="isReqError"></network-error>
  <div v-else class="mine-container">
    <form-items :formConfigs="formConfigs"></form-items>
    <login-out-button @loginOut="loginOut" btnText="退出登录"></login-out-button>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import loginOutButton from '@/components/login-out-button';
import formItems from '@/components/form-items';
import networkError from '@/components/network-error';
import api from '@/api';

export default {
  components: {// 注册的组件
    loginOutButton,
    formItems,
    networkError,
  },
  data() {
    return {// 初始化数组
      formConfigs: [],
    };
  },
  computed: {
    ...mapState({
      userInfo: state => state.user.userInfo,
      isReqError: state => state.base.isReqError,
    }),
  },
  created() {
    this.getUserInfo();
  },
  methods: {
    ...mapActions(['setSignOut', 'setUserInfo']),
    // 整理需要显示的账户个人数据的数据,发送给组件formItems
    setFormConfigs() {
      const { userName, mobile, marketName, deptNames, dutyNames, roleNames } = this.userInfo;
      this.formConfigs.push({ type: 'text', leftText: '姓名', rightValue: userName });
      this.formConfigs.push({ type: 'text', leftText: '手机', rightValue: mobile });
      this.formConfigs.push({ type: 'text', leftText: '所在市场', rightValue: marketName });
      this.formConfigs.push({ type: 'text', leftText: '部门', rightValue: deptNames });
      this.formConfigs.push({ type: 'text', leftText: '职务', rightValue: dutyNames });
      this.formConfigs.push({ type: 'text', leftText: '系统权限', rightValue: roleNames });
    },
    // 获取个人信息方法
    getUserInfo() {
      api.getUserInfo().then((res) => {
        this.setUserInfo(res.data.data);
        this.setFormConfigs();
      });
    },
    // 登出方法,成功后跳转路由 login
    loginOut() {
      this.setSignOut();
      this.$router.replace({
        name: 'login',
      });
    },
  },
};
</script>
