<template>
  <el-form :inline="inline" :model="topForm" class="demo-form-inline" ref="topForm">
    <slot></slot>

    <el-button type="primary" v-if="needSelect" @click="submit()" class="button-size">{{selectText}}</el-button>
    <el-button type="primary" v-if="needReset" @click="reset()" class="button-size">{{resetText}}</el-button>
  </el-form>
</template>

<script>
  import {submitMixin} from "comm/mixin";
  import {ergodicKeys} from "comm/assets/js/common-utils";
  import SubmitText from "comm/service/model/SubmitText";

    export default {
      name: "commontopform",
      props: {
        inline: {               // 表单是否内联
          type: Boolean,
          default: true
        },
        topForm: {              // 表单数据对象
          type: Object,
          default: () => {}
        },
        needSelect:{            // 是否需要按钮1
          type: Boolean,
          default: true
        },
        needReset:{             // 是否需要按钮2
          type: Boolean,
          default: true
        },
        selectText:{            // 按钮1文本
          type: String,
          default: '查询'
        },
        resetText:{             // 按钮2文本
          type: String,
          default: '重置'
        },
        submitService: {        // 表单提交请求
          type: Function,
          default: null
        },
        submitData: {           // 请求参数
          type: Object,
          default: null
        },
      },
      mixins: [submitMixin],
      methods: {
        submit: function () {
          const params = this.submitData == null ? this.topForm : this.submitData;
          ergodicKeys(params, key => {
            if (typeof params[key] == 'string') {
              params[key] = params[key].trim();
            }
          });
          this.doSubmit(this.submitService, params, res => {
            this.$emit("success", res);
          }, new SubmitText({
            failTitle: this.failTitle,
            loadingText: this.loadingText,
            successText: this.successText,
            failText: this.failText
          }), error => {
            this.$emit("fail", error)
          });
        },
        reset: function () {
          this.$emit('reset')
        }
      }
    }
</script>

<style scoped>

</style>
