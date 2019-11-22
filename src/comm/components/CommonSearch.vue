<template>
  <common-container ref="commonContainer">
    <el-row style="width: 100%">
      <el-col :span="24" class="mar-bot">
        <common-top-form ref="commonTopForm" :submitService="submitService" :submitData="submitData" :inline="inline"
                         :topForm="topForm" :needSelect="needSelect" :selectText="selectText" :needReset="needReset"
                         :resetText="resetText" @success="onSuccess" @reset="onReset">
          <slot name="formSlot"></slot>
        </common-top-form>
      </el-col>
      <el-col :span="24">
        <common-table ref="commonTable" @handleChange="getPage" :tableData="tableData" :isShow="isShow"
                      :containerHeight="containerHeight">
          <slot name="formTable"></slot>
        </common-table>
      </el-col>
    </el-row>
  </common-container>
</template>

<script>
  import CommonContainer from './CommonContainer'
  import CommonTopForm from './CommonTopForm'
  import CommonTable from './CommonTable'
  import {loadMixin} from 'comm/mixin'


  export default {
    name: "commonsearch",
    components: {
      CommonContainer,
      CommonTopForm,
      CommonTable
    },
    props: {
      inline: {               // 是否表单内联
        type: Boolean,
        default: true
      },
      topForm: {              // 表单数据对象
        type: Object,
        default: () => {
        }
      },
      needSelect: {           // 是否需要按钮1
        type: Boolean,
        default: true
      },
      needReset: {            // 是否需要按钮2
        type: Boolean,
        default: true
      },
      selectText: {           // 按钮1文本
        type: String,
        default: '查询'
      },
      resetText: {            // 按钮2文本
        type: String,
        default: '重置'
      },
      isShow: {               // 是否需要分页器
        type: Boolean,
        default: true
      },
      submitService: {        // 表单提交请求
        type: Function,
        default: null
      },
      searchData: {            // 表单请求参数
        type: Object,
        default: null
      },
    },
    data() {
      return {
        containerHeight: 0,
        page: {},
        tableData: [],
        isPage: false,
        isReset: false,
      }
    },
    mixins: [loadMixin],
    mounted() {
      this.containerHeight = this.$refs.commonContainer.$el.clientHeight - this.$refs.commonTopForm.$el.clientHeight -100;
      this.page = this.$refs.commonTable.page;
      this.getList();
    },
    computed: {
      submitData() {
        if (!this.topForm.time) {
          this.topForm.time = [];
        }

        const params = {
          startTime: this.topForm.time[0] ? this.topForm.time[0] : '',
          endTime: this.topForm.time[1] ? this.topForm.time[1] : '',
          current: this.isPage ? this.page.currentPage : 1,
          size: this.page.pageSize,
        };

        return this.isReset ? params : {...this.searchData, ...params}
      },
    },
    methods: {
      getPage() {
        this.isPage = true;
        this.getList();
      },
      getList() {
        this.doLoad(this.submitService, this.submitData, res => {
          this.onSuccess(res);
        }, error => {
          this.$emit('getListFail', error);
        })
      },
      onSuccess(res) {
        this.tableData = res.rows;

        this.page.currentPage = res.current;
        this.page.total = res.total;
        this.page.pageSize = res.size;
        this.isPage = false;
        this.isReset = false;
      },
      onReset() {
        this.$emit('onReset');
        this.isPage = false;
        this.isReset = true;
        this.topForm.time = null;
        this.getList();
      }
    }
  }
</script>

<style scoped>

</style>
