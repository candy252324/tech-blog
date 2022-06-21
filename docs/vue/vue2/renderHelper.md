# 辅助函数renderHelper

renderHelper是为了在 vue 实例上挂载 `_c`、`_v`、`_s`(处理字面量表达式返回结果字符串)、`_t`(生成插槽vnode)等方法。

这里只讲`_c` 和`_v`。

``` js
/** 用于在vue实例上挂载 _c 和 _v 方法 */
export default function renderHelper(vm) {
  vm._c = createElement
  vm._v = createText
}
```
`_c` 接收三个参数，用于生成元素节点的vnode。

``` js
/**
 * 根据标签信息创建 Vnode
 * @param {string} tag 标签名 
 * @param {Map} attr 标签的属性 Map 对象
 * @param {Array<Render>} children 所有的子节点的渲染函数
 */
function createElement(tag, attr, children) {
  return VNode(tag, attr, children, this)
}

```

`_v`接收文本节点的AST对象，用于生成文本节点的VNode。

``` js
/**
 * 生成文本节点的 VNode
 * @param {*} textAst 文本节点的 AST 对象
 */
function createText(textAst) {
  return VNode(null, null, null, this, textAst)
}
```
``` js
export default function VNode(tag, attr, children, context = null, text = null) {
  return {
    tag,
    attr,
    parent: null,    // 当前节点的父节点，这是真实的dom节点
    children,
    text,
    elm: null,   // Vnode 的真实节点
    context
  }
}
```