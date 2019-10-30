<template>
  <el-container>
    <el-row style="width: 100%">
      <!--表格-->
      <el-col :span="24" class="mar-bot">
        <el-table :data="tableData" :row-class-name="tableRowClassName" :header-cell-class-name="tableHeaderRowClassName" style="width: 100%;" :height="tableHeight" >
          <el-table-column type="index" :label="label" :fixed="needFixed" width="80" v-if="needIndex"></el-table-column>
          <slot></slot>
        </el-table>
      </el-col>
      <!--分页器-->
      <el-col :span="24">
        <el-pagination
          v-if="isShow"
          class="pagination-size"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          background
          :current-page="page.currentPage"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="page.pageSize"
          layout="prev, pager, next, jumper, total, sizes "
          :total="page.total">
        </el-pagination>
      </el-col>
    </el-row>


  </el-container>
</template>

<script>

    export default {
      name: "commontable",
      props:{
        tableData:{
          type: Array,
          default:() => []
        },
        label: {
          type: String,
          default: '序号'
        },
        needIndex: {
          type: Boolean,
          default: true
        },
        needFixed: {
          type: Boolean,
          default: true
        },
        needRowClass: {
          type: Boolean,
          default: true
        },
        needHeaderClass: {
          type: Boolean,
          default: true
        },
        isShow:{
          type:Boolean,
          default:true
        },
        containerHeight:{
          type: Number,
          default: 0
        }
      },
      data(){
        return{
          page:{
            pageSize:10,
            currentPage:1,
            total:1
          },

        }
      },
      computed:{
        tableHeight(){
          return this.containerHeight - 100;
        }
      },
      methods:{
        handleSizeChange(val) {
          // console.log(`每页 ${val} 条`);
          this.page.pageSize = val;
          this.page.currentPage = 1;
          // this.handleScrollTop();
          this.$emit('handleChange')
        },
        handleCurrentChange(val) {
          // console.log(`当前页: ${val}`);
          this.page.currentPage = val;
          // this.handleScrollTop();
          this.$emit('handleChange')
        },
        tableRowClassName({row, rowIndex}){
          if (!this.needRowClass){
            return '';
          }

          if (rowIndex % 2 == 0) {
            return 'rowBlueClass';
          } else {
            return 'rowGrayClass';
          }

        },
        tableHeaderRowClassName({row, rowIndex}){
          if (!this.needHeaderClass){
            return '';
          }
          return 'rowHeaderClass';
        },
      }
    }
</script>

<style scoped>
  .pagination-size{
    float: right;
  }
</style>
