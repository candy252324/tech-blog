# patch

patch 方法用于生成真实 dom，它接收两个参数 —— 旧vnode 和 新vnode。主要分支逻辑如下：

- **存在旧 vnode，但是不存在新 vnode，走组件销毁逻辑**
- **不存在旧 vnode，则说明是子组件首次渲染，则走子组件的渲染逻辑**
 > 调用`createElm`方法，里面判断如果是自定义组件，则通过传入的vnode拿到组件信息，生成子组件实例，再手动调用`$mount`进行挂载。
- **存在旧 vnode，且存在 `oldVnode.nodeType`, 说明是真实节点，走根节点首次渲染逻辑**
 > 调用`createElm`方法，该方法主要功能是创建真实dom元素，
- **存在旧 vnode，但不存在 `oldVnode.nodeType`，则说明是更新，走更新逻辑**
 > 更新逻辑中涉及 diff 算法，后面有专门的章节讲。

``` js
export default function patch(oldVnode, vnode) {
  // 组件销毁，这个分支本项目不处理
  if (oldVnode && !vnode) {
    console.log("组件销毁！！！")
    return
  }
  // 子组件首次渲染
  if (!oldVnode) {
    createElm(vnode)
  } else {
    // 存在nodeType, 说明是真实节点，则是根节点首次渲染
    if (oldVnode.nodeType) {
      const parent = oldVnode.parentNode // 父节点 body
      const referNode = oldVnode.nextSibling  // 参考节点，第一个script 标签
      // 将vnode变成真实元素挂载到父节点内
      createElm(vnode, parent, referNode)
      // 移除老的vNode(模板节点)  
      parent.removeChild(oldVnode)
    } else {
      // 更新
      console.log("update!")
    }
  }
}

```

主要看一下 createElm 的实现逻辑，这个函数主要是通过 `document.createElement(vnode.tag)` 将 vnode 转化成真实的dom。其中涉及到一个自定义组件的创建过程（`createComponent`函数）。

``` js
/**
 * 创建元素，
 * 并在vnode上绑定parent,指向真实parent dom
 * 并在非定义组件元素的vnode上绑定elm,指向真实创建的dom元素;
 * @param {*} vnode VNode
 * @param {*} parent VNode 的父节点，真实节点
 * @param {*} referNode 参考节点
 */
function createElm(vnode, parent, referNode) {
  // 记录节点的父节点
  vnode.parent = parent
  // 如果是自定义组件,如: <my-comp><my-comp/>, 
  if (createComponent(vnode)) return
  // 否则走接下来的原生标签逻辑
  const { attr, children, text } = vnode
  if (text) { // 文本节点
    // 创建文本节点，并插入到父节点内
    vnode.elm = createTextNode(vnode)
  } else { // 元素节点
    // 创建元素，在 vnode 上记录对应的 dom 节点
    vnode.elm = document.createElement(vnode.tag)
    // 给元素设置属性
    setAttribute(attr, vnode)
    // 递归创建子节点
    for (let i = 0, len = children.length; i < len; i++) {
      createElm(children[i], vnode.elm)
    }
  }
  // 如果存在 parent，则将创建的节点插入到父节点内
  if (parent) {
    const elm = vnode.elm
    if (referNode) {
      parent.insertBefore(elm, referNode)
    } else {
      parent.appendChild(elm)
    }
  }
}
```
### 自定义组件挂载

看一下自定义组件是怎么创建的，这里为了实现方便，直接通过vnode拿到子组件的信息，new 了一个子组件实例，然后通过调用`$mount`手动进行挂载。
```js
/**
 * 创建自定义组件
 * @param {*} vnode
 */
function createComponent(vnode) {
  if (vnode.tag && !isReserveTag(vnode.tag)) { // 非保留节点(即非原生标签)，则说明是组件
    // 获取组件配置信息
    const { tag, context: { $options: { components } } } = vnode
    const compOptions = components[tag]
    // vue 源码中这里是用 vue.extend 实现的，本项目为了实现方便，直接 new Vue 一个子组件 
    const compIns = new Vue(compOptions)
    // 将父组件的 VNode 放到子组件的实例上
    compIns._parentVnode = vnode
    // 这里需要手动调用$mount 挂载子组件, 因为 new Vue 子组件的时候，不存在$el挂载点了，if判断进不去
    compIns.$mount() //
    // 记录子组件 vnode 的父节点信息
    compIns._vnode.parent = vnode.parent
    // 将子组件添加到父节点内
    vnode.parent.appendChild(compIns._vnode.elm)
    return true
  }
}
```
