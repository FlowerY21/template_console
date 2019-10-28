<template>
  <transition name="fade" mode="out-in" appear>
    <div class="container">
      <el-container class="index-con">
        <!--左侧导航菜单-->
        <el-aside>
          <nav-left :isCollapse="isCollapse"></nav-left>
        </el-aside>
        <el-container class="main-con">
          <!--头部导航菜单-->
          <el-header class="index-header">
            <nav-top @handleCollapse="handleCollapse"></nav-top>
          </el-header>
          <!--主要内容-->
          <el-main clss="index-main">
            <div v-if="isRouterAlive" class="wrapper comm-pad">
              <keep-alive>
                <router-view></router-view>
              </keep-alive>
            </div>
          </el-main>
        </el-container>
      </el-container>
    </div>
  </transition>
</template>

<script>
  import NavTop from './fragment/NavTop'
  import NavLeft from './fragment/NavLeft'
  import store from 'comm/store'
  import {mapActions, mapGetters} from 'vuex'
  import {dialogMixin} from 'comm/mixin'

  export default {
    name: "index",
    components: {
      NavTop, NavLeft
    },
    provide() {
      return {
        reload: this.reload,
      }
    },
    data() {
      return {
        isRouterAlive: true,
        isCollapse: true
      }
    },
    computed: {
      ...mapGetters(['userToken'])
    },
    beforeRouteEnter(to, from, next) {   // 判断token，路由拦截
      if (typeof (JSON.parse(JSON.stringify(store.getters.userToken))) != 'string' || JSON.parse(JSON.stringify(store.getters.userToken)) == null) {
        next({
          path: '/login'
        })
      } else {
        next();
      }
    },
    methods: {
      reload() {
        this.isRouterAlive = false;
        this.$nextTick(() => {
          this.isRouterAlive = true;
        })
      },
      handleCollapse(isCollapse) {   // 是否隐藏左侧菜单
        this.isCollapse = isCollapse;
      }
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
    width: 100%;
    height: 100%;
  }

  .wrapper{
    height: 100%;
    overflow: auto;
    background: #ffffff;
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
    border-radius: 4px;
  }
</style>
