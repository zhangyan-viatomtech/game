let isAndroid='',isiOS=''
let u = navigator.userAgent, app = navigator.appVersion;
isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //android终端或者uc浏览器
isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
if (isiOS){
    console.log('messageHandlers',window.webkit.messageHandlers)
    window.webkit.messageHandlers.fly.postMessage({ "params": "我是参数" });
}
/*else if(isAndroid){
  console.log('isAndroid')
  console.log(window.android)
  window.android.fly({ "params": "我是参数" }))
}*/
function fly(data){
    console.log('data',data)
}
