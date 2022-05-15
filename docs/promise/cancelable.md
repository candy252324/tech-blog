# 可中断

注意这里是中断而不是终止，由于 Promise 没法终止，这个中断的意思是：在合适的时候，把 pending 状态的 promise 给 reject 掉。例如一个常见的应用场景就是但愿给网络请求设置超时时间，一旦超时就就中断(即then回调里的函数不执行了)，咱们这里用定时器模拟一个网络请求，随机 3 秒以内返回：
``` js
function timeoutWrapper(p, timeout = 2000) {
  const wait = new Promise((resolve, reject) => {
    setTimeout(() => {
      reject('请求超时')
    }, timeout)
  })
  return Promise.race([p, wait])
}

const req = timeoutWrapper(request)
req.then(res => console.log(res)).catch(e => console.log(e))
```


### 一、`throw new Error` 是否能终断promise的链式调用？
结论，不能。看如下代码：
``` js
const requestTask= ()=>{
  return new Promise((resolve,reject)=>{
    throw new Error("有异常抛出！")  // throw Error 并不会中断后面的链式调用！！
    setTimeout(resolve,1000,"来自服务端的数据")
  })
}
requestTask().then(res=>{
  console.log("来自then回调的打印:",res)
  return "then data"
}).catch(err=>{
  console.log("来自catch回调的打印:",err)
  return "catch data"
}).finally(()=>{
  console.log("来自finally回调的打印")
  return "finally data"
}).then(res=>{
  console.log(res)
})
```
执行结果如下，可以看到，throw error 会被catch捕获，而后继续执行了第二个then回到（拿到catch 回调返回的结果）。可见`throw new Error` 无法终止promise的链式调用？
<img :src="$withBase('/imgs/promise/promise-abort.png')" style="transform:scale(0.9);">

### 二、Axios中取消请求的实现
想要实现取消某个请求，我们需要为该请求配置一个 cancelToken ，然后在外部调用一个 cancel 方法。
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

我们来实现一下这个函数：
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

### 三、使用Promise.race 实现终止请求
``` js
function abortWrapper(p1) {
  let abort
  let p2 = new Promise((resolve, reject) => (abort = reject))
  let p = Promise.race([p1, p2])
  p.abort = abort
  return p
}


const req = abortWrapper(request)
req.then(res => console.log(res)).catch(e => console.log(e))
setTimeout(() => req.abort('用户手动终止请求'), 2000) // 这里能够是用户主动点击
```
