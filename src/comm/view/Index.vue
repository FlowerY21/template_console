<template>
  <transition name="fade" mode="out-in" appear>
    <div class="container">
      <el-container class="index-con">
        <el-aside>
          <nav-left></nav-left>
        </el-aside>
        <el-container class="main-con">
          <el-header class="index-header">
            <nav-top></nav-top>
          </el-header>
          <el-main clss="index-main">
            <p>main</p>
            <!--<router-view></router-view>-->
          </el-main>
        </el-container>
      </el-container>
    </div>
  </transition>
</template>

<script>
  import NavTop from './fragment/NavTop'
  import NavLeft from './fragment/NavLeft'

  export default {
    name: "index",
    components:{
      NavTop, NavLeft
    },
    data() {
      return {}
    }
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

  .container{
    width: 100%;
    height: 100%;
  }
</style>
