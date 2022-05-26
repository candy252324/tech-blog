# 整体思路

数据响应式的核心原理是`Object.defineProperty`。

通过递归遍历整个data对象，为对象中的每个 key 设置一个getter 、setter。如果 key 为数组，则走数组的响应式流程。

数组的响应式是通过`Object.defineProperty`去拦截数组的7个方法实现的, 使这7个方法在完成本职工作的同时，增加了依赖通知更新的能力，而且如果有新增数据，则新增数据也会被响应式处理。


**数据响应式更新能力是通过数据响应式拦截，结合Dep、Watcher、编译器来实现的。** 

整体思路是：

1. 数据监听函数中，每一个key都对应了一个Dep实例，dep 实例中维护了一个依赖列表
2. 编译过程中每遇到一个响应式数据就实例化一个 Watcher， Watcher中传入一个用于更新dom的回调函数（回调函数中必须要有数据的读取操作！不然无法触发getter！）
``` js
new Watcher(() => {
  node.value = this.$vm[exp]  // 必须要有this.vm.xxx 的数据读取操作！！
})
```
3. 实例化 Watcher 的过程中，先给`Dep.target`赋值为当前的 Watcher 实例(可理解为 window.target，就只是用来存储当前的Watcher 实例) ; 再执行回调函数，回调函数中发生数据读取操作，从而触发这个key 的 getter, getter 中判断当前`Dep.target`是有值的，则进行依赖收集（就是收集这个 watcher 实例）,收集到这个 key 对应的 dep 实例中; 回调函数执行完成后，将`Dep.target`置为 null, 防止重复收集依赖。