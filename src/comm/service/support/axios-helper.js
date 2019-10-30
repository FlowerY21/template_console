import axios from 'axios'
import MD5 from 'js-md5'
import Server from './Server'
import store from 'comm/store'
import router from 'comm/router'
import ElementUI from 'element-ui';
import {encrypt, urlEncode, objKeySort} from "comm/assets/js/common-utils";

export const Host = Server[process.env.NODE_ENV];

export const getToken = () => {
  // return '123'
  return store.getters.userToken
};

const RespStatus = {
  Success: 200
};

const RespCodes = {
  Success: '0000'
};
// 公共参数
const CommonParams = {
  tatId:'144a3ff3da0fbc619cc305a32d4e857c',
  modifierId: 34,
  serverType:1,

};

// 参数拼接
export const fillData = (data) => {
  const result = Object.assign({}, CommonParams, {
    reqTime: new Date().format('yyyy-MM-dd HH:mm:ss'),
  }, data);
  // 移除空参数
  for (let key in result) {
    if (null == result[key] || undefined == result[key]) {
      delete result[key];
    }
  }
  result.sign = encrypt(urlEncode(objKeySort(result)) + '&priKey=' + 'd6231ff6a68cf6df28c56f3e0ba5723d');
  return result;
};

export function post(url, port, data, needToken) {
  return new Promise((resolve, reject)=>{
    axios.post(Host + port + '/' + url, fillData(data),{
      headers: Object.assign({
        "Content-Type":"application/x-www-form-urlencoded"
      }, needToken ? {token: getToken()} : {}),
      transformRequest: [
        function (data) {
          let ret = '';
          for (let it in data) {
            ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&';
          }
          return ret;
        }
      ],
    }).then(resp => {
      // 视情况修改
        if (RespStatus.Success != resp.status || (!resp.data && "" != resp.data)
          || RespCodes.Success != resp.data.respCode || (!resp.data.contents && "" != resp.data.contents)
          || (resp.data.contents.optStatus && RespCodes.Success != resp.data.contents.optStatus)) {
          console.log('[Post请求-服务端返回错误响应]', resp);
          if (resp.data.respCode == '0003'){
            router.replace({
              name:'Login'
            });

            ElementUI.Message.closeAll();
            ElementUI.Message({
              message: '登录超时，请重新登录',
              type: 'error',
            });
          }
          reject({resp: resp, message: shelling(resp)});
        }
        resolve(resp.data.contents);
      }, error => {
        console.log('[Post请求-请求失败]', error);
        reject({resp: error, message: shelling(error)});
      }
    )
  })
}

export function outter_post(url, post, data) {
  return post(url, post, data, false);
}
// 视情况修改
export const shelling = (resp) => {
  const defaultMsg = '未知错误';
  if (!resp) {
    return defaultMsg;
  }
  if (!resp.data) {
    return resp.statusText || resp.status || defaultMsg;
  }
  if (!resp.data.contents) {
    return resp.data.respMsg || resp.data.respCode || defaultMsg;
  }
  return resp.data.contents.optMsg || resp.data.contents.optStatus || defaultMsg;
};

