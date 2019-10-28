<template>
  <el-form :inline="inline" :model="topForm" class="demo-form-inline" ref="topForm">
    <slot></slot>

    <el-button type="primary" v-if="needSelect" @click="submit()" class="button-size">{{selectText}}</el-button>
    <el-button type="primary" v-if="needReset" @click="reset()" class="button-size">{{resetText}}</el-button>
  </el-form>
</template>

<script>
  import {submitMixin} from "comm/mixin";
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
        }
      },
      mixins: [submitMixin],
      methods: {
        submit: function () {
          this.showLoading();
          const params = this.submitData == null ? this.model : this.submitData;
          ergodicKeys(params, key => {
            if (typeof params[key] == 'string') {
              params[key] = params[key].trim();
            }
          });
          this.doValidAndSubmit('topForm', this.submitService, params, res => {
            this.hideLoading();
            this.$emit("success", res);
          }, new SubmitText({
            failTitle: this.failTitle,
            loadingText: this.loadingText,
            successText: this.successText,
            failText: this.failText
          }), error => {
            this.hideLoading();
            this.$emit("fail", error)
          });
        },
      }
    }
</script>

<style scoped>

</style>
