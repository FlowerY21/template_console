<template>
    <common-search ref="commonSearch" :topForm="topForm" :submitService="submitService" :searchData="searchData" @onReset="onReset">
      <span slot="formSlot">
        <el-form-item label="账号" prop="userName">
            <el-input type="text" maxlength="20" v-model="topForm.userName" placeholder="请输入账号"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="phoneNumber">
            <el-input type="text" maxlength="11" v-model="topForm.phoneNumber" placeholder="请输入电话"></el-input>
        </el-form-item>
      </span>

      <span slot="formTable">
        <el-table-column prop="chnName" label="姓名" min-width="120"></el-table-column>
        <el-table-column prop="chnName" label="电话" min-width="120"></el-table-column>
        <el-table-column prop="chnName" label="市区"  min-width="120"></el-table-column>
        <el-table-column prop="chnName" label="地址" min-width="120"></el-table-column>
        <el-table-column prop="updateTime" label="时间" min-width="160"></el-table-column>
        <el-table-column fixed="right" label="操作" min-width="120">
          <template slot-scope="scope">
            <el-button @click.native.prevent="deleteRow(scope.$index, tableData)" type="text" size="small">移除</el-button>
          </template>
        </el-table-column>
      </span>
    </common-search>
</template>

<script>
  import CommonSearch from 'comm/components/CommonSearch'
  import PowerUserService from 'comm/service/PowerUserService'
  import SelectUserManageData from 'comm/service/model/SelectUserManageData'
  import {loadMixin} from 'comm/mixin'

  export default {
    name: "UserManage",
    components: {
      CommonSearch
    },
    data() {
      return {
        topForm: {
          userName: '',
          phoneNumber: '',
          time: []
        },
        submitService: PowerUserService.list,
        isPage:false,
      }
    },
    computed:{
      searchData(){
        const params = {
          userName:this.topForm.userName,
          phoneNumber:this.topForm.phoneNumber,
        };

        return params;
      },
    },
    mixins: [loadMixin],
    methods:{
      deleteRow(index, rows) {
        rows.splice(index, 1);
      },
      onReset(){
        this.topForm = {
          userName: '',
          phoneNumber: '',
          time: []
        };

      }
    }
  }
</script>

<style scoped>

</style>
