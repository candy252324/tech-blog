# 响应式的实现

## Proxy 和 Reflect

vue3 响应式实现的核心 api 是`Proxy`，赋值和取值的时候用的是`Reflect`，先简单了解一下这两个 api 的用法。

- `Proxy`

  _Proxy 可以理解成，在目标对象之前架设一层“拦截”，外界对该对象的访问，都必须先通过这层拦截，因此提供了一种机制，可以对外界的访问进行过滤和改写。_

```js
var target = {}
var proxy = new Proxy(target, {
  get: function (target, propKey, receiver) {
    console.log(`获取 ${propKey} 属性!`)
    return Reflect.get(target, propKey, receiver)
  },
  set: function (target, propKey, value, receiver) {
    console.log(`设置 ${propKey} 属性!`)
    return Reflect.set(target, propKey, value, receiver)
  },
})
```

```js
console.log(proxy.age) // 获取 age 属性!
proxy.age = 100 // 设置 age 属性!
```

**注意: 1. 要使得 Proxy 起作用，必须针对 Proxy 实例（上例是 `proxy` 对象）进行操作，而不是针对目标对象（上例是`target`对象）进行操作。 2. Proxy 默认是浅作用，即嵌套对象不会自动代理**。

- `Reflect`

  _`Reflect` 对象的方法与 `Proxy` 对象的方法一一对应，只要是 `Proxy` 对象的方法，就能在 `Reflect` 对象上找到对应的方法。这就让 `Proxy` 对象可以方便地调用对应的 `Reflect` 方法，完成默认行为，作为修改行为的基础。也就是说，不管 `Proxy` 怎么修改默认行为，你总可以在 `Reflect` 上获取默认行为。_

  比如以下代码：它采用 `Reflect.set` 方法将值赋值给对象的属性，确保完成原有的行为。

  ```js
  Proxy(target, {
    set: function (target, name, value, receiver) {
      var success = Reflect.set(target, name, value, receiver)
      if (success) {
        console.log('set value success')
      }
      return success
    },
  })
  ```

  ## reactive API 的实现

  先看 vue3 中 `reactive` 用法：

  ```js
  const state = reactive({ name: 'cc', list: { age: 30 } })
  console.log(state) // proxy 实例
  console.log(state.list) // proxy 实例
  ```

  以下打印结果，可以看到，reactive 处理数据之后，返回的是 `Proxy` 实例，里面嵌套的数据也变成了`Proxy` 实例。

  <img :src="$withBase('/imgs/myvue/vue3-reactive-usage.png')">

类似的 api 还有`shallowReactive`，`readonly` 和 `shallowReadonly`：

- `shallowReactive` 用法

`shallowReactive` 是 `reactive()` 的浅层作用形式，对于上面的例子，如果使用`shallowReactive`，打印结果是下面这样的，区别就是没有深层级的转换。

  <img :src="$withBase('/imgs/myvue/vue3-shallowReactive-usage.png')">

- `readonly` 用法

数据转换和 `reactive` 一样是深层次转换，只是转换结果变成了只读的，不能通过`state.xxx=xxx`的方式修改数据

- `shallowReadonly` 用法

数据转换和 `shallowReactive` 一样是浅层次转换，只读。

接下来我们就来实现这四个 api。

```js
// /packages/reactivity/src/reactive.ts
import { isObject } from '@vue/shared'

import { reactiveHandlers, shallowReactiveHandlers, readonlyHandler, shallowReadonlyHandlers } from './baseHandlers'

const readonlyMap = new WeakMap() // 存储已经代理过的只读对象
const reactiveMap = new WeakMap() // 存储已经代理过的响应式对象

/**
 * 最终是返回了一个 proxy 实例
 * 其中有一个防止数据被重复代理的逻辑
 */
function createReactiveObject(target, isReadonly = false, baseHandler) {
  if (!isObject(target)) return target
  const proxyMap = isReadonly ? readonlyMap : reactiveMap
  const proxyExist = proxyMap.get(target)
  // 防止数据被重复代理
  if (proxyExist) return proxyExist
  const proxy = new Proxy(target, baseHandler)
  proxyMap.set(target, proxy)
  return proxy
}

function reactive(target) {
  return createReactiveObject(target, false, reactiveHandlers)
}
function shallowReactive(target) {
  return createReactiveObject(target, false, shallowReactiveHandlers)
}
function readonly(target) {
  return createReactiveObject(target, true, readonlyHandler)
}
function shallowReadonly(target) {
  return createReactiveObject(target, true, shallowReadonlyHandlers)
}
export { reactive, shallowReactive, readonly, shallowReadonly }
```

上面的代码中导出了我们要实现的四个 api，它们的公共逻辑是，判断当前数据是否已经代理过了，代理过的数据存到`WeakMap`中，防止数据被重复代理。

> `WeakMap` 和 `Map` 的区别是：`WeakMap` 的 key 只能是对象，原始数据类型是不能作为 key 的（比如 Symbol），另外 `WeakMap` 不干扰垃圾收集。

再看一下四个`handler`的实现：

```js
// /packages/reactivity/src/baseHandlers.ts
import { isObject } from '@vue/shared'
import { reactive, readonly } from './index'
function createGetter(isReadonly = false, shallow = false): Function {
  return function get(target: Object, key: any, receiver: any) {
    const res = Reflect.get(target, key, receiver)
    // 非只读的数据（reactive 和 shallowReactive） 收集依赖
    if (!isReadonly) {
      // todo  收集依赖
    }
    // shallow 的数据（shallowReactive 和 shallowReadonly） 走到这里直接 return 就行了，因为 Proxy api 默认是浅作用
    if (shallow) {
      return res
    }
    // 非 shallow 的数据（reactive 和 readonly） 走这里，懒代理
    if (isObject(res)) {
      return isReadonly ? readonly(res) : reactive(res)
    }
    return res
  }
}
function createSetter(shallow = false) {
  return function set(target: Object, key: any, value: any) {
    return Reflect.set(target, key, value)
  }
}
export const reactiveHandlers = {
  get: createGetter(),
  set: createSetter(),
}

export const shallowReactiveHandlers = {
  get: createGetter(false, true),
  set: createSetter(true),
}

export const readonlyHandler = {
  get: createGetter(true, false),
  set: () => {
    console.log('只读对象，不能设置')
  },
}

export const shallowReadonlyHandlers = {
  get: createGetter(true, true),
  set: () => {
    console.log('只读对象，不能设置')
  },
}
```

其实 `handler` 就是一个对象 `{ get:()=>{}, set:()=>{} }` ，也就是`Proxy`的第二个参数。

重点是这个`createGetter()`函数，这里实现了 vue3 的一个性能优化 —— **懒代理**。

## 懒代理

上面`createGetter()`函数中，我们看到对于不是 `shallow` 的数据，`isObject(res)` 判断如果是对象，则递归调用 `readonly(res)` 或 `reactive(res)` 实现懒代理。

详细解释就是，根据 `Proxy`api 的特性，只有当存在对属性的引用的时候，才会触发`proxy.get()` 方法。所以，当我们使用 `const state = reactive()` 或者 `const state = readonly()`对数据进行代理后，只有当代码中存在 `state.xxx` 的引用的时候，才会走`createGetter()`方法 ，然后在这个方法中判断 `state.xxx` 是不是对象，如果是对象，则递归代理这个对象。

反之，如果代码中不存在 `state.xxx` 的引用，则不会触发 `proxy.get()` ，也即不会走`createGetter()`方法，则不存在递归代理。

用到了才代理，没用到不代理，这就是懒代理。
