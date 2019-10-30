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
        },
        submitService: {
          type: Function,
          default: null
        },
        submitData: {
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
