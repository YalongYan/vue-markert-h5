/*
* 链好车登录页面，通过手机号登录，发送验证码，验证登录
*/
<template>
  <div class="login-container">
    <!--logo-->
    <div class="logo">
       <img src="../../static/image/logo_h5.png">
    </div>
    <!--输入-->
    <div class="login-wrapper">
       <div class="form-tel">
           <input type="tel" class="number" v-model="mobile" @focus="focus" @blur="blur" placeholder="请输入手机号码">
       </div>
       <div class="form-code">
           <input type="tel" class="code" v-model="code" @focus="focus" @blur="blur" placeholder="请输入验证码">
           <span :class="{'codes':this.codeMsg === '获取验证码', 'codes2':this.codeMsg !== '获取验证码'}" @click="getCode">{{codeMsg}}</span>
       </div>
    </div>
    <!--按钮-->
    <div class="button-wrapper">
       <div class="button-login" @click="login">登录</div>
       <div class="bottom-logo" v-show="bottomLogoIsShow">
           <img src="../../static/image/qichexiehuilogo.png">
       </div>
    </div>
    <!--按钮 end-->
  </div>

</template>
<script>
import { mapActions } from 'vuex';
import axios from 'axios';
import api from '@/api';

export default {
  components: {},
  data() {
    return {
      mobile: '',
      code: '',
      uuid: '',
      codeMsg: '获取验证码',
      bottomLogoIsShow: true,
    };
  },
  methods: {
    ...mapActions(['setToken']),
    /*
    * 焦点处理函数
    */
    focus() {
      this.bottomLogoIsShow = false;
    },
    /*
    * 失焦处理函数
    */
    blur() {
      this.bottomLogoIsShow = true;
    },
    /*
    * 登录页提示
    */
    toast(str) {
      this.$vux.toast.show({
        text: str,
        position: 'middle',
        type: 'text',
        width: '35%',
      });
    },
    /*
    * 登录按钮点击处理函数
    */
    login() {
      if (!/^\d{11}$/.test(this.mobile) || !this.mobile || !this.code) {
        this.toast('手机号码有误，请重填');
        return;
      }
      /*
      * 登录请求参数
      */
      const params = {
        username: this.mobile,
        password: this.code,
        uuid: this.uuid,
      };
      /*
      * api登录请求
      */
      api.customerLogin(params).then((res) => {
        if (res.status != 200) return;
        const token = res.data.data.token;
        if (token) {
          axios.defaults.headers['x-access-token'] = token;
          this.setToken(token);
          this.$router.push({ name: 'home' });
        }
      });
    },
    /*
    * 获得验证码按钮点击处理函数
    */
    getCode() {
      if (this.codeMsg !== '获取验证码') {
        return;
      }
      if (!/^\d{11}$/.test(this.mobile)) {
        this.toast('手机号码有误，请重填');
        return;
      }
      /*
      * api请求获取当前手机号登录需要的验证码
      */
      api.sendSmsCaptcha(this.mobile).then((res) => {
        if (res.status != 200) { return; } else if (res.data.code != 0) {
          return;
        }
        window.app.$vux.toast.text('发送成功');
        this.uuid = res.data.data.uuid;
        this.setTime(60);
      });
    },
    /*
    * 验证码请求后倒数计时
    */
    setTime(time) {
      if (time == 0) {
        this.codeMsg = '获取验证码';
        return;
      }
      this.codeMsg = `重新发送(${time})`;
      time--;

      setTimeout(() => {
        this.setTime(time);
      }, 1000);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/css/common";

.login-container {
  background: $bgfff;

  padding: 0 px2rem(36px);

  .logo {
    width: px2rem(305px);
    height: px2rem(139px);
    // padding: px2rem(182px) 0;
    padding:px2rem(200px) 0 px2rem(160px) 0;
    margin: auto;

    img {
      width: 100%;
      //height: 100%;
    }
  }

  .login-wrapper {
    background: $bgfff;
    font-size: px2rem(34px);
    color: $fontlightgrey;

    .form-tel {
      border-bottom: 1px solid #e0e6ed;
      padding: px2rem(30px) px2rem(30px) px2rem(30px) px2rem(100px);
      background: url(../../static/image/icon_phone.png) no-repeat px2rem(40px)
        center;
      background-size: 5%;
      .number {
        width: 100%;
      }
    }

    .form-code {
      border-bottom: 1px solid #e0e6ed;
      padding: px2rem(30px) px2rem(30px) px2rem(30px) px2rem(100px);
      background: url(../../static/image/icon_secret.png) no-repeat px2rem(40px)
        center;
      background-size: 5%;
      .code {
        width: px2rem(250px);
        padding-right: px2rem(100px);
        border-right: 1px solid #c0ccda;
        border-radius: 0;
      }
      .codes {
        font-size: px2rem(28px);
        color: $fontblue;
        margin-left: px2rem(15px);
      }
      .codes2 {
        font-size: px2rem(28px);
        margin-left: px2rem(15px);
      }
    }
  }

  .button-wrapper {
    margin-top: px2rem(98px);
    .button-login {
      width: 100%;
      height: px2rem(96px);
      line-height: px2rem(96px);
      font-size: px2rem(36px);
      color: $fontfff;
      text-align: center;
      background: $bgblue;
      border-radius: 5px;
    }
    .bottom-logo{
      // position:relative;
      width: 140px;
      /* margin: 40% auto; */
      position: absolute;
      left: 50%;
      bottom: px2rem(40px);
      margin-left: -70px;
      img{

      }
    }
    .hint {
      font-size: px2rem(28px);
      color: $fontblack;
      margin: px2rem(98px);
      text-align: center;
      span {
        color: $fontblue;
      }
    }
  }
}
</style>
