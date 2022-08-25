# 可取消

### 使用 Promise.race 实现取消请求

场景1：给网络请求设置超时时间，一旦超时就中断(即then回调里的函数不执行了)。

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

场景2：用户点击取消请求

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
setTimeout(() => req.abort('用户手动终止请求'), 2000) // 模拟用户点击
```







