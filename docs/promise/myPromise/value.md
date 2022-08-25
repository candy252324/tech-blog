# value 传递

Promise 中， `resolve(value)` 里的 value 会被传递到 then 回调的第一个参数函数里，`reject(reason)` 里的 reason 会被传递到 then 回调的第二个参数函数里，怎么传递的呢？

很简单，内部新增两个变量存储 value 和 reason ，再传递一下就好了。

``` js
const PENDING = "pending"
const FULFILLED = "fulfilled"
const REJECTED = "rejected"

class MPromise {
  constructor(executor) {
    this.status = PENDING
+   this.value = undefined
+   this.reason = undefined

    const mResolve = value => {
      if (this.status === PENDING) {
        this.status = FULFILLED
+       this.value = value
      }
    }
    const mReject = reason => {
      if (this.status === PENDING) {
        this.status = REJECTED
+       this.reason = reason
      }
    }
    try {
      executor(mResolve, mReject)
    } catch (error) {
      throw error
    }
  }
  then(onFulfilled, onRejected) {
    if (this.status === FULFILLED) {
-      typeof onFulfilled === "function" && onFulfilled()
+      typeof onFulfilled === "function" && onFulfilled(this.value)
    } else if (this.status === REJECTED) {
-      typeof onRejected === "function" && onRejected()
+      typeof onRejected === "function" && onRejected(this.reason)
    }
  }
}

```

基于以上代码，我们作如下测试，已经能正确拿到 value 和 reason 值了

```js
const p = new MPromise((resolve, reject) => {
  resolve("成功")
  // reject("失败")
})

p.then(res => {
  console.log('value:', res)  // 打印 “value: 成功”
}, err => {
  console.log("err:", err)
})
```

但是，如果我们的执行函数是异步的呢？如下代码：
```js
const p = new MPromise((resolve, reject) => {
  // 模拟异步请求
  setTimeout(() => {
    resolve("成功")
  }, 1000)
})
p.then(res => {
  console.log('value:', res)  // 没有打印 
}, err => {
  console.log("err:", err)  // 没有打印 
})
```
会发现 `.then`并没有执行，因为`.then`的执行是同步的，当它执行的时候 `status` 的状态还是 `pending`（要等 1s 之后，`resolve`执行完，`status`才会变成`fulfilled`）。

 那如何才能让`.then`里的`onFulfilled` 或 `onRejected` 函数正常执行呢？看下一篇。

