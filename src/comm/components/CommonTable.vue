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
          ref="pagination"
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
        tableData:{             // 表格数据对象
          type: Array,
          default:() => []
        },
        label: {                // 索引列表头文本
          type: String,
          default: '序号'
        },
        needIndex: {            // 是否需要索引列
          type: Boolean,
          default: true
        },
        needFixed: {            // 索引列是否固定
          type: Boolean,
          default: true
        },
        needRowClass: {         // 是否需要表格行样式
          type: Boolean,
          default: true
        },
        needHeaderClass: {      // 是否需要表格头样式
          type: Boolean,
          default: true
        },
        isShow:{                // 是否需要分页器
          type:Boolean,
          default:true
        },
        containerHeight:{       // 容器高度，用于计算表格高度
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
          return this.containerHeight;
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
