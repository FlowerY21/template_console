<template>
  <common-container ref="commonContainer">
    <el-row style="width: 100%">
      <el-col :span="24" class="mar-bot">
        <common-top-form ref="commonTopForm" :submitService="submitService" :submitData="submitData" :inline="inline"
                         :topForm="topForm" :needSelect="needSelect" :selectText="selectText" :needReset="needReset"
                         :resetText="resetText" @success="onSuccess" @reset="onReset">
          <slot name="formSlot"></slot>
          <el-form-item label="创建时间" prop="time">
            <el-date-picker
              v-model="topForm.time"
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
      inline: {
        type: Boolean,
        default: true
      },
      topForm: {
        type: Object,
        default: () => {
        }
      },
      needSelect: {
        type: Boolean,
        default: true
      },
      needReset: {
        type: Boolean,
        default: true
      },
      selectText: {
        type: String,
        default: '查询'
      },
      resetText: {
        type: String,
        default: '重置'
      },
      isShow: {
        type: Boolean,
        default: true
      },
      submitService: {
        type: Function,
        default: null
      },
      searchData: {
        type: Object,
        default: null
      },
    },
    data() {
      return {
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
        },
        containerHeight: 0,
        page: {},
        tableData: [],
        isPage: false,
        isReset: false,
      }
    },
    mixins: [loadMixin],
    mounted() {
      this.containerHeight = this.$refs.commonContainer.$el.clientHeight - this.$refs.commonTopForm.$el.clientHeight;
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
