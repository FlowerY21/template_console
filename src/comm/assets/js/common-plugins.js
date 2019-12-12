(function () {
    Date.prototype.format = function (fmt) {
        if (!fmt) {
            return this;
        }
        var o = {
            "M+": this.getMonth() + 1,                 //月份
            "d+": this.getDate(),                    //日
            "H+": this.getHours(),                   //小时
            "m+": this.getMinutes(),                 //分
            "s+": this.getSeconds(),                 //秒
            "q+": Math.floor((this.getMonth() + 3) / 3), //季度
            "S": this.getMilliseconds()             //毫秒
        };
        if (/(y+)/.test(fmt))
            fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt))
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    };
    Date.prototype.addDay = function (i) {
        return new Date(this.getTime() + (parseInt(i) || 1) * 24 * 60 * 60 * 1000);
    };
})();
(function () {
    Number.prototype.toDecimal = function () {
        var str = this.toString();
        var strArr = str.split(".");
        if (strArr.length == 1) {
            return strArr[0] + ".00";
        }
        if (strArr[1].length == 1) {
            strArr[1] = strArr[1] + "0";
        }
        if (strArr[1].length >= 2) {
            strArr[1] = strArr[1].substring(0, 2);
        }
        return strArr.join(".");
    };
})();

(function(){
    window.baseRem = Math.min(Math.max(document.documentElement.clientWidth || window.innerWidth, 320), 750) / 7.5
})();
