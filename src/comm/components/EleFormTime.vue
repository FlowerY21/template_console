<template>
  <el-form-item :label="label" :prop="propValue">
    <el-date-picker
      v-model="time"
      type="daterange"
      value-format="yyyy-MM-dd"
      align="right"
      unlink-panels
      :range-separator="rangeSeparator"
      :start-placeholder="startPlaceholder"
      :end-placeholder="endPlaceholder"
      :picker-options="pickerOptions">
    </el-date-picker>
  </el-form-item>
</template>

<script>
  export default {
    name: "ele-form-time",
    props:{
      label:{
        type: String,
        default: '创建时间'
      },
      propValue:{
        type: String,
        default: 'time'
      },
      startPlaceholder:{
        type: String,
        default: '开始日期'
      },
      endPlaceholder:{
        type: String,
        default: '结束日期'
      },
      rangeSeparator:{
        type: String,
        default: '至'
      },
    },
    data() {
      return {
        time:'',
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
      }
    },
  }
</script>

<style scoped>

</style>
