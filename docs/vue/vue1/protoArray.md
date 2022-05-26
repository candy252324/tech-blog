# 数组响应式处理

使用`Object.defineProperty`对数组原型对象上的7个方法进行重写，使它们完成原本功能的同时，额外做一些其它的事情。

这7个方法是`"push", "pop", "unshift", "shift", "splice", "sort", "reverse"`。为什么是这7个？`concat`为什么不行？因为数组上只有这7个方法会改变原数组，其它都是返回新数组，而返回新数组会导致数据失去响应式。

```js
import observe from "./observe.mjs"

const originArrayProto = Array.prototype
const newArrayProto = Object.create(originArrayProto)
// 为什么是这7个方法？因为数组上只有这7个方法会改变原数组，其它都是返回新数组
const methodsToPatch = ["push", "pop", "unshift", "shift", "splice", "sort", "reverse"]
methodsToPatch.forEach(method => {
  Object.defineProperty(newArrayProto, method, {
    value: function (...args) {
      const ret = originArrayProto[method].apply(this, args) // 7个方法完成本职工作
      const ob = this.__ob__
      let inserted
      // 获取新增的元素
      switch (method) {
        case "push":
        case "unshift":
          inserted = args
          break;
        case "splice":
          // 使用示例：this.arr.splice(idx,deleteNum,add args)
          inserted = args.slice(2)
          break;
        default:
          break;
      }
      // 使数组中新增的对象也具有响应式, this.arr.push({name:"cxx"})
      if (inserted) observe(inserted)
      // 依赖通知更新
      ob.dep.notify()
      return ret
    },
    configurable: true,
    writable: true,
    enumerable: false
  })
})

/** 修改数组原型链 */
export default function protoArray(arr) {
  arr.__proto__ = newArrayProto
}

```