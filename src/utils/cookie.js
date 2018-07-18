/**
 2      * 设置cookie
 3      * @param name cookie的名称
 4      * @param value cookie的值
 5      * @param day cookie的过期时间
 6      */
var setCookie = function (name, value, day) {
  if (day !== 0) { //当设置的时间等于0时，不设置expires属性，cookie在浏览器关闭后删除
    var expires = day * 24 * 60 * 60 * 1000;
    var date = new Date(+new Date() + expires);
    document.cookie = name + "=" + decodeURI(value) + ";expires=" + date.toUTCString();
  } else {
    document.cookie = name + "=" + decodeURI(value);
  }
};

/**
 2      * 获取对应名称的cookie
 3      * @param name cookie的名称
 4      * @returns {null} 不存在时，返回null
 5      */
var getCookie = function (name) {
  var arr;
  var reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
  if (arr = document.cookie.match(reg)){
      return decodeURI(arr[2]);
  } else {
      return null;
  } 
};

/**
2      * 删除cookie
3      * @param name cookie的名称
4      */
5
var delCookie = function (name) {//将有效期设为失效，则删除cookie
    setCookie(name, ' ', -1);
};

export {setCookie,getCookie,delCookie}