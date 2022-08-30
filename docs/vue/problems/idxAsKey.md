# 使用index作key导致的bug

现象描述如下图，当点击第一个删除按钮时，渲染出现了问题，字母的渲染是正确的，但是数字的渲染却错行了。

<img :src="$withBase('/imgs/mess/vue2-idxAsKey.png')" style="transform:scale(0.6);">

问题代码如下，其中`<comp>`组件负责渲染数字，使用Math.random()生成一个随机数，不依赖父组件数据。
```html
 <div id="app">
    <div v-for="(item,index) in list" :key="index">
      {{item.name}}，
      <comp></comp>
      <button @click="del(index)">删除</button>
    </div>
  </div>
```
```js
new Vue({
  el: "#app",
  data() {
    return {
      list: [
        { name: "aaa", count: 111 }, 
        { name: "bbb", count: 222 }, 
        { name: "ccc", count: 333 }, 
        { name: "ddd", count: 444 }
      ],
    }
  },
  components: {
    "comp": {
      template: `<span>{{count}}</span>`,
      data() {
        return {
          count: Math.floor(Math.random() * 1000),
        }
      },
    }
  },
  methods: {
    del(index) {
      this.list.splice(index, 1)
    }
  }
})
```
但是，如果我们的`<comp>`组件改成接收prop, 使用prop渲染，则不会出现这个问题。如下代码：
```html
<comp :count="item.count"></comp>
```
```js
new Vue({
  ...
  components: {
    "comp": {
      template: `<span>{{count}}</span>`,
      props: ["count"]
    }
  },
})
```


这是为什么呢？

先想一下，从点击删除按钮到界面完成渲染这个过程发生了什么：
- 1. `splice` 操作触发 `ob.dep.notify()` （手写Vue1数组响应式处理章节中有讲）
- 2. `dep`里面循环 watchers，执行 `watchers.update()`
- 3. `watchers.update()` 其实就是调用`render`生成渲染函数（这个过程包括将模板编译成 AST，`_c`、`_v`将 AST 处理成 vnode）, 再调用`patch`对比新老 vnode 生成真实dom。

**问题就出现在对比新老 vnode 的 Diff 算法中。**

假设点击删除按钮之前的四个 DOM 分别是 `D1`，`D2`，`D3`，`D4`，对应的 vnode 为 `V1`，`V2`，`V3`，`V4`。点击删除之后，list 还剩 3 条数据，根据这 3 条数据生成的 vnode 分别为 `V'1`，`V'2`，`V'3`。

由于我们采用 index 作 key，`V1` 和 `V'1` 的 key 都是 0，`V2` 和 `V'2` 的 key 都是1，`V3` 和 `V'3` 的 key 都是 2，diff 算法中，isSameNode 函数判断这三对新旧 vnode 是同一个节点，走`sameVnode(oldStartVnode, newStartVnode)`分支, 调用`patchVnode` 更新 `D1`，`D2`，`D3`, 这个过程中，aaa 变成 bbb, bbb 变成 ccc, ccc 变成 ddd。

三次 while 循环后， `oldStartIdx` 为 4， `oldEndIdx` 为 4，`newStartIdx` 为 4， `newEndIdx` 为 3，`newStartIdx > newEndIdx`， 则 `removeVnodes(oldCh, 4, 4)` 将 DOM `D4`  移除了。
```js
...
// vue 2.7.10
while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
  if (isUndef(oldStartVnode)) {
    ...
  } else if (isUndef(oldEndVnode)) {
    ...
  } else if (sameVnode(oldStartVnode, newStartVnode)) {
    // 看这里
    patchVnode(
      oldStartVnode,
      newStartVnode,
      insertedVnodeQueue,
      newCh,
      newStartIdx
    )
    oldStartVnode = oldCh[++oldStartIdx]
    newStartVnode = newCh[++newStartIdx]
  } else if (sameVnode(oldEndVnode, newEndVnode)) {
    ...
  } else if (sameVnode(oldStartVnode, newEndVnode)) {
    ...
  } else if (sameVnode(oldEndVnode, newStartVnode)) {
    ...
  } else {
    ...
  }
}
if (oldStartIdx > oldEndIdx) {
 ...
} else if (newStartIdx > newEndIdx) {
  // 看这里
  removeVnodes(oldCh, oldStartIdx, oldEndIdx)
}  
```

```js
// vue 2.7.10
function sameVnode(a, b) {
  return (
    a.key === b.key &&
    a.asyncFactory === b.asyncFactory &&
    ((a.tag === b.tag &&
      a.isComment === b.isComment &&
      isDef(a.data) === isDef(b.data) &&
      sameInputType(a, b)) ||
      (isTrue(a.isAsyncPlaceholder) && isUndef(b.asyncFactory.error)))
  )
}
```
