# 链式调用和值穿透

Promise 中的 then 是可以链式调用和值穿透的。

- **链式调用**：then 函数将返回一个新的 promise， 并且当 then 函数中 return 一个值时，不管是什么值，都能在下一个 then中获取到，如`p.then("test").then(() => "cxx").then(res => { console.log(res) })`，最后的打印值应该是`cxx`，这就是 then 的链式调用

- **值穿透**：当 then 中参数为空或非函数时，如：`promise.then('test').then().then(v=>console.log(v))`，假如此时 promise resolve 的值是10，那么最后的 then 依旧可以得到之前 then 返回的值 10，也会打印出 10，这就是所谓的值的穿透。

要实现 then 的链式调用，且后一个 then 能拿到前一个 then 中 return 出来的值，思路是 return 一个新的 promise（promise2）， 然后在 promise2 中 resolve onFulfilled 回调函数的返回值。

需要注意的是，then 函数return 出来的值可能是一个简单值，也可能是一个函数fn(上面可能有then方法)，或者一个新的promise实例，如下代码：
```js
p.then(res=>"123").then(res=>new Promise()).then(res=>fn)
```
我们需要一个额外的 `resolvePromise` 函数来处理这些情况。

修改后的 then 方法代码如下：


```js
class MPromise {
  ...
  then(onFulfilled, onRejected){
    // 同步情况， .then 的时候 status 已经变成 fulfilled ，异步执行 onFulfilled 回调即可
    const promise2 = new MPromise((resolve, reject) => {
      if (this.status === FULFILLED) {
        if (typeof onFulfilled === "function") {
          setTimeout(() => {
            try {
              const x = onFulfilled(this.value)
              // 如果 x 只是一个简单值，这里直接 resolve(x) 就好了，但是实际上 x 还可能是函数或者新的promise
              // 所以这里再写一个 resolvePromise，来处理所有这些情况
              resolvePromise(promise2, x, resolve, reject)
            } catch (error) {
              reject(error)  // 捕获 onFulfilled 执行时可能的报错
            }
          })
        } else {
          resolve(this.value)
        }
      } else if (this.status === REJECTED) {
        if (typeof onRejected === "function") {
          setTimeout(() => {
            try {
              const x = onRejected(this.reason)
              resolvePromise(promise2, x, resolve, reject)
            } catch (error) {
              reject(error)
            }
          })
        } else {
          reject(this.reason)
        }
      } else {
        // 异步情况， .then 的时候 status 还是 pending 状态 ，将 onFulfilled 回调函数存起来，等 resolve 执行的时候再执行
        this.fulfilledCallbacks.push(value => setTimeout(() => {
          if (typeof onFulfilled === "function") {
            try {
              const x = onFulfilled(value)
              resolvePromise(promise2, x, resolve, reject)
            } catch (error) {
              reject(error)
            }
          } else {
            resolve(value)
          }
        }))
        this.rejectedCallbacks.push(reason => setTimeout(() => {
          if (typeof onRejected === "function") {
            try {
              const x = onRejected(reason)
              resolvePromise(promise2, x, resolve, reject)
            } catch (error) {
              reject(error)
            }
          } else {
            reject(reason)
          }
        }))
      }
    })
    return promise2
  }
}
```

`resolvePromise` 函数代码如下：
```js
function resolvePromise(promise, x, resolve, reject) {
  if (promise === x) {  //  promise2 和 x 指向同一对象，以 TypeError 为拒因拒绝 promise2
    reject(new TypeError('Chaining cycle detected for promise'));
  } else if (typeof x === 'function' || (typeof x === 'object' && x !== null)) {  // 如果 x 是一个对象或者函数（如果 x 为 Promise，由于 Promise 也是一个对象，所以不用单独处理了）
    let called = false;   // 是否被调用，用于处理当 resolvePromise 和 rejectPromise 均被调用，或者被同一参数调用了多次，仅首次调用并忽略剩下的调用
    try {
      const then = x.then;
      if (typeof then === 'function') {   // then 为函数
        then.call(x, y => {  // then 函数执行并接收两个回调函数
          if (called) return;
          called = true;
          resolvePromise(promise, y, resolve, reject);
        }, r => {
          if (called) return;
          called = true;
          reject(r);
        });
      } else {
        resolve(x);   //  then 不是函数，以 x 为参数解决 promise2
      };
    } catch (error) {
      if (called) return;
      called = true;
      reject(error);
    }
  } else {
    resolve(x);  // 如果 x 不为对象或者函数，以 x 为参数解决 promise2
  }
};
```