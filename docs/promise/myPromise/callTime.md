# 调用时机


[Promises/A+ ](https://promisesaplus.com/)规范指出: `onFulfilled` 和 `onRejected`并不是 promise 解决或者拒绝后就立即调用的，而是放到任务队列中，具体何时执行需要根据实现的机制来。实践中要确保 `onFulfilled` 和 `onRejected` 函数异步地执行，并且应该是在`then`方法被调用后的新一轮事件循环的新执行栈中执行。这个机制可以采用"宏任务(macro-task)"机制来实现，比如：`setTimeout`或`setImmediate`;也可以采用"微任务(micro-task)"机制来实现，比如`Mutationobserver`或者`process.nextTick`。
>In practice, this requirement ensures that onFulfilled and onRejected execute asynchronously, after the event loop turn in which then is called, and with a fresh stack. This can be implemented with either a “macro-task” mechanism such as setTimeout or setImmediate, or with a “micro-task” mechanism such as MutationObserver or process.nextTick. Since the promise implementation is considered platform code, it may itself contain a task-scheduling queue or “trampoline” in which the handlers are called.

啥意思？

我们先用自己写的 Promise 测试一下如下代码，很明显，打印顺序是 1 3 2 （ 因为 `resolve` 的时候，直接执行了内部保存的 `onFulfilled` 回调，所以先打印 3，再打印 2）， 也就是说 `onFulfilled` 和 `onRejected` 在 promise 解决或者拒绝后立即调用了 。
``` js
const p = new MPromise((resolve, reject) => {
  setTimeout(() => {
    console.log(111)
    resolve("成功")
    console.log(222)
  }, 2000)
})
p.then(res => {
  console.log(333)
})
```
但是如果我们用正宗的 Promise 测试以上代码，会发现打印顺序是 1 2 3 ，对应规范中说的 “**onFulfilled 和onRejected并不是 promise 解决或者拒绝后就立即调用的**”。

我们只需要按照规范来实现即可，这里采用宏任务`setTimeout`来实现。


```js
// 其它地方都不需要改，只需要在 onFulfilled 和 onRejected 外套一层setTimeout 即可。
class MPromise {
  ...
  then(onFulfilled, onRejected) {
    // 同步情况
    if (this.status === FULFILLED) {
      typeof onFulfilled === "function" && setTimeout(() => onFulfilled(this.value))
      // 同步情况
    } else if (this.status === REJECTED) {
      typeof onRejected === "function" && setTimeout(() => onRejected(this.reason))
      // 异步情况
    } else {
      if (typeof onFulfilled === "function") {
        this.fulfilledCallback = value => setTimeout(() => onFulfilled(value))
      }
      if (typeof onRejected === "function") {
        this.rejectedCallback = reason => setTimeout(() => onRejected(reason))
      }

    }
  }
}
```

再执行测试代码，已经可以正确打印 1 2 3 啦！:tada: