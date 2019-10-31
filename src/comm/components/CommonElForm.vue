<template>
  <el-form :model="model" :rules="rules" ref="model" :show-message="true" @validate="updateBtn">
    <slot></slot>
    <el-button type="primary" @click="submit()" :disabled="!canSubmit"
               :class="{isLight:isLightBtn,overWidth:isOverWidth}">{{submitBtnText}}
    </el-button>
  </el-form>
</template>

<script>
  import {submitMixin} from "comm/mixin";
  import {ergodicKeys} from "comm/assets/js/common-utils";
  import SubmitText from "comm/service/model/SubmitText";

  export default {
    name: "CommonElForm",
    mixins: [submitMixin],
    props: {
      model: {          // 表单数据对象
        type: Object,
        default: {},
      },
      rules: {          // 表单验证规则
        type: Object,
        default: null,
      },
      submitBtnText: {  // 按钮1文本
        type: String,
        default: "确定",
      },
      submitService: {  // 表单请求
        type: Function,
        default: null
      },
      submitData: {     // 表单提交数据
        type: Object,
        default: null
      },
      failTitle: {
        type: String,
        default: null
      },
      loadingText: {
        type: String,
        default: null
      },
      failText: {
        type: String,
        default: null
      },
      successText: {
        type: String,
        default: null
      },
      isLightBtn: {     // 按钮是否默认高亮
        type: Boolean,
        default: false
      },
      isOverWidth: {    // 按钮是否100%
        type: Boolean,
        default: false
      },
    },
    data() {
      return {
        validMap: {},
        canSubmit: false
      }
    },
    mounted() {
      ergodicKeys(this.rules, key => {
        this.validMap[key] = !(typeof this.rules[key][0].required == 'function' ? this.rules[key][0].required() : this.rules[key][0].required);
        // console.log(key, this.validMap[key])
      });
      // console.log(this.validMap)
    },
    methods: {
      updateBtn(key, valid) {
        // console.log(key, valid, JSON.stringify(this.validMap))
        if (this.validMap[key] == valid) {
          return;
        }
        this.validMap[key] = valid;

        let result = true;
        ergodicKeys(this.validMap, key => {
          console.log(key, result, this.validMap[key], result && this.validMap[key])
          result = result && this.validMap[key];
          return !result;
        });
        this.canSubmit = result;
        this.$emit('validField', {
          key, valid, canSubmit: result
        })
      },
      submit: function () {
        const params = this.submitData == null ? this.model : this.submitData;
        ergodicKeys(params, key=>{
          if (typeof params[key] == 'string') {
            params[key] = params[key].trim();
          }
        });
        if (this.submitService){
          this.doValidAndSubmit('model', this.submitService, params, res => {
            this.$emit("success", res);
          }, new SubmitText({
            failTitle: this.failTitle,
            loadingText: this.loadingText,
            successText: this.successText,
            failText: this.failText
          }), error => {
            this.$emit("fail", error)
          });
        } else {
          this.$emit("success");
        }

      },
      validate(callback) {
        this.$refs['model'].validate(valid => {
          callback && callback(valid)
        });
      },
      validateField(key, callback) {
        this.$refs.model.validateField(key, callback);
      },
      clearValidate(key, callback) {
        this.$refs.model.clearValidate(key, callback);
      },
      resetFields(){
        ergodicKeys(this.model, key=>{
          this.model[key] = ''
        })
      }
    },
    watch: {
      rules() {
        ergodicKeys(this.rules, key => {
          this.validMap[key] = false
        });
        this.canSubmit = false;
      }
    }
  }
</script>

<style scoped>
  .el-button.isLight {
    background-color: #fff;
    border-color: #fff;
    color: #EA3E39;
  }

  .el-button.isLight:active,
  .el-button.isLight.is-active {
    background-color: rgba(255, 255, 255, .8);
    border-color: rgba(255, 255, 255, .8);
  }

  .el-button.isLight.is-disabled,
  .el-button.isLight.is-disabled:active {
    color: #ccc;
  }
</style>
