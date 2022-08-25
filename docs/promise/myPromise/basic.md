# 基本结构

先看一下正常的 Promise 是怎么使用的：

``` js
const p = new Promise((resolve, reject) => {
  if (true) {
    resolve("成功")
  } else {
    reject("失败")
  }
})
// 实例上有 then 方法
p.then(res => {
  console.log(res)
}, err => {
  console.log(err)
})  
```

大方向上，我们首先需要实现以下四步：

1. Promise 是一个构造函数(ES6中使用类)

2. new Promise 时传入一个执行函数，并且执行函数是立即执行的

3. 执行函数接收两个参数`resolve函数和reject函数`，并且均能够接收参数

4. Promise的实例上有一个`then`方法，`then`方法接收两个参数


基于以上，我们可以写出如下代码：
``` js
class MPromise {
  constructor(executor) {
    const mResolve = value => {
      console.log(value)
    }
    const mReject = reason => {
      console.log(reason)
    }
    try {
      executor(mResolve, mReject)
    } catch (error) {
      throw error
    }
  }
  then(onFulfilled, onRejected) {

  }
}
```