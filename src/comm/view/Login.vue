<template>
  <transition name="fade" mode="out-in" appear>
    <div class="flex-row vertical-center flow-center">
      <h1 class="top-title-text">后台登录</h1>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
        <el-form-item prop="userName">
          <el-input placeholder="用户名" v-model.number="ruleForm.userName" clearable maxlength="20"
                    autocomplete="off" @clear="clearPassword" ref="userNameInput">
            <template slot="prepend">
              <!--<img src="../../../assets/images/user.png" alt="user" class="icon">-->
            </template>
            <i slot="prefix" class="el-input__icon icon-account"></i>
          </el-input>
        </el-form-item>

        <el-form-item prop="passWord">
          <el-input type="passWord" v-model="ruleForm.passWord" placeholder="密码" clearable
                    autocomplete="off" minlength="6" maxlength="20">
            <template slot="prepend">
              <!--<img src="../../../assets/images/pwd.png" alt="pwd" class="icon">-->
            </template>
            <i slot="prefix" class="el-input__icon icon-lock"></i>
          </el-input>
        </el-form-item>
      </el-form>
    </div>
  </transition>
</template>

<script>
  import DeployPramas from 'comm/mixin/constant/DeployPramas'

    export default {
        name: "login",
      data(){
          return{
            ProgramName:DeployPramas[process.env.BRANCH_ENV].name,
            ruleForm:{
              userName:'',
              passWord:'',
            },
            rules:{},
          }
      },
      methods:{
        clearPassword(){
          this.$refs.userNameInput.focus();
          this.ruleForm.passWord = '';
        },
      },
    }
</script>

<style scoped>
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
</style>
