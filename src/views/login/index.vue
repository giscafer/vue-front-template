<template>
  <div class="login-page">
    <img class="logo" src="@/assets/images/logo.png" alt="中康资讯" />
    <div class="login-container">
      <div class="intro-panel">
        <div class="app-name">
          <div class="line left-line"></div>
          <span>{{ loginPageTitle }}</span>
          <div class="line right-line"></div>
        </div>
      </div>
      <div class="login-panel">
        <el-form
          ref="loginForm"
          :model="loginForm"
          :rules="loginRules"
          class="login-form"
          autocomplete="on"
          label-position="left"
        >
          <div class="title-container">
            <h3 class="title">登录</h3>
          </div>

          <el-form-item prop="username">
            <span class="svg-container">
              <svg-icon icon-class="user" />
            </span>
            <el-input
              ref="username"
              v-model.trim="loginForm.username"
              placeholder="请输入账号"
              name="username"
              type="text"
              tabindex="1"
              autocomplete="on"
            />
          </el-form-item>

          <el-tooltip v-model="capsTooltip" content="Caps lock is On" placement="right" manual>
            <el-form-item prop="password">
              <span class="svg-container">
                <svg-icon icon-class="password" />
              </span>
              <el-input
                :key="passwordType"
                ref="password"
                v-model="loginForm.password"
                :type="passwordType"
                placeholder="请输入密码"
                name="password"
                tabindex="2"
                autocomplete="on"
                @keyup.native="checkCapslock"
                @blur="capsTooltip = false"
                @keyup.enter.native="handleLogin"
              />
              <span class="show-pwd" @click="showPwd">
                <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
              </span>
            </el-form-item>
          </el-tooltip>

          <el-button
            :loading="loading"
            type="primary"
            class="login-btn"
            @click.native.prevent="handleLogin"
          >登录</el-button>
          <span style="font-size:14px;color:#999;margin-left:46px">账号：admin，密码随便输入6位</span>
        </el-form>
      </div>
    </div>
    <div class="footer">
      <span class="copyright">copyright©2008～2020 Sinohealth, All Rights Reserved 粤ICP备17031174号</span>
    </div>
  </div>
</template>

<script>
import { loginPageTitle } from '@/settings';
export default {
  name: 'Login',
  components: {},
  data() {
    const validateUsername = (rule, value, callback) => {
      if (value.length < 5) {
        callback(new Error('请输入正确的账号'));
      } else {
        callback();
      }
    };
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('密码字符个数不能小于6位'));
      } else {
        callback();
      }
    };
    return {
      loginPageTitle: loginPageTitle,
      loginForm: {
        username: '',
        password: ''
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      passwordType: 'password',
      capsTooltip: false,
      loading: false,
      redirect: undefined,
      otherQuery: {}
    };
  },
  watch: {
    $route: {
      handler: function(route) {
        const query = route.query;
        if (query) {
          this.redirect = query.redirect;
          this.otherQuery = this.getOtherQuery(query);
        }
      },
      immediate: true
    }
  },
  created() {
    // window.addEventListener('storage', this.afterQRScan)
  },
  mounted() {
    if (this.loginForm.username === '') {
      this.$refs.username.focus();
    } else if (this.loginForm.password === '') {
      this.$refs.password.focus();
    }
  },
  destroyed() {
    // window.removeEventListener('storage', this.afterQRScan)
  },
  methods: {
    checkCapslock(e) {
      const { key } = e;
      this.capsTooltip = key && key.length === 1 && key >= 'A' && key <= 'Z';
    },
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = '';
      } else {
        this.passwordType = 'password';
      }
      this.$nextTick(() => {
        this.$refs.password.focus();
      });
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true;
          this.$store
            .dispatch('user/login', this.loginForm)
            .then(() => {
              this.$router.push({
                path: this.redirect || '/',
                query: this.otherQuery
              });
              this.loading = false;
            })
            .catch(() => {
              this.loading = false;
            });
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== 'redirect') {
          acc[cur] = query[cur];
        }
        return acc;
      }, {});
    }
  }
};
</script>

<style lang="scss">
$bg: #fff;
$shadow: #283443;
$light_gray: #fff;
$cursor: #283443;
$title: #2199e5;
@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-page .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-page {
  display: flex;
  justify-content: center;
  align-items: center;
  .logo {
    position: absolute;
    top: 10px;
    left: 10px;
    width: 130px;
  }
  .footer {
    position: absolute;
    bottom: 24px;
    .copyright {
      color: #9ea6b2;
      font-size: 12px;
    }
  }
  .login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 750px;
    height: 400px;
    background: rgba(216, 216, 216, 1);
    box-shadow: 0px 2px 20px 0px rgba(18, 91, 215, 0.22);
    border-radius: 10px;
    z-index: 111;
  }
  .intro-panel {
    position: relative;
    width: 420px;
    height: 400px;
    background: url('../../assets/images/login.png') no-repeat;
    background-size: cover;
    .app-name {
      position: absolute;
      display: flex;
      align-items: center;
      top: 56px;
      left: 42px;
      color: #fff;
      span {
        margin: 0 6px;
      }
    }
    .line {
      display: inline-block;
      width: 89px;
      height: 1px;
    }
    .right-line {
      background: linear-gradient(270deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 1) 100%);
    }
    .left-line {
      background: linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 1) 100%);
    }
  }
  .login-panel {
    width: 380px;
    height: 400px;
    background: rgba(255, 255, 255, 1);
    border-radius: 0px 10px 10px 0px;
  }
  .el-input {
    display: inline-block;
    height: 44px;
    width: 85%;
    border-bottom: 1px solid rgba(232, 234, 237, 1);

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $cursor;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $shadow !important;
        border-bottom: 1px solid rgba(232, 234, 237, 1);
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    // background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;

    .el-form-item__error {
      left: 30px;
    }
  }
  .login-btn {
    display: block;
    width: 280px;
    margin: 40px auto;
    border-radius: 30px;
  }
}
</style>

<style lang="scss" scoped>
$shadow: #f6f7fc;
$dark_gray: #889aa4;
$light_gray: #eee;
$title: #1890ff;

.login-page {
  min-height: 100%;
  width: 100%;
  background-color: $shadow;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 66px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $title;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
