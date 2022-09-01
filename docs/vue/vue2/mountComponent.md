# 组件挂载

`mountComponent` 也发生在`$mount`函数中, 这个函数的主要作用是：实例化一个渲染 Watcher，初始化渲染（即new Watcher 的时候）或响应式数据更新时，都会执行Watcher里的回调函数，回调函数中最终执行了`__patch__`函数用于更新dom。

``` js
export default function mountComponent(vm) {
  // 负责初始渲染和后续更新组件的的函数
  const updateComponent = () => {
    vm._update(vm._render())
  }
  // 实例化一个渲染 Watcher，当响应式数据更新时，这个更新函数会被执行
  // updateComponent 里面如果发生多次this.xxx的触发getter,会导致依赖被多次收集，所以 watcher 需要去重
  new Watcher(updateComponent)
}
```
`vm._render()`的代码很简单，就是执行之前挂载到 $option 上的 render 方法，生成新的vnode。

``` js
Vue.prototype._render = function () {
  // 给 render 函数绑定 this 上下文为 Vue 实例
  return this.$options.render.apply(this)
}

```

`vm._update()`接收render函数生成的新vnode, 并将新旧vnode都传给`__patch__`函数用于更新dom。

```js
/**
 * 
 * @param {*} vnode 由render函数生成的虚拟dom
 */
Vue.prototype._update = function (vnode) {
  // 老的 VNode
  const prevVNode = this._vnode
  // 新的 VNode
  this._vnode = vnode
  if (!prevVNode) {
    // 老的 VNode 不存在，则说明是首次渲染根/子组件(如果不存在this.$el , 则是子组件首次挂载，否则是根组件首次渲染)
    this.$el = this.__patch__(this.$el, vnode)
  } else {
    // 后续更新组件，都会走这里
    this.$el = this.__patch__(prevVNode, vnode)
  }
}
```