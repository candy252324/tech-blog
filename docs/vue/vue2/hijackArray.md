# 数组响应式

前面我们已经实现了对象的响应式了，那么数组的响应式如何实现呢？

答案是，需要使用`Object.defineProperty`对数组原型对象上的7个方法进行重写，使它们完成原本功能的同时，额外做一些其它的事情。

这7个方法是`"push", "pop", "unshift", "shift", "splice", "sort", "reverse"`。为什么是这7个？`concat`为什么不行？因为数组上只有这7个方法会改变原数组，其它都是返回新数组，而返回新数组会导致数据失去响应式。


实现原理看代码：
``` js
const arrayProto = Array.prototype
const newArrayProto = Object.create(arrayProto)  // 原型链继承
const methodsToPatch = ["push", "pop", "unshift", "shift", "splice", "sort", "reverse"]

methodsToPatch.forEach(method => {
  Object.defineProperty(newArrayProto, method, {
    value: function (...args) {
      const ret = arrayProto[method].apply(this, args) // 7个方法完成本职工作
      // 看到这行打印就说明数组操作劫持成功了，具体逻辑这里没实现
      console.log("在这里实现页面更新逻辑！")  
      return ret
    },
    configurable: true,
    writable: true,
    enumerable: false
  })
})
```

尝试改变数组内容：
``` html
<script>
  const myvue = new MVue({
    el: "#app",
    data: {
      arr:[1,2,3]  // 测试数组
    }
  })
  setTimeout(() => {
    myvue.$data.arr.push(123)
  }, 1000)
</script>
```
