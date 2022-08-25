# Axios中取消请求的实现

先看一下axios中如何取消请求，我们需要为该请求配置一个 cancelToken ，然后在外部调用一个 cancel 方法。
``` js
// 创建取消令牌的生成器对象
const CancelToken = axios.CancelToken;
// 获取令牌对象
const source = CancelToke.source();
axios.get('/url/123', {
  cancelToken: source.token
});
// 2秒后取消请求
setTimeout(() => {
  source.cancel();
}, 2000);
```

请求的发送是一个异步过程，最终会执行 xhr.send 方法，xhr 对象提供了 abort 方法，可以把请求取消。因为我们在外部是碰不到 xhr 对象的，所以我们想在执行 cancel 的时候，去执行 xhr.abort 方法。

我们来实现简单实现一下这个函数：
``` js
// 创建Promise，返回开关cancel
function source () {
  let cancel;
  const promise = new Promise((resolve) => {
    cancel = resolve;
  }
  return {
    token: promise  // pending状态的promise
    cancel,      // 使上面的promise变成resolve状态
  }
}
// 发请求
function axios_get (config) {
    const xhr = new XMLHttpRequest(),
    method = "GET",
    url = "https://developer.mozilla.org/";
    xhr.open(method, url, true);
    xhr.send();
    if (config.cancelToken) {
      config.cancelToken.then(() => {
          xhr.abort();
      })
    }
}
// 代码执行
const source = source();
axios_get({ cancelToken: source.token });
setTimeout(() => {
  source.cancel();
}, 5000)
```