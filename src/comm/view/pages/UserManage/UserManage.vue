<template>
  <common-container>
    <common-search :topForm="formModel">
      <span slot="formSlot">
        <el-form-item label="账号" prop="userName">
            <el-input type="text" maxlength="20" v-model="formModel.userName" placeholder="请输入账号"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="phoneNumber">
            <el-input type="text" maxlength="20" v-model="formModel.phoneNumber" placeholder="请输入电话"></el-input>
        </el-form-item>
        <el-form-item label="创建时间">
          <el-date-picker
            v-model="formModel.time"
            type="daterange"
            value-format="yyyy-MM-dd"
            align="right"
            unlink-panels
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :picker-options="pickerOptions">
          </el-date-picker>
        </el-form-item>
      </span>
    </common-search>
  </common-container>
</template>

<script>
  import CommonContainer from 'comm/components/CommonContainer'
  import CommonSearch from 'comm/components/CommonSearch'

  export default {
    name: "UserManage",
    components: {
      CommonContainer,
      CommonSearch
    },
    data() {
      return {
        formModel: {
          userName: '',
          phoneNumber: '',
          time: []
        },
        pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一年',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 365);
              picker.$emit('pick', [start, end]);
            }
          }]
        }
      }
    },
  }
</script>

<style scoped>

</style>
