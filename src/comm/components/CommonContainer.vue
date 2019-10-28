<template>
  <transition name="fade" mode="out-in" appear>
    <el-container>
      <slot></slot>
    </el-container>
  </transition>
</template>

<script>
  export default {
    name: "commoncontainer"
  }
</script>

<style scoped>
  .fade-enter-active, .fade-leave-active {
    transition: opacity .3s;
  }

  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */
  {
    opacity: 0;
  }
</style>
