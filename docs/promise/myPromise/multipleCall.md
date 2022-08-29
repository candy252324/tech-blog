# then方法可被同一个promise多次调用

我们在使用 Promise 的时候，以下示例代码中，两个 then 回调中都应该拿到 res 值。

``` js
p.then(res => {
  console.log(res)
})
p.then(res => {
  console.log(res)
})

```

如何实现呢？

很简单，**只需要将所有的 `onFulfilled` 和 `onRejected` 回调函数以数组的格式存下来，`resove` 的时候，再循环数组，依次执行就好了。**

这里我们给 `fulfilledCallback` 和 `rejectedCallback`都加个`s`

```js
const PENDING = "pending"
const FULFILLED = "fulfilled"
const REJECTED = "rejected"

class MPromise {
  constructor(executor) {
    this.status = PENDING
    this.value = undefined
    this.reason = undefined
    this.fulfilledCallbacks = []
    this.rejectedCallbacks = []

    const mResolve = value => {
      if (this.status === PENDING) {
        this.status = FULFILLED
        this.value = value
-       this.fulfilledCallback && this.fulfilledCallback(value)
+       this.fulfilledCallbacks && this.fulfilledCallbacks.forEach(onFulfilled => onFulfilled(value))
      }
    }
    const mReject = reason => {
      if (this.status === PENDING) {
        this.status = REJECTED
        this.reason = reason
-       this.rejectedCallback && this.rejectedCallback(reason)
+       this.rejectedCallbacks && this.rejectedCallbacks.forEach(onRejected => onRejected(reason))
      }
    }
    try {
      executor(mResolve, mReject)
    } catch (error) {
      throw error
    }
  }
  then(onFulfilled, onRejected) {
    // .then 的时候 status 已经变成 fulfilled ，异步执行 onFulfilled 回调即可
    if (this.status === FULFILLED) {
      typeof onFulfilled === "function" && setTimeout(() => onFulfilled(this.value))
    } else if (this.status === REJECTED) {
      typeof onRejected === "function" && setTimeout(() => onRejected(this.reason))
    } else {
      // .then 的时候 status 还是 pending 状态 ，将 onFulfilled 回调函数存起来，等 resolve 执行的时候再执行
      if (typeof onFulfilled === "function") {
-       this.fulfilledCallback = value => setTimeout(() => onFulfilled(value))
+       this.fulfilledCallbacks.push(value => setTimeout(() => onFulfilled(value)))
      }
      if (typeof onRejected === "function") {
-       this.rejectedCallback = reason => setTimeout(() => onRejected(reason))
+       this.rejectedCallbacks.push(reason => setTimeout(() => onRejected(reason)))
      }
    }
  }
}

```