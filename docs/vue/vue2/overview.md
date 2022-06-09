# 整体思路

[本项目github 地址](https://github.com/candy252324/MVue2.git)

**Vue2 通过降低 Watcher 的粒度，一个组件对应一个 Watcher (渲染Watcher)来解决Vue1 Watcher 太多导致的资源占用过多，性能下降问题**。

在 Vue1 中，Watcher 和页面中的响应式数据一一对应，当响应式数据发生改变，Dep 通知 Watcher 完成对应的 DOM 更新。但是在 Vue2 中一个组件对应一个 Watcher，当响应式数据发生改变时，Watcher并不知道这个响应式数据在组件中的什么位置，那又该如何完成更新呢？

答案是：Vue2 引入了 VNode 和 diff 算法，将组件编泽成VNode，每次响应式数据发生变化时，会生成新的 VNode，通过 diff 算法对比新旧 VNode，找出其中发生改变的地方，然后执行对应的 DOM 操作完成更新。

所以，**Vue1和Vue2在核心的数据响应式部分其实没什么变化，主要的变动在编译器部分**。



编译的主要流程是这样的：
- **1. 通过执行`renderHelper`在 vue 实例上挂载 `_c`、`_v`、`_s`等方法**

  其中`_c` 用于生成元素节点的 vnode，`_v`用于生成文本节点的 vnode 。

- **2. 在 vue 实例上挂载 `__patch__ `方法**

 `__patch__ `方法接收新旧 vnode, 用于生成真实 dom 。

- **3. 在 vue 原型链上定义`$mount`方法**

  `$mount`方法主要做了两件事：

  1. 生成渲染函数 render,并将 render 挂载到 $option 上，`vm.$options.render = render`。

  > 这个过程是先将模板解析成 ast, 再将 ast 转化成渲染函数的字符串形式，通过 `new Function` 将字符串变成可执行函数。
  
  2. 调用`mountComponent(vm)`，实例化一个渲染 Watcher，进行组件的初始化渲染和后续更新。

  > 这个过程具体是这样的：`mountComponent`函数中实例化一个渲染 Watcher，初始化渲染（即new Watcher 的时候）或响应式数据更新时，都会执行Watcher里的回调函数，回调函数中执行`vm._update(vm._render())`方法，`vm._render()`即是执行之前挂载到 $option 上的 render 方法，生成新vnode， `vm._update`接收render函数生成的新vnode, 并将新旧vnode都传给`__patch__`函数用于更新dom。



