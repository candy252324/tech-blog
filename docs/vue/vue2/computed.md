# computed

首先，`new Vue`的时候，执行`initComputed()`进行计算属性的初始化，这个函数的主要目的是在 vm 实例上挂载一个`_watcher`对象，这个`_watcher`以计算属性的 key 作 key, 值是 watcher 实例。
```js
export default function initComputed(vm) {
  const computed = vm.$options.computed
  let watcher = vm._watcher = Object.create(null)
  for (let key in computed) {
    watcher[key] = new Watcher(computed[key], { lazy: true }, vm)
    defineComputed(vm, key)
  }
}
``` 
下图是打印出来的 `_watcher`：

<img :src="$withBase('/imgs/myvue/vue2-computed-init.png')"  style="transform:scale(0.8);">


定义 `defineComputed` 方法，将计算属性代理到 vue 实例上，使能通过 this.xxx 的方式访问计算属性。
```js
/**
 * 将计算属性代理到 vue 实例上，使能通过 this.xxx 的方式访问计算属性
 * 并结合 watcher 实现 computed 缓存
 * @param {*} key 
 */
function defineComputed(vm, key) {
  Object.defineProperty(vm, key, {
    get() {
      const watcher = vm._watcher[key]
      // ditry 为true,说明 computed 回调函数在本次函数渲染周期内没有执行过
      if (watcher.dirty) {
        watcher.evalute() // 通知 watcher 执行 computed 回调函数
      }
      return watcher.value
    },
    set() {
      console.log("计算属性不能设置")
    }
  })
}
```

Watcher 接收 options 参数，内部定义 dirty 变量用于标记是否已经进行过计算，当响应式数据更新触发 update 后，将 dirty 置为 true，计算属性重新计算过后将 dirty 置为 false。

```js
export default class Watcher {
  constructor(cb, options = {}, vm = null) {
    this._cb = cb
    this.options = options
    !options.lazy && this.get()
    this.vm = vm
    this.dirty = true
    this.value = null  // 存储 watcher 中 cb 的执行结果
  }
  get() {
    Dep.target = this
    // 为什么这里要绑定作用域为 vm? 
    // 因为如果直接执行this._cb的话，如果 cb 是计算属性的回调函数，那么回调函数里的 this 指向当前 watcher 实例，会导致回到函数去不到值
    this.value = this._cb.apply(this.vm)
    Dep.target = null // 防止重复依赖收集
  }
  update() {
    // 当响应式数据更新时，执行_cb函数，更新dom
    // 注：这里暂时没有使用异步更新队列，简单用promise实现
    Promise.resolve().then(() => {
      this._cb()
    })
    this.dirty = true
  }
  evalute() {
    // 触发 cb 执行
    this.get()
    // dirty 置为false, 实现一次刷新周期内 computed 计算属性只执行一次
    this.dirty = false
  }
}
```

以上便是实现计算属性的全部代码。

接下来基于以下示例代码，回答两个问题：
1. 计算属性的依赖是怎么收集的？
2. 计算属性的缓存是怎么实现的？
### 第一个问题：计算属性的依赖是怎么收集的？

先回忆一下，data 的依赖是怎么收集的：

- 首先，组件挂载的时候，执行 `new Watcher(updateComponent)`，将`Dep.target` 赋值为当前Watcher实例
- 然后，`updateComponent` 大致会经过这几个过程：模板编译 => 生成渲染函数 => 执行渲染函数生成vnode => 执行 path 对比新老 vnode => 根据对比结果新增/删除 dom。
- 其中，执行渲染函数生成 vnode 的过程中，会发生 this.xxx 的数据读取操作，触发 `Object.defineProperty`的 getter，getter 中 判断当前`Dep.target` 有值，便进行依赖收集。

同理，执行渲染函数生成 vnode 的过程中，也会发生计算属性的读取操作，所以计算属性的依赖收集过程是这样的：

- 首先，读取计算属性触发`defineComputed`里的 getter ，此时 dirty 为 true，于是执行`watcher.evalute()`
- 然后，`Dep.target`被赋值为`this`（此时 this 指向计算属性的 watcher 实例）
- 之后执行计算属性的回调函数 cb，由于cb 中存在 data 的读取（`this.count * 2`），于是触发 data 的 `Object.defineProperty`的 getter
- getter 中 判断当前`Dep.target` 有值（指向当前计算属性 watcher 实例），便进行了依赖收集。





### 2.计算属性的缓存是怎么实现的？

假设我们现在的代码是这样的，其中 doubleCount 是计算属性，值为 count*2。
```html
<div id="app">
  <div>{{count}}</div>
  <div>{{doubleCount}}</div>
  <div>{{doubleCount}}</div>
</div>
```
首先，dep 数组中一定是有两个 watcher，第一个是根组件渲染 watcher (称为 watcher1 )，第二个是计算属性 doubleCount 的 watcher (称为 watcher2)。

已知，首次渲染完成后，watcher2 中 dirty 已经被置为 false。

- 1. 当 count 发生变化时，触发 setter，通知更新
- 2. 通知更新的过程中，首先执行 watcher1 的 update，而 update 中的 cb 函数是异步执行的（这里称为 cb1），先不执行
- 3. 接下来执行 watcher2 的 update，同理，cb2 是异步的，先不会执行，先将 watcher2 的 dirty 置成了 true
- 4. 接下来是执行 cb1 生成渲染函数了，生成渲染函数的过程中，发生了两次关于 `this.doubleCount` 的引用
- 5. 第一次引用触发`defineComputed`里的 getter ，此时 dirty 为 true，执行`watcher.evalute()` 进行计算，计算完后 dirty 被置为 false
- 6. 第二次引用又触发`defineComputed`里的 getter ，此时 dirty 为 false，直接返回之前的计算结果
- 7. 最后执行 cb2

> 提示：
这里目前有点问题，第 5 步中执行`watcher.evalute()` 其实最终就是执行了 cb2，但是第 7 步又执行了一遍 cb2， 导致 cb2 被执行了两遍。没关系，等实现异步更新队列之后就好了。
