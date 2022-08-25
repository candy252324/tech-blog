# 异步函数的处理

前面讲到，当执行函数是异步的时候，由于`.then`是同步代码，`.then`执行的时候`status`还是`pending`状态，导致传入`.then`的`onFulfilled` 和 `onRejected` 函数无法执行,`.then`回调函数中自然就拿不到值。

如何解决呢？

**只需要定义两个新的变量，`.then`的时候将`onFulfilled` 和 `onRejected` 这两个函数保存起来，`resolve` 和 `reject` 执行的时候，再将保存的函数执行即可。**

```js
const PENDING = "pending"
const FULFILLED = "fulfilled"
const REJECTED = "rejected"

class MPromise {
  constructor(executor) {
    this.status = PENDING
    this.value = undefined
    this.reason = undefined
+   this.fulfilledCallback = undefined
+   this.rejectedCallback = undefined

    const mResolve = value => {
      if (this.status === PENDING) {
        this.status = FULFILLED
        this.value = value
+       this.fulfilledCallback && this.fulfilledCallback(value)
      }
    }
    const mReject = reason => {
      if (this.status === PENDING) {
        this.status = REJECTED
        this.reason = reason
+       this.rejectedCallback && this.rejectedCallback(reason)
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
      typeof onFulfilled === "function" && onFulfilled(this.value)
    } else if (this.status === REJECTED) {
      typeof onRejected === "function" && onRejected(this.reason)
    } else {
      // 把 onFulfilled 和 onRejected 回调函数存下来
+     typeof onFulfilled === "function" && (this.fulfilledCallback = onFulfilled)
+     typeof onRejected === "function" && (this.rejectedCallback = onRejected)
    }
  }
}

```
以上代码已经能在`.then`中拿到 value 值了。