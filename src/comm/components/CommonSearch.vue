<template>
  <common-container>
    <el-row>
      <el-col :span="24">
        <common-top-form :inline="inline" :topForm="topForm" :needSelect="needSelect" :selectText="selectText" :needReset="needReset" :resetText="resetText">
          <slot name="formSlot"></slot>
        </common-top-form>
      </el-col>
      <el-col :span="24">
        <common-table></common-table>
      </el-col>
    </el-row>



  </common-container>
</template>

<script>
  import CommonContainer from './CommonContainer'
  import CommonTopForm from './CommonTopForm'
  import CommonTable from './CommonTable'


  export default {
    name: "commonsearch",
    components: {
      CommonContainer,
      CommonTopForm,
      CommonTable
    },
    props:{
      inline: {
        type: Boolean,
        default: true
      },
      topForm: {
        type: Object,
        default: () => {}
      },
      needSelect:{
        type: Boolean,
        default: true
      },
      needReset:{
        type: Boolean,
        default: true
      },
      selectText:{
        type: String,
        default: '查询'
      },
      resetText:{
        type: String,
        default: '重置'
      }
    }
  }
</script>

<style scoped>

</style>
