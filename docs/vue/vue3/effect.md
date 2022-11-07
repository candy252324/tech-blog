# effect 的实现

## effect 用法

先看一个 `effect` 用法示例：

```html
<body>
  <div id="app"></div>
  <!-- 这里引入的 reactivity.global.js 是 vue 源码的打包产物（版本 3.2.41） -->
  <script src="../../reactivity/dist/reactivity.global.js"></script>
  <script>
    const { reactive, effect } = VueReactivity
    const state = reactive({ name: 'lily' })
    effect(() => {
      app.innerHTML = state.name
    })
    setTimeout(() => {
      state.name = 'rose'
    }, 1000)
  </script>
</body>
```

上述代码的表现是 1s 后 ，页面显示内容由 `lily`变成了 `rose`。

`effect(fn, options?)` 函数接收两个参数：`fn` 是必须的，如果 `options.lazy` 为 false, 则 `fn` 立即被执行（页面显示 `lily`），反之，只有当依赖数据变化的时候(`state.name='newvalue'`)，`fn` 才会执行。

接下来我们就要来实现这个 `effect`。

## 实现思路

整个实现思路是：

`effect(fn,options)` 执行的时候，记录当前的 activeEffect 为 fn，并执行 fn, 而`fn`中包含`state.xxx`的引用，`state.xxx`的引用触发 `proxy.get`，执行`track`函数将当前 activeEffect 存储到一个 map 结构中 ，`proxy.set`触发后，执行 `trigger` 函数，从 map 结构中拿到对应 key 的依赖（即一个个 effect） ，并依次执行。

比如有如下代码，我们把三个 `effect` 里的用户函数依次称为 `fn1`、`fn1` 和 `fn3`：

```js
const obj = { name: 'cxx', age: 30, list: ['aaa', 'bbb'] }
const state = reactive(obj)
effect(() => {
  state.name
  state.list[0]
})
effect(() => {
  state.list.length
})
effect(() => {
  state.list[5]
})
```

`fn1`、`fn1` 、 `fn3`三个函数中都有 `state.xxx` 的引用，这将触发依赖收集，最终生成的依赖关系如下图所示：

<img :src="$withBase('/imgs/myvue/vue3-effect-rely-tree.jpg')">

有了这份依赖关系图之后，当我们通过 `state.xxx = 'newValue'` 改变数据时，就只需要把依赖 xxx 属性的 fn 执行就好了，这就是通知依赖更新。

简单来说就是：

1. `effect` 函数记录当前 `activeEffect`
2. `createGetter` 函数中调用 `track`收集依赖
3. `createSetter`中调用`trigger`通知更新

## 记录当前 effect

首先，我们先来实现`effect`函数：

```js
// /packages/reactivity/src/effect.ts
let activeEffect: Function // 当前 effect
let effectStack: Function[] = [] // 定义一个栈
function effect(fn: Function, options: any = {}) {
  if (!effectStack.includes(fn)) {
    try {
      effectStack.push(fn)
      activeEffect = fn
      if (!options.lazy) {
        fn()
      }
    } finally {
      effectStack.pop()
      activeEffect = effectStack[effectStack.length - 1]
    }
  }
}
```

解释一下上面的代码中，**为什么要定义一个栈，主要是为了处理 effect 嵌套的情况。**

如下代码，我们把外层 `effect` 中的用户函数称为 `fn1`，把内层 `effect` 中的用户函数称为 `fn2`。很显然，当执行到`state.name = 'xxx'` 的时候，`activeEffect` 为 `fn1`，栈为`['fn1']`;当执行到 `state.age = 30` 的时候，`activeEffect` 为 `fn2`，栈为`['fn1','fn2']`。而`try{}finally{}` 语句中的 `finally` 是无论成功失败都会执行的，`fn2` 执行完后走`finally`，栈重新变成`['fn1']`，`activeEffect`取栈尾元素，就也变成 `fn1` 啦!

```js
effect(() => {
  state.name = 'xxx' // 执行到这里的时候，activeEffect 为 fn1
  effect(() => {
    state.age = 30 // 执行到这里的时候，activeEffect 为 fn2
  })
  state.hobby = 'swim' // 执行到这里的时候，activeEffect 应该为 fn1
})
```

## 依赖收集

然后，`createGetter` 中调用`track` 方法用于收集依赖：

```js
// /packages/reactivity/src/baseHandlers.ts
import { track, trigger } from './effect'
function createGetter(isReadonly = false, shallow = false) {
  return function get(target: Object, key: any, receiver: any) {
    const res = Reflect.get(target, key, receiver)
    // 非只读的数据（reactive 和 shallowReactive） 收集依赖
    if (!isReadonly) {
      // 数组收集依赖的时候，key 除了会出现"length","toString","join"等情况，还会出现类型是 Symbol 的情况
      // 这里为了方便处理，直接过滤了这种情况
      if (!isSymbol(key)) {
        track(target, 'get', key)  // 收集依赖
      }
    }
    ...
    return res
  }
}
```

```js
// /packages/reactivity/src/effect.ts
// targetMap 格式：{target:{key:[effect,effect]}}
let targetMap = new WeakMap()
function track(target: any, type: string, key: string) {
  if (!activeEffect) {
    return
  }
  // {key:[effect,effect]}
  let depMap = targetMap.get(target)
  if (!depMap) {
    targetMap.set(target, (depMap = new Map()))
  }
  // [effect,effect]
  let dep = depMap.get(key)
  if (!dep) {
    depMap.set(key, (dep = new Set()))
  }
  if (!dep.has(activeEffect)) {
    dep.add(activeEffect)
  }
}
```

## 通知更新

最后，`createSetter` 中调用 `trigger` 方法用于通知更新：

```js
// /packages/reactivity/src/baseHandlers.ts
import { track, trigger } from './effect'
function createSetter(shallow = false) {
  return function set(target: any, key: string, value: any) {
    const oldValue = target[key]
    // 对于数组，比如 state.list[100]="xxx"，key 是字符串"100"， 若 100 小于 list 的长度，则是修改，否则是新增
    // 对于对象，如果原型对象上存在 key 属性，则是修改，否则是新增
    const hasKey = isArray(target) ? Number(key) < target.length : hasOwn(target, key)
    // 注意这里 Reflect.set 放置位置，Reflect.set后，target 值立即发生变化
    const result = Reflect.set(target, key, value)
    if (!hasKey) {
      // 新增
      trigger(target, 'add', key, value)
    } else {
      // 修改
      if (oldValue !== value) {
        trigger(target, 'set', key, value, oldValue)
      }
    }
    return result
  }
}
```

```js
// /packages/reactivity/src/effect.ts
function trigger(target: any, type: 'add' | 'set', key: string, newValue: any, oldValue?: any) {
  const depMap = targetMap.get(target)
  if (!depMap) return
  const effectSet = new Set()
  const add = (effectAdd: Function[]) => {
    if (effectAdd) {
      effectAdd.forEach((effect: Function) => effectSet.add(effect))
    }
  }
  // 修改数组length，比如state.list.length = 2 ( newValue 为 2)
  // 那么需要把所有 length 的依赖和  index 大于或等于 2 的 依赖都重新执行一遍
  // 需要重新执行的依赖有 effect(()=>{ state.list.length})，effect(()=>{ state.list[2]})，effect(()=>{ state.list[3]})，等等
  if (key === 'length' && isArray(target)) {
    depMap.forEach((dep: Function[], sKey: any) => {
      if (sKey === 'length' || sKey >= newValue) {
        add(dep)
      }
    })
  } else {
    // 对象
    if (key != undefined) {
      add(depMap.get(key))
    }
    // 数组修改索引
    switch (type) {
      case 'add':
        if (isArray(target)) {
          console.log(depMap)
          add(depMap.get('length'))
        }
    }
  }
  effectSet.forEach((effect: any) => effect())
}
```
