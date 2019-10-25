import {getFormKeys} from "comm/assets/js/common-utils";
import SubmitText from "./constant/SubmitText";

let loading;
const dialogMethods = {
  showError(message) {
    this.$message.closeAll();
    this.$message({
      message: message,
      type: 'error',
    });
  },
  showSuccess(message) {
    this.$message.closeAll();
    this.$message({
      message: message,
      type: 'success',
    });
  },
  showWarming(message) {
    this.$message.closeAll();
    this.$message({
      message: message,
      type: 'warning'
    });
  },
  showLoading(message) {
    if (loading) {
      loading.setText(message);
      return;
    }
    loading = this.$loading({
      lock: true,
      text: message,
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.7)'
    });
  },
  hideLoading(){
    if (!loading) {
      return;
    }
    loading.close();
    loading = null;
  },
  showConfirm(message, customClass, isHTML){
    return new Promise((resolve, reject)=>{
      this.$confirm(message, {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        customClass: customClass,
        dangerouslyUseHTMLString: false || isHTML,
        showClose: false
      }).then(() => {
        return resolve();
      }).catch(()=>{
        return reject();
      });
    });
  }
};

const validators = {
  validPhone: (rule, value, callback) => {
    if (!value) {
      callback(new Error('请输入电话号码'))
    } else if (!Regs.phone.test(value)) {
      callback(new Error('请输入正确的11位手机号码'))
    } else {
      callback()
    }
  },
  validEmail: (rule, value, callback) => {
    if (value) {
      if (!Regs.email.test(value)) {
        callback(new Error('请输入正确的邮箱地址'))
      } else {
        callback()
      }
    }else {
      callback()
    }
  },
  validCertId: (rule, value, callback) => {
    if (!value) {
      callback(new Error('请输入身份证号码'))
    } else if (!Regs.certId.test(value)) {
      callback(new Error('请输入正确的身份证号码'))
    } else {
      callback()
    }
  },
};

const loadMethods = Object.assign({}, dialogMethods, {
  /**
   * 电话或银行卡加密
   * @type  1 => phone  2 => bankCard
   * */
  doUnicode(type, data) {
    if (data) {
      let reg = /^(\d{4})\d+(\d{4})$/;
      data = data.replace(reg, type == 1 ? "$1 **** $2" : "$1 **** **** $2");
      return data;
    }
  },
  // 姓名加密
  doUnicodeName(data) {
    if (data) {
      // var reg = /(?<=.)./g;
      // return data.replace(reg, '*');
      return data.substr(0, 1) + '*';
    }
  },
  // 格式化小数点后两位
  toDoubleThousands(num) {
    if (!num) {
      return "0.00";
    }

    //判断是否有小数点
    var s = num.toString().indexOf(".");
    if (s == -1) {//是整数
      return (num || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,') + ".00";
    } else {//是小数
      var arr = num.toString().split(".");
      if (arr.length > 1 && arr[1].length < 2) {//一位小数
        return (arr[0] || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,') + "." + arr[1] + "0";
      } else {//两位小数
        return (arr[0] || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,') + "." + arr[1][0] + arr[1][1];
      }
    }
  },
});

const submitMethods = Object.assign({}, dialogMethods, validators, {
  doSubmit(func, data, onSuccess, text = new SubmitText({}), onFail) {
    this.showLoading(text.loadingText);
    const startTime = new Date().getTime();
    func(data).then((data) => {
      setTimeout(()=>{
        this.hideLoading();
        text.successText && this.showSuccess(text.successText);
        onSuccess && onSuccess(data);
      },500 - new Date().getTime() + startTime);
    }, (error) => {
      setTimeout(()=>{
        this.hideLoading();
        text.failTitle = typeof text.failTitle == "function" ? text.failTitle(error) : text.failTitle;
        text.failText = typeof text.failText == "function" ? text.failText(error) : text.failText;
        this.showError(text.failTitle, text.failText || error.message);
        onFail && onFail(error.resp);
      },500 - new Date().getTime() + startTime);
    })
  },
  doValidAndSubmit(formName, func, data, onSuccess, text, onFail) {
    this.doValid(formName).then((a) => {
      this.doSubmit(func, data, onSuccess, text, onFail)
    });
  },
  doValid(formName) {
    return this.doValidItems(formName, getFormKeys(this.$refs[formName].rules));
    // 用整体验证会将required动态获取的字段也包括在内进行验证
    /*return new Promise((resolve, reject) => {
        this.$refs[formName].validate((valid) => {
            if (valid) {
                return resolve()
            }
            this.doValidItems(formName, getFormKeys(this.$refs[formName].rules));
        })
    });*/
  },
  doValidItems(formName, keys) {
    return new Promise((resolve, reject) => {
      const messageArr = [];
      keys = typeof keys == "string" ? keys.split(",") : keys;
      this.$refs[formName].validateField(keys, (messsage) => {
        messsage && messageArr.push(messsage);
      });
      if (messageArr.length == 0) {
        return resolve()
      }
      this.showError("校验失败", messageArr.join("</br>"), true)
      console.log("校验失败", messageArr.join(","));
      // reject(messageArr); 加了会报Uncaught (in promise)
    });
  }
});

export const dialogMixin = {
  methods: dialogMethods
};

export const validatorsMixin = {
  methods: validators
};

export const loadMixin = {
  methods: loadMethods
};

export const submitMixin = {
  methods: submitMethods
};
