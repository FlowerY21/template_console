<template>
  <transition name="fade" mode="out-in" appear>
    <div class="container">
      <el-container class="index-con">
        <!--左侧导航菜单-->
        <el-aside>
          <nav-left :isCollapse="isCollapse" @addNavTab="addNavTab" @handleIndex="handleIndex"></nav-left>
        </el-aside>
        <el-container class="main-con">
          <!--头部导航菜单-->
          <el-header class="index-header">
            <nav-top @handleCollapse="handleCollapse"></nav-top>
          </el-header>
          <!--主要内容-->
          <el-main clss="index-main">
            <el-tabs v-model="editableTabsValue" type="card" @tab-remove="removeTab"  @tab-click="handleTab" style="height: 100%">
              <el-tab-pane
                v-for="(item, index) in editableTabs"
                :key="item.name"
                :label="item.title"
                :name="item.name"
                :closable="index !=0"
              >
              </el-tab-pane>
              <div v-if="isRouterAlive" class="wrapper comm-pad">
                <keep-alive>
                  <router-view></router-view>
                </keep-alive>
              </div>
            </el-tabs>
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
  import StorageService from 'comm/store/interfaces'
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
        isCollapse: true,
        editableTabsValue: 'Index',
        editableTabs: [{
          title: '首页',
          name: 'Index',
        },],
      }
    },
    computed: {
      ...mapGetters(['userToken', 'tabBar', 'tabBarOn'])
    },
    mounted(){
      if (JSON.parse(JSON.stringify(this.tabBarOn)) != null && JSON.parse(JSON.stringify(this.tabBarOn)) !='') {
        this.editableTabs = this.tabBar;
        this.editableTabsValue = this.tabBarOn;
      }
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
      },
      handleIndex(){
        this.editableTabsValue = 'Index';
        this.setTabBarOn('Index');
      },
      addNavTab(routerName,tabText){
        let newTabName = routerName;
        let isPush = true;

        this.editableTabs.forEach(item => {
          if (routerName == item.name) {
            isPush = false;
            return;
          }
        });

        if (isPush){
          this.editableTabs.push({
            title: tabText,
            name: routerName,
          });
        }

        this.editableTabsValue = newTabName;

        this.setTabBarOn(newTabName);
        this.setTabBar(this.editableTabs);
      },
      removeTab(targetName) {
        console.log(targetName)
        let tabs = this.editableTabs;
        let activeName = this.editableTabsValue;
        if (activeName === targetName) {
          tabs.forEach((tab, index) => {
            if (tab.name === targetName) {
              let nextTab = tabs[index + 1] || tabs[index - 1];
              if (nextTab) {
                activeName = nextTab.name;
              }
            }
          });
        }

        this.$router.replace({
          name: activeName
        });

        this.editableTabsValue = activeName;
        this.editableTabs = tabs.filter(tab => tab.name !== targetName);

        this.setTabBarOn(activeName);
        this.setTabBar(this.editableTabs);
      },
      handleTab(data){
        this.$router.replace({
          name: data.name
        });
        this.setTabBarOn(data.name);
      },
      ...mapActions({
        setTabBar:StorageService.Tab.setTabBar,
        setTabBarOn:StorageService.Tab.setTabBarOn,
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
