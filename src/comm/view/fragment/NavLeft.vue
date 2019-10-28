<template>
  <div class="navLeft">
    <div class="top-logo flex-row vertical-center flow-center" @click="handleIndex">logo</div>
    <el-menu :default-active="$route.name" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"
             :collapse="!isCollapse" :router="true" :unique-opened="true">
      <el-submenu :index="navs.index" v-for = "(navs,first) in navsBar" :key = "first">
        <template slot="title">
          <i class="el-icon-location">
            <img :src="navs.iconUrl" alt="icon" width="100%" v-if="navs.iconUrl">
          </i>
          <span>{{navs.permName}}</span>
        </template>
        <el-menu-item :index="nav.index"  v-for = "(nav,second) in navs.children" :key = "second">{{nav.permName}}</el-menu-item>
      </el-submenu>
    </el-menu>

  </div>
</template>

<script>
  export default {
    name: "navleft",
    props:{
      isCollapse:{
        type: Boolean,
        default: true
      }
    },
    data(){
      return{
        navsBar:[{
          permName:'权限管理',
          iconUrl:'https://memserver.oss-cn-huhehaote.aliyuncs.com/upload/0850da5ec79d45289ef542dfd7b7819e.png',
          index:'1',
          children:[{
            permName:'用户管理',
            iconUrl:'1',
            index:'usermanage',
          }]
        },{
          permName:'权限管理',
          iconUrl:'https://memserver.oss-cn-huhehaote.aliyuncs.com/upload/0850da5ec79d45289ef542dfd7b7819e.png',
          index:'2',
          children:[{
            permName:'用户管理',
            iconUrl:'1',
            index:'usermanage',
          }]
        },{
          permName:'权限管理',
          iconUrl:'https://memserver.oss-cn-huhehaote.aliyuncs.com/upload/0850da5ec79d45289ef542dfd7b7819e.png',
          index:'3',
          children:[{
            permName:'用户管理',
            iconUrl:'1',
            index:'usermanage',
          }]
        },{
          permName:'权限管理',
          iconUrl:'https://memserver.oss-cn-huhehaote.aliyuncs.com/upload/0850da5ec79d45289ef542dfd7b7819e.png',
          index:'4',
          children:[{
            permName:'用户管理',
            iconUrl:'1',
            index:'usermanage',
          }]
        },]
      }
    },
    methods:{
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      handleIndex(){
        this.$router.replace({
          name:'Index'
        })
      },
    },
  }
</script>

<style scoped>
  .top-logo {
    height: 80px;
    width: 100%;
    background: yellowgreen;
  }
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 260px;
    min-height: 400px;
  }
</style>
