import axios from 'axios'
import MD5 from 'js-md5'
import Server from './Server'
import store from 'comm/store'

export const Host = Server[process.env.NODE_ENV];

export const getToken = () => {
  // return '123'
  return store.getters.userToken
};

const RespStatus = {
  Success: 200
};

// 公共参数
const CommonParams = {

};

// 参数拼接
export const fillData = (data) => {
  const result = Object.assign({}, CommonParams, data);
  // 移除空参数
  for (let key in result) {
    if (null == result[key] || undefined == result[key]) {
      delete result[key];
    }
  }
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

