
# `throw new Error` 能否终断promise链式调用

结论，不能。

看如下代码：
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
