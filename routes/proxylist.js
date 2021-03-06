var PROXY_LIST = [{"ip":"111.1.55.136","port":"55336"},{"ip":"111.1.54.91","port":"55336"},{"ip":"111.1.56.19","port":"55336"}
    ,{"ip":"112.114.63.16","port":"55336"},{"ip":"106.58.63.83","port":"55336"},{"ip":"119.188.133.54","port":"55336"}
    ,{"ip":"106.58.63.84","port":"55336"},{"ip":"183.95.132.171","port":"55336"},{"ip":"11.12.14.9","port":"55336"}
    ,{"ip":"60.164.223.16","port":"55336"},{"ip":"117.185.13.87","port":"8080"},{"ip":"112.114.63.20","port":"55336"}
    ,{"ip":"188.134.19.102","port":"3129"},{"ip":"106.58.63.80","port":"55336"},{"ip":"60.164.223.20","port":"55336"}
    ,{"ip":"106.58.63.78","port":"55336"},{"ip":"112.114.63.23","port":"55336"},{"ip":"112.114.63.30","port":"55336"}
    ,{"ip":"60.164.223.14","port":"55336"},{"ip":"190.202.82.234","port":"3128"},{"ip":"60.164.223.15","port":"55336"}
    ,{"ip":"60.164.223.5","port":"55336"},{"ip":"221.204.9.28","port":"55336"},{"ip":"60.164.223.2","port":"55336"}
    ,{"ip":"139.214.113.84","port":"55336"} ,{"ip":"112.25.49.14","port":"55336"},{"ip":"221.204.9.19","port":"55336"}
    ,{"ip":"221.204.9.39","port":"55336"},{"ip":"113.207.57.18","port":"55336"} ,{"ip":"112.25.62.15","port":"55336"}
    ,{"ip":"60.5.255.143","port":"55336"},{"ip":"221.204.9.18","port":"55336"},{"ip":"60.5.255.145","port":"55336"}
    ,{"ip":"221.204.9.16","port":"55336"},{"ip":"183.232.82.132","port":"55336"},{"ip":"113.207.62.78","port":"55336"}
    ,{"ip":"60.5.255.144","port":"55336"} ,{"ip":"60.5.255.141","port":"55336"},{"ip":"221.204.9.23","port":"55336"}
    ,{"ip":"157.122.96.50","port":"55336"},{"ip":"218.61.39.41","port":"55336"} ,{"ip":"221.204.9.26","port":"55336"}
    ,{"ip":"112.112.43.213","port":"55336"},{"ip":"60.5.255.138","port":"55336"},{"ip":"60.5.255.133","port":"55336"}
    ,{"ip":"221.204.9.25","port":"55336"},{"ip":"111.161.35.56","port":"55336"},{"ip":"111.161.35.49","port":"55336"}
    ,{"ip":"183.129.134.226","port":"8080"} ,{"ip":"58.220.10.86","port":"80"},{"ip":"183.87.117.44","port":"80"}
    ,{"ip":"211.23.19.130","port":"80"},{"ip":"61.234.249.107","port":"8118"},{"ip":"200.20.168.140","port":"80"}
    ,{"ip":"111.1.46.176","port":"55336"},{"ip":"120.203.158.149","port":"8118"},{"ip":"70.39.189.6","port":"9090"}
    ,{"ip":"210.6.237.191","port":"3128"},{"ip":"122.155.195.26","port":"8080"}];


module.exports.GetProxy = function () {

    var randomNum = parseInt(Math.floor(Math.random() * PROXY_LIST.length));
    var proxy = PROXY_LIST[randomNum];

    return 'http://' + proxy.ip + ':' + proxy.port;
}

//如果需要长期使用为了防止网站屏蔽，还是需要加入一个代理列表
// 为示例我从网上的免费代理中提出一些做示例，制作成proxylist.js
// ，其中提供一个随机取一条代理的函数

//在其同级的js引用时可以这样
// Proxy = require('./proxylist.js');
//如果不是就要跳出当前文件夹了
//使用时就在请求是设置proxy属性，并且设置其值为Proxy.GetProxy()
//这样就能加入代理了
