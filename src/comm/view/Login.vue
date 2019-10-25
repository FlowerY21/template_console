<template>
  <transition name="fade" mode="out-in" appear>
    <div class="flex-row absolute-center container">
      <div class="flex-col vertical-center flow-center login-box">
        <h1 class="top-title-text">后台登录</h1>
        <common-el-form :model="formModel" :rules="formRules" @success="onSuccess" submit-btn-text="登录" failTitle="登录失败"
                        loadingText="登录中..." :submitService="submitService" :isOverWidth="true">
          <el-form-item prop="userName">
            <el-input placeholder="用户名" v-model="formModel.userName" clearable maxlength="20"
                      autocomplete="off" @clear="clearPassword" ref="userNameInput">
              <template slot="prepend">
                <!--<img src="../../../assets/images/user.png" alt="user" class="icon">-->
              </template>
              <i slot="prefix" class="el-input__icon icon-account"></i>
            </el-input>
          </el-form-item>

          <el-form-item prop="passWord">
            <el-input type="passWord" v-model="formModel.passWord" placeholder="密码" clearable
                      autocomplete="off" minlength="6" maxlength="20">
              <template slot="prepend">
                <!--<img src="../../../assets/images/pwd.png" alt="pwd" class="icon">-->
              </template>
              <i slot="prefix" class="el-input__icon icon-lock"></i>
            </el-input>
          </el-form-item>
        </common-el-form>
      </div>
    </div>
  </transition>
</template>

<script>
  import DeployPramas from 'comm/mixin/constant/DeployPramas'
  import CommonElForm from 'comm/components/CommonElForm'

  export default {
    name: "login",
    components: {
      CommonElForm
    },
    data() {
      return {
        ProgramName: DeployPramas[process.env.BRANCH_ENV].name,
        formModel: {
          userName: '',
          passWord: '',
        },
        formRules: {
          userName: [{
            required: true,
            message: '请输入账号',
            trigger: ['blur', 'change']
          },],
          passWord: [{
            required: true,
            message: '请输入密码',
            trigger: ['blur', 'change']
          },]
        },
        submitService:null
      }
    },
    methods: {
      clearPassword() {
        this.$refs.userNameInput.focus();
        this.formModel.passWord = '';
      },
      onSuccess(res){ // 表单成功后的回调
        this.$router.replace({
          name:'Index'
        })
      },
    },
  }
</script>

<style scoped>
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }

  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */
  {
    opacity: 0;
  }

  .container {
    width: 100vw;
    height: 100vh;
  }

  .login-box {
    width: 460px;
    padding: 80px;
    box-shadow: 0px 2px 8px 0px rgba(2, 35, 51, 0.2);
  }

  .top-title-text {
    margin-bottom: 50px;
    color: #333333;
    font-size: 24px;
    font-weight: bold;
  }
</style>
