export default {
  phone: /^1[3|4|5|7|8|6|9][0-9]\d{8}$/,    // 手机号码
  email: /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/,    // 电子邮箱
  certId: /^[0-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,   // 身份证号
}