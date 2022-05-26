
# 整体思路

[本项目github 地址](https://github.com/candy252324/MVue1.git)

数据响应式的核心原理是`Object.defineProperty`。

**注：该属性不支持IE8及其更低版本的浏览器。**


整体思路是：

1. new Vue首先执行初始化，对data执行响应式处理，这个过程发生在observer中。通过递归遍历整个data对象，为对象中的每个 key 设置一个getter 、setter。如果 key 为数组，则走数组的响应式流程。

 > 数组的响应式是通过`Object.defineProperty`去拦截数组的7个方法实现的, 使这7个方法在完成本职工作的同时，增加了依赖通知更新的能力，而且如果有新增数据，则新增数据也会被响应式处理。

2. 同时对模板进行编译，找到其中动态绑定的数据，从data中获取到初始化视数据，这个过程发生在compile中

> 编译过程中每遇到一个响应式数据就实例化一个 Watcher， Watcher中传入一个用于更新dom的回调函数（注意：回调函数中必须要有数据的读取操作！不然无法触发getter！）

3. 定义一个更新函数和watcher,将来对数据变化时watcher会调用更新函数

>实例化 Watcher 的过程中，先给`Dep.target`赋值为当前的 Watcher 实例(可理解为 window.target，就只是用来存储当前的Watcher 实例) ; 再执行回调函数，回调函数中发生数据读取操作，从而触发这个key 的 getter, getter 中判断当前`Dep.target`是有值的，则进行依赖收集（就是收集这个 watcher 实例）,收集到这个 key 对应的 dep 实例中; 回调函数执行完成后，将`Dep.target`置为 null, 防止重复收集依赖。


4. 由于data的某一个key在一个视图中可能出现多次，所以每一个key都需要一个管家dep来管理多个watcher

5. 当data中的数据发生改变时候，触发setter，找到对应的dep,通知所有watcher执行更新函数

