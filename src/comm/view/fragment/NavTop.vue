<template>
  <div class="navTop flex-row vertical-center flow-justify">
    <span class="icon" :class="isCollapse ? 'el-icon-s-fold' : 'el-icon-s-unfold'" @click="handleCollapse"></span>
    <span class="icon el-icon-switch-button" @click="handleExit"></span>
  </div>
</template>

<script>
  import StorageService from 'comm/store/interfaces'
  import Account from 'comm/service/model/Account'
  import {mapActions, mapGetters} from 'vuex'
  export default {
    name: "navtop",
    data(){
      return{
        isCollapse:true
      }
    },
    methods:{
      handleCollapse(){
        this.isCollapse = !this.isCollapse;
        this.$emit('handleCollapse', this.isCollapse);
      },
      handleExit(){
        this.$confirm('确认退出该系统？', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          showClose: false
        }).then(() => {
          this.$router.replace({
            name: 'Login'
          });
          this.setUser(null);
          this.setToken(null);
          this.setTabBarOn(null);
          this.setTabBar(null);
          this.saveAccount(new Account({
            i : this.formModel.userName,
            p : ''
          }));
        }).catch(() => {

        });
      },
      ...mapActions({
        setUser: StorageService.User.setInfo,
        setToken: StorageService.User.setToken,
        saveAccount: StorageService.User.saveAccount,
        setTabBar:StorageService.Tab.setTabBar,
        setTabBarOn:StorageService.Tab.setTabBarOn,
      })
    }
  }
</script>

<style scoped>
  .navTop .icon {
    font-size: 40px;
    line-height: 80px;
    color: #333333;
    cursor: pointer;
  }
</style>
