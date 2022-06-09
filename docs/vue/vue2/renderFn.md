# AST 和 渲染函数

在手写 Vue1 时，编译器是通过 DomApi 来遍历模版的 DOM 结构来完成的，在Vue2中不再使用这种方式，而是编译组件的模版字符串，生成 AST,然后将 AST 生成渲染函数。

这个过程发生在`$mount`函数中：

``` js
export default function mount(vm) {
  // 配置项上没有渲染函数，则进行编译
  if (!vm.$options.render) {
    let _template = ""
    const { el, template } = vm.$options
    // 存在template 或者 子组件挂载走这个分支
    if (template) {
      _template = template
    } else if (el) {  // 存在挂载点，拿到整个<div id="#app"></div>
      vm.$el = document.querySelector(el)
      _template = vm.$el.outerHTML
    }
    // 生成渲染函数,并挂在到$options上
    const render = compileToFunction(_template)
    vm.$options.render = render
  }else{
    // 存在render 函数的情况
  }
  mountComponent(vm)
}
```
> 上面 `mount`函数判断 $options 上是否存在 render 方法，不存在则判断是否存在 template， template 也不存在则判断 el ，从这里可以看出来 vue 的渲染优先级是 render  > template > el 。


我们主要看一下这里面的`compileToFunction`方法：
``` js
export default function compileToFunction(template) {
  // 将模板编译成 ast
  const ast = parse(template)
  // 从 ast 生成渲染函数
  const render = generate(ast)
  return render
}
```
可以看到 `compileToFunction` 做了两件事：
- 1. 将模板转化成 ast
- 2. 将 ast 生成渲染函数

生成 ast 的过程就是去遍历模板字符串，将模板字符串转化成一个对象的格式，这个过程很繁琐，这里不贴代码。
仅以以下模板代码为例，我们看下生成的 ast 长什么样：
 ```html
  <div id="app">
    <div class="line">
      <input type="text" v-model="name">
    </div>
  </div>
 ```
 生成的ast如下图所示：
<img :src="$withBase('/imgs/myvue/vue2-ast.png')" style="transform:scale(0.9);">


拿到 ast 后，通过调用 generate 方法将其转化为渲染函数。
  ``` js
 /**
 * 从 ast 生成渲染函数
 * @param {*} ast ast 语法树
 * @returns 渲染函数
 */
export default function generate(ast) {
  // 渲染函数字符串形式
  const renderStr = genElement(ast)
  // 通过 new Function 将字符串形式的函数变成可执行函数，并用 with 为渲染函数扩展作用域链
  return new Function(`with(this) { return ${renderStr} }`)
}
```

这里其实经过了两步，先调用 `genElement(ast)` 将 ast 转化为渲染函数的字符串形式，再通过 `new Function` 将字符串变成可执行函数。在生成渲染函数的字符串的过程中，就用到了我们之前的定义的`_c`、`_v`，如下代码所示：

``` js
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
  // 生成 VNode 的可执行方法, 元素节点，用_c处理
  return `_c('${tag}', ${JSON.stringify(attrs)}, [${children}])`
}
```

 生成的渲染函数字符串如下图所示：
 <img :src="$withBase('/imgs/myvue/vue2-renderStr.png')" style="transform:scale(0.9);">

 最终生成的渲染函数如下图所示：
 <img :src="$withBase('/imgs/myvue/vue2-renderFn.png')" style="transform:scale(0.9);">
