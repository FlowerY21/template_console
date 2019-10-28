<template>
  <div class="navTop flex-row vertical-center flow-justify">
    <span class="icon" :class="isCollapse ? 'el-icon-s-fold' : 'el-icon-s-unfold'" @click="handleCollapse"></span>
    <span class="icon el-icon-switch-button"></span>
  </div>
</template>

<script>
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
    }
  }
</script>

<style scoped>
  .navTop .icon {
    font-size: 40px;
    line-height: 80px;
    color: #333333;
  }
</style>
