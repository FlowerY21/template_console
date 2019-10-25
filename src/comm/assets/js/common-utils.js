import Vue from "vue";
import MD5 from 'js-md5';

export const getKeys = (obj) => {
    const keys = [];
    ergodicKeys(obj, key => {
        keys.push(key);
    });
    return keys;
};
export const ergodicKeys = (obj, ope) => {
    for (const key in obj) {
        if ("keys" != key && obj.hasOwnProperty(key)) {
            if (ope(key)) {
                return;
            }
        }
    }
};
export const getFormKeys = (obj) => {
    const keys = [];
    ergodicKeys(obj, key => {
        const required = typeof obj[key][0].required == 'function' ? obj[key][0].required() : obj[key][0].required;
        if (required) {
            keys.push(key);
        }
    });
    return keys;
};
export const buildTempDom = (token,agentId,textShow,component, options) => {
    if (Vue.prototype.$isServer) return;
    options = options || {};

    options.onClose = (dialog) => {
        dialog.$destroy(true);
        dialog.$el.parentNode.removeChild(dialog.$el);
    };

    const TempComponent = Vue.extend(component);
    const instance = new TempComponent({
        data: options,
    });

    instance.textShow = textShow;
    instance.agentId = agentId;
    instance.token = token;
    instance.vm = instance.$mount();
    document.body.appendChild(instance.vm.$el);

    instance.open();
    return instance.vm;
};
export const objKeySort = (arys) => {
    //先用Object内置类的keys方法获取要排序对象的属性名，再利用Array原型上的sort方法对获取的属性名进行排序，newkey是一个数组
    var newkey = Object.keys(arys).sort();
    //console.log('newkey='+newkey);
    var newObj = {}; //创建一个新的对象，用于存放排好序的键值对
    for (var i = 0; i < newkey.length; i++) {
        //遍历newkey数组
        newObj[newkey[i]] = arys[newkey[i]];
        //向新创建的对象中按照排好的顺序依次增加键值对
    }
    return newObj; //返回排好序的新对象
};
export const urlEncode = (param, key, encode) => {
    if (param == null) return '';
    var paramStr = '';
    var t = typeof (param);
    if (t == 'string' || t == 'number' || t == 'boolean') {
        paramStr += '&' + key + '=' + (encode ? encodeURIComponent(param) : param);
    } else {
        for (var i in param) {
            var k = key == null ? i : key + (param instanceof Array ? '[' + i + ']' : '.' + i);
            var preStr = urlEncode(param[i], k, encode);
            paramStr += paramStr ? preStr : preStr.substring(1);
        }
    }
    return paramStr;
};
export const encrypt = (text) => {
    return MD5(text);
};

export const getUrlKey = (name) => {
    return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || [, ""])[1].replace(/\+/g, '%20')) || null;
}
