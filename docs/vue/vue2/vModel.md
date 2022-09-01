# v-model 原理

在已经知道了响应式、编译、patch 等这些之后，再串着起来捋一下 vue2 中的 v-model 是怎么实现的。


假设有如下代码：
```html
<div id="app">
  <input type="text" v-model="name">
</div>
```

#### 1. 编译
- 编译是一个很繁琐的过程，当发现node节点上有`v-model`属性时，会在节点上添加对应的事件（如果是`input`添加 input 事件，如果是`select`添加 change 事件），当节点输入内容时，执行`vm[exp] = elm.value`更新 data，这和 vue1 一样
```js
elm.addEventListener('input', function () {
  vm[value] = elm.value
})
```
- 示例代码编译生成的渲染函数字符串如下图所示（其中辅助函数`_c`用于生成元素节点的 vnode）,可以看到，里面记录了v-model 的值是 name
<img :src="$withBase('/imgs/myvue/vue2-vmodel.png')" style="transform:scale(0.9);">

#### 2. vue2 中一个组件对应一个 Watcher（渲染watcher），watcher 中传入一个更新方法（其实就是一个对比新老虚拟dom、添加移除dom的过程）
```js
// 组件挂载
export default function mountComponent(vm) {
  // 负责初始渲染和后续更新组件的的函数，
  // 其中_update 最终执行 patch 方法，_render() 返回渲染函数
  const updateComponent = () => {
    vm._update(vm._render())
  }
  // 实例化一个渲染 Watcher，当响应式数据更新时，这个更新函数会被执行
  new Watcher(updateComponent)
}
```

#### 3. 当依赖数据发生变化时，执行 watcher 中的更新方法，从而达到数据变化dom变化。


综上，总的来说和 vue1 差不多，就差了个生成虚拟 dom 的过程。当数据变化时，vue1 是直接 `node.value = this.$vm[exp]`，vue2 是要先生成虚拟 dom，然后新老虚拟 dom 对比，最后再进行 dom 更新。


