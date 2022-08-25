# 内部状态

Promise 内部需要一个状态值，resolve 的时候 pending => fulfilled， reject 的时候  pending => rejected。

``` js
const PENDING = "pending"
const FULFILLED = "fulfilled"
const REJECTED = "rejected"

class MPromise {
  constructor(executor) {
    this.status = PENDING  // 维护一个内部状态
    const mResolve = value => {
      // pending => fulfilled
      if (this.status === PENDING) {
        this.status = FULFILLED
        console.log(value)
      }
    }
    const mReject = reason => {
      // pending => rejected
      if (this.status === PENDING) {
        this.status = REJECTED
        console.log(reason)
      }
    }
    try {
      executor(mResolve, mReject)
    } catch (error) {
      throw error
    }
  }
  // then 函数里同样需要状态判断
  then(onFulfilled, onRejected) {
    if (this.status === FULFILLED) {
      typeof onFulfilled === "function" && onFulfilled()
    } else if (this.status === REJECTED) {
      typeof onRejected === "function" && onRejected()
    }
  }
}
```