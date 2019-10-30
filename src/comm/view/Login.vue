<template>
  <transition name="fade" mode="out-in" appear>
    <div class="flex-row absolute-center container">
      <div class="flex-col vertical-center flow-center login-box">
        <h1 class="top-title-text">后台登录</h1>
        <common-el-form :model="formModel" :rules="formRules" @success="onSuccess" submit-btn-text="登录" failTitle="登录失败"
                        loadingText="登录中..." :submitData="submitData" :submitService="submitService" :isOverWidth="true">
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
  import StorageService from 'comm/store/interfaces'
  import Account from 'comm/service/model/Account'
  import LoginData from 'comm/service/model/LoginData'
  import {mapActions, mapGetters} from 'vuex'
  import {dialogMixin} from 'comm/mixin'

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
    mixins:[dialogMixin],
    computed:{
      submitData(){   // 表单提交参数
        const params = new LoginData({

        });
        return params;
      },
      ...mapGetters(["userAccount"])
    },
    mounted(){
      // 监测账号密码回显
      this.formModel.userName = this.userAccount.i;
      this.formModel.passWord = Base64.decode(this.userAccount.p);

    },
    methods: {
      clearPassword() {   // 点击图标清除表单
        this.$refs.userNameInput.focus();
        this.formModel.passWord = '';
      },
      onSuccess(res){     // 表单成功后的回调
        this.showSuccess('登录成功');

        this.setUser('userInfo');   // 存储用户信息
        this.setToken("token");     // 存储token信息
        this.saveAccount(new Account({  // 缓存登录信息30天
          i : this.formModel.userName,
          p : Base64.encode(this.formModel.passWord)
        }));

        this.$router.replace({  // 跳转
          name:'Index'
        })
      },
      ...mapActions({
        setUser: StorageService.User.setInfo,
        setToken: StorageService.User.setToken,
        saveAccount: StorageService.User.saveAccount
      })
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
