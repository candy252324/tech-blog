# 插槽原理

插槽的作用是实现内容分发，白话来说就是**子组件提供数据，父组件提供渲染模板（若父组件未提供模板，则使用插槽默认模板）**。

先看一个作用域插槽使用示例（vue 2.6.14）：

```html 
<div id="app">
  <my-comp>
    <!-- 支持解构 -->
    <template v-slot:header="{data:{text}}">
      <div style="color:red">
        {{text}}  
      </div>
    </template>
    <template v-slot:footer="slotProps">
      <div style="color:orange">
        {{slotProps.data.text}} 
      </div>
    </template>
  </my-comp>
</div>
```
```js
new Vue({
  el: "#app",
  components: {
    // 子组件
    "my-comp": {
      template: `
        <div>
          <slot :data="headerData" name="header">默认header</slot>
          <slot :data="footerData" name="footer">默认footer</slot>
        </div>
      `,
      data() {
        return {
          headerData: { text: "header content" },
          footerData: { text: "footer content" }
        }
      }
    },
  }
})
```
渲染结果如下：

<img :src="$withBase('/imgs/myvue/vue2-slot.jpg')" style="display:block; margin:0 auto;">

如下父组件未提供渲染模板, 将使用插槽默认模板渲染：
```html
<div id="app">
  <my-comp>
    <!-- 没有渲染模板 -->
  </my-comp>
</div>
```
<img :src="$withBase('/imgs/myvue/vue2-slot-default.jpg')" style="display:block; margin:0 auto;">


### 插槽实现原理

**简单来说就是，当解析到`<slot-comp/>`组件时，如果该组件存在根`<template/>`标签，且标签上存在`v-slot`属性，且标签里存在内容，则使用`<template/>`标签里的内容作为组件vnode, 否则使用组件里默认的内容作为组件vnode。**

原理其实很简单，麻烦的是处理过程。

如以下简单示例代码, 我们来看一下是怎么处理的。
```html
<!-- 默认插槽 -->
<slot-comp></slot-comp>
<!-- 作用域插槽 -->
<slot-comp>
  <template v-slot:default="slotProps">
    <!-- 这里为了最后区分渲染结果，我们用span标签 -->
    <span>{{slotProps}}</span>  
  </template>
</slot-comp>
```
```js
new Vue({
  components: {
    "slot-comp": {
      template: `
        <div>
          <slot name="default" v-bind:slotValue="slotValue">
            {{slotValue}}
          </slot>
        </div>
      `,
      data() {
        return {
          slotValue: "slot组件内部值"
        }
      }
    }
  }
})
```


### 1. 解析（处理插槽 ast，将插槽名称和值挂到当前节点`<template></template>`的 AST 对象上）

```js
/**
 * 处理插槽
 * <slot-comp>
 *   <template v-slot:default="scopeSlot">
 *     <div>{{ scopeSlot }}</div>
 *   </template>
 * </slot-comp>
 * @param { AST } el 节点的 AST 对象
 */
function processSlotContent(el) {
  // 注意，具有 v-slot:xx 属性的 template 只能是组件的根元素，这里不做判断
  if (el.tag === 'template') { // 获取插槽信息
    // 属性 map 对象
    const attrMap = el.rawAttr
    // 遍历属性 map 对象，找出其中的 v-slot 指令信息
    for (let key in attrMap) {
      if (key.match(/v-slot:(.*)/)) { // 说明 template 标签上 v-slot 指令
        // 获取指令后的插槽名称和值，比如: v-slot:default=xxx
        const slotName = el.slotName = key.match(/v-slot:(.*)/)[1]  // 拿到defalut
        el.scopeSlot = attrMap[`v-slot:${slotName}`] // 拿到xxx
        // 直接 return，因为该标签上只可能有一个 v-slot 指令
        return
      }
    }
  }
}
```
如下图，处理后的`<template></template>`节点 ast 对象上多了两个属性：
<img :src="$withBase('/imgs/myvue/vue2-slot-template-ast.jpg')" style="display:block; margin:0 auto;">


### 2. 再将插槽信息挂到父节点 AST 对象上（插槽信息存储）
```js
// 如果节点存在 slotName，则说明该节点是组件传递给插槽的内容
// 将插槽信息放到组件节点的 rawAttr.scopedSlots 对象上
// 而这些信息在生成组件插槽的 VNode 时（renderSlot）会用到
if (curEle.slotName) {
  const { parent, slotName, scopeSlot, children } = curEle

  const slotInfo = {
    slotName,
    scopeSlot,
    // 备注1： 这里关于 children 的操作，只是单纯为了避开 JSON.stringify 的循环引用问题
    // 因为生成渲染函数时需要对 attr 执行 JSON.stringify 方法
    children: children.map(item => {
      delete item.parent
      return item
    })
  }
  if (parent.rawAttr.scopedSlots) {
    parent.rawAttr.scopedSlots[curEle.slotName] = slotInfo
  } else {
    parent.rawAttr.scopedSlots = { [curEle.slotName]: slotInfo }
}
```
如下图：处理后的父节点`<slot-comp></slot-comp>`上多了`rawAttr.scopedSlots`属性，该属性每一项以slotName作为key。
<img :src="$withBase('/imgs/myvue/vue2-slot-parent-ast.jpg')" style="display:block; margin:0 auto;">

### 3. 生成渲染函数

之前有写一个`genElement`方法用于将 ast 转化为渲染函数字符串，我们只需要在这个函数里加一个判断 —— 如果tag为`slot`,则使用`_t`函数处理。
```js 
/**
 * 解析 ast 生成 渲染函数
 * @param {*} ast 语法树 
 * @returns {string} 渲染函数的字符串形式
 */
function genElement(ast) {
  const { tag, rawAttr, attr } = ast
  // 生成属性 Map 对象，静态属性 + 动态属性
  const attrs = { ...rawAttr, ...attr }
  // 处理子节点，得到一个所有子节点渲染函数组成的数组
  const children = genChildren(ast)

+  // 插槽处理
+  if (tag === "slot") {
+    return `_t(${JSON.stringify(attrs)}, [${children}])`
+  }

  // 生成 VNode 的可执行方法, 元素节点，用_c处理
  return `_c('${tag}', ${JSON.stringify(attrs)}, [${children}])`
}
```

`_t`函数即是`renderSlot`函数，这个函数返回插槽的vnode，主要逻辑是：如果父组件存在渲染模板，则使用父组件的模板信息生成Vnode，否则使用插槽默认内容生成vnode。
```js
/**
 * 生成插槽的 VNode
 * @param {*} attrs 插槽的属性
 * @param {*} children 插槽所有子节点的 ast 组成的数组
 */
function renderSlot(attrs, children) {
  // 父组件 VNode 的 attr 信息
  const parentAttr = this._parentVnode.attr
  let vnode = null
  // 说明给当前组件的插槽传递了内容, 如：
  // <slot-comp>
  //  <template v-slot:default="slotProps">
  //    <span>{{slotProps}}</span>
  //  </template>
  // </slot-comp>
  if (parentAttr.scopedSlots) {
    // 获取插槽信息
    const slotName = attrs.name
    const slotInfo = parentAttr.scopedSlots[slotName]
    // 这里的逻辑稍微有点绕，建议打开调试，查看一下数据结构，理清对应的思路
    // 这里比较绕的逻辑完全是为了实现插槽这个功能，和插槽本身的原理没关系
    this[slotInfo.scopeSlot] = this[Object.keys(attrs.vBind)[0]]
    vnode = genVNode(slotInfo.children, this)
  } else { // 插槽默认内容 ,没传内容 <slot-comp></slot-comp>
    // 将 children 变成 vnode 数组
    vnode = genVNode(children, this)
  }

  // 如果 children 长度为 1，则说明插槽只有一个子节点
  if (children.length === 1) return vnode[0]
  return createElement.call(this, 'div', {}, vnode)
}

```

有了vnode 后其实就ok了，后面就走 patch 流程了。