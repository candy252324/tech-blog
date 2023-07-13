(window.webpackJsonp=window.webpackJsonp||[]).push([[82],{479:function(t,s,n){"use strict";n.r(s);var a=n(56),e=Object(a.a)({},(function(){var t=this,s=t.$createElement,n=t._self._c||s;return n("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[n("h1",{attrs:{id:"diff算法"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#diff算法"}},[t._v("#")]),t._v(" diff算法")]),t._v(" "),n("p",[t._v("diff 算法发生在新旧 vnode 同时存在, 且新 vnode 不是文本节点，且新旧 vnode 都有孩子的情况下。")]),t._v(" "),n("p",[t._v("掌握diff算法有一个需要知道的前提是：vnode上会记录当前节点对应的真实dom（"),n("code",[t._v("vnode.elm")]),t._v("），及父节点dom("),n("code",[t._v("vnode.elm.parentNode")]),t._v(")。")]),t._v(" "),n("div",{staticClass:"language-js extra-class"},[n("pre",{pre:!0,attrs:{class:"language-js"}},[n("code",[n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("/**\n * 对比新老节点，找出其中的不同，然后更新老节点\n * @param {*} oldVnode 老节点的 vnode\n * @param {*} vnode 新节点的 vnode\n */")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("patchVnode")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("oldVnode"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" vnode")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 如果新老节点相同，则直接结束")]),t._v("\n  "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("oldVnode "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("===")]),t._v(" vnode"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v("\n\n  "),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 将老 vnode 上的真实节点同步到新的 vnode 上，否则，后续更新的时候会出现 vnode.elm 为空的现象")]),t._v("\n  vnode"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("elm "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" oldVnode"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("elm\n\n  "),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 走到这里说明新老节点不一样，则获取它们的孩子节点，比较孩子节点")]),t._v("\n  "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" ch "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" vnode"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("children\n  "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" oldCh "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" oldVnode"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("children\n\n  "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("!")]),t._v("vnode"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("text"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 新节点不存在文本节点")]),t._v("\n    "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("ch "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("&&")]),t._v(" oldCh"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 说明新老节点都有孩子")]),t._v("\n      "),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// diff ")]),t._v("\n      "),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("updateChildren")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("ch"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" oldCh"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n    "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("else")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("ch"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 老节点没孩子，新节点有孩子")]),t._v("\n      "),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 增加孩子节点")]),t._v("\n    "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("else")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 新节点没孩子，老节点有孩子")]),t._v("\n      "),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 删除这些孩子节点")]),t._v("\n    "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n  "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("else")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 新节点存在文本节点")]),t._v("\n    "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("vnode"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("text"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("expression"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 说明存在表达式")]),t._v("\n      "),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 获取表达式的新值")]),t._v("\n      "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" value "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token constant"}},[t._v("JSON")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("stringify")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("vnode"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("context"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("vnode"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("text"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("expression"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n      "),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 旧值")]),t._v("\n      "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("try")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" oldValue "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" oldVnode"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("elm"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("textContent\n        "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("value "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("!==")]),t._v(" oldValue"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 新老值不一样，则更新")]),t._v("\n          oldVnode"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("elm"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("textContent "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" value\n        "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n      "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("catch")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        "),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 防止更新时遇到插槽，导致报错")]),t._v("\n        "),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 目前不处理插槽数据的响应式更新")]),t._v("\n      "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n    "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n  "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),n("p",[t._v("主要看一下 "),n("code",[t._v("updateChildren")]),t._v(" 这个方法，这就是vue2的"),n("strong",[t._v("双端比较")]),t._v("，其实就是假设了四种可能的情况，用于降低时间复杂度。")]),t._v(" "),n("div",{staticClass:"language-js extra-class"},[n("pre",{pre:!0,attrs:{class:"language-js"}},[n("code",[n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("/**\n * diff，比对孩子节点，找出不同点，然后将不同点更新到老节点上\n * @param {*} ch 新 vnode 的所有孩子节点\n * @param {*} oldCh 老 vnode 的所有孩子节点\n */")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("updateChildren")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("ch"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" oldCh")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 四个游标")]),t._v("\n  "),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 新孩子节点的开始索引，叫 新开始")]),t._v("\n  "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" newStartIdx "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),t._v("\n  "),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 新结束")]),t._v("\n  "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" newEndIdx "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" ch"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("length "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),t._v("\n  "),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 老开始")]),t._v("\n  "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" oldStartIdx "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),t._v("\n  "),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 老结束")]),t._v("\n  "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" oldEndIdx "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" oldCh"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("length "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),t._v("\n  "),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 循环遍历新老节点，找出节点中不一样的地方，然后更新")]),t._v("\n  "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("while")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("newStartIdx "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<=")]),t._v(" newEndIdx "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("&&")]),t._v(" oldStartIdx "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<=")]),t._v(" oldEndIdx"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 根据 web 中的 DOM 操作特点，做了四种假设，降低时间复杂度")]),t._v("\n    "),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 新开始节点")]),t._v("\n    "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" newStartNode "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" ch"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("newStartIdx"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n    "),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 新结束节点")]),t._v("\n    "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" newEndNode "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" ch"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("newEndIdx"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n    "),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 老开始节点")]),t._v("\n    "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" oldStartNode "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" oldCh"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("oldStartIdx"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n    "),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 老结束节点")]),t._v("\n    "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" oldEndNode "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" oldCh"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("oldEndIdx"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n    "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("sameVNode")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("newStartNode"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" oldStartNode"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 假设新开始和老开始是同一个节点")]),t._v("\n      "),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 对比这两个节点，找出不同然后更新")]),t._v("\n      "),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("patchVnode")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("oldStartNode"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" newStartNode"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n      "),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 移动游标")]),t._v("\n      oldStartIdx"),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("++")]),t._v("\n      newStartIdx"),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("++")]),t._v("\n    "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("else")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("sameVNode")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("newStartNode"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" oldEndNode"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 假设新开始和老结束是同一个节点")]),t._v("\n      "),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("patchVnode")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("oldEndNode"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" newStartNode"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n      "),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 将老结束移动到新开始的位置")]),t._v("\n      oldEndNode"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("elm"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("parentNode"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("insertBefore")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("oldEndNode"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("elm"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" oldCh"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("newStartIdx"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("elm"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n      "),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 移动游标")]),t._v("\n      newStartIdx"),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("++")]),t._v("\n      oldEndIdx"),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("--")]),t._v("\n    "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("else")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("sameVNode")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("newEndNode"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" oldStartNode"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 假设新结束和老开始是同一个节点")]),t._v("\n      "),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("patchVnode")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("oldStartNode"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" newEndNode"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n      "),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 将老开始移动到新结束的位置")]),t._v("\n      oldStartNode"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("elm"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("parentNode"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("insertBefore")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("oldStartNode"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("elm"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" oldCh"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("newEndIdx"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("elm"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("nextSibling"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n      "),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 移动游标")]),t._v("\n      newEndIdx"),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("--")]),t._v("\n      oldStartIdx"),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("++")]),t._v("\n    "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("else")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("sameVNode")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("newEndNode"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" oldEndNode"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 假设新结束和老结束是同一个节点")]),t._v("\n      "),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("patchVnode")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("oldEndNode"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" newEndNode"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n      "),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 移动游标")]),t._v("\n      newEndIdx"),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("--")]),t._v("\n      oldEndIdx"),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("--")]),t._v("\n    "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("else")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n      "),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 上面几种假设都没命中，则老老实的遍历，找到那个相同元素")]),t._v("\n    "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n  "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n  "),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 跳出循环，说明有一个节点首先遍历结束了")]),t._v("\n  "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("newStartIdx "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v(" newEndIdx"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 说明老节点先遍历结束，则将剩余的新节点添加到 DOM 中")]),t._v("\n\n  "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n  "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("oldStartIdx "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v(" oldEndIdx"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 说明新节点先遍历结束，则将剩余的这些老节点从 DOM 中删掉")]),t._v("\n\n  "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),n("div",{staticClass:"language-js extra-class"},[n("pre",{pre:!0,attrs:{class:"language-js"}},[n("code",[n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("/**\n * 判断两个节点是否相同\n * 这里的判读比较简单，只做了 key 和 标签的比较\n */")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("sameVNode")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("n1"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" n2")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" n1"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("key "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("==")]),t._v(" n2"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("key "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("&&")]),t._v(" n1"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("tag "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("===")]),t._v(" n2"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("tag\n"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),n("p",[t._v("举个具体的例子描述一下这个双端比较过程：")]),t._v(" "),n("p",[t._v("假设新 vnode 是 a => b => c => d")]),t._v(" "),n("p",[t._v("假设旧 vnode 是 d => a => c => b => e")]),t._v(" "),n("p",[t._v("此时的 Dom 顺序应和旧 vnode 一致  D => A => C => B => E")]),t._v(" "),n("p",[t._v("第一次 while 循环，发现新 vnode 的最后一个元素和旧 vnode 的第一个元素相同，都为 d ，走"),n("code",[t._v("sameVNode(newEndNode, oldStartNode)")]),t._v("逻辑。此时 newEndIdx 为 3，则 "),n("code",[t._v("oldCh[newEndIdx].elm.nextSibling")]),t._v(" 对应的 dom 是 E。将当前dom D 插入到 dom E 的前面，所以第一次 while 循环后的 dom 顺序变成了 A => C => B => D => E")]),t._v(" "),n("img",{staticStyle:{transform:"scale(0.8)"},attrs:{src:t.$withBase("/imgs/myvue/vue2-diff1.jpg"),title:"第一次 while 循环"}}),t._v(" "),n("blockquote",[n("p",[t._v("关于 insertBefore 有一个小的知识点：第二个参数必传，但是可以为 null 或 undefined, 如果为 null 或 undefined，则元素会被插入到最后面。如："),n("code",[t._v("listDom.insertBefore(newDom, referDom)")]),t._v(", 如果参考节点为 null 或 undefined， 则 newDom 将会被插入到 listDom 的最后面。")])]),t._v(" "),n("p",[t._v("第二次 while 循环，走"),n("code",[t._v("sameVNode(newStartNode, oldStartNode)")]),t._v("分支，只需要更新dom内容和移动游标位置即可，不需要移动 dom 位置。")]),t._v(" "),n("img",{staticStyle:{transform:"scale(0.8)"},attrs:{src:t.$withBase("/imgs/myvue/vue2-diff2.jpg"),title:"第二次 while 循环"}}),t._v(" "),n("p",[t._v("第三次 while 循环 ，走 "),n("code",[t._v("sameVNode(newEndNode, oldStartNode)")]),t._v("，此时 newEndIdx 为 2，则 "),n("code",[t._v("oldCh[newEndIdx].elm.nextSibling")]),t._v(" 对应的 dom 是 D。将当前dom C 插入到 dom D 的前面，所以第三次 while 循环后的 dom 顺序变成了 A => B => C => D => E")]),t._v(" "),n("img",{staticStyle:{transform:"scale(0.8)"},attrs:{src:t.$withBase("/imgs/myvue/vue2-diff3.jpg"),title:"第三次 while 循环"}}),t._v(" "),n("p",[t._v("第四次 while 循环 ，走 "),n("code",[t._v("sameVNode(newStartNode, oldStartNode)")]),t._v("，只需要更新dom内容和移动游标位置即可，不需要移动 dom 位置。\n"),n("img",{staticStyle:{transform:"scale(0.8)"},attrs:{src:t.$withBase("/imgs/myvue/vue2-diff4.jpg"),title:"第四次 while 循环"}})]),t._v(" "),n("p",[t._v("第四次 while 循环后，由于 newStartIdx > newEndIdx, 不满足 while 循环的条件，跳出循环。同时 oldStartIdx 为3，oldEndIdx为 4， oldStartIdx < oldEndIdx，说明老节点中有多余节点，则将剩余的这些老节点从 DOM 中删掉。")])])}),[],!1,null,null,null);s.default=e.exports}}]);