# 模板编译

所谓的模板编译，就是遍历根节点，处理插值表达式`{{}}`, `v-bind`,`v-if`,`@click` 等语法。
实现原理大致是：遍历el元素的所有子节点，判断其节点类型——`nodeType`, 比如`nodeType`为 1 则表示是元素，则去遍历元素上面的所有属性和值，比如 `v-text=name`，则将元素的innerHtml替换为name的值。

这里只演示插值表达式`{{}}`, `v-text` 和 `v-html` 的处理。

``` js
class MVue {
  constructor(options) {
    this.$options = options
    this.$data = this.$options.data
    this.$set = this.set
    new Observer(this.$data)  // 数据劫持
    this.proxyData(this.$data) // 代理
+   new Compiler(this.$options.el, this)  // 编译
  }
}
```

以下是Compiler类的定义:

``` js
/** 模板编译 */
class Compiler {
  constructor(el, vm) {
    this.$vm = vm
    this.$el = document.querySelector(el)
    if (this.$el) {
      this.compile(this.$el)
    }
  }
  compile(el) {
    // 遍历节点
    el.childNodes.forEach(node => {
      // 是否是元素
      if (this.isElement(node)) {
        this.compileElement(node)
      // 是否是文本
      } else if (this.isText(node)) {
        this.compileText(node)
      }
      if (node.hasChildNodes()) {
        this.compile(node)
      }
    })
  }
  // 处理插值表达式,  "我的名字是{{name}},我的爱好是{{hobby}}" 
  compileText(node) {
    let nodeTextStr = node.textContent
    const matchArr = new Set(nodeTextStr.match(/\{\{.*?\}\}/g))  // ["{{name}}","{{hobby}}"] 
    matchArr.forEach(matchStr => {
      const exp = matchStr.replace(/\{/g, "").replace(/\}/g, "")  // 取到插值里表达式： "name" or "hobby"
      nodeTextStr = nodeTextStr.replace(new RegExp(matchStr, "g"), this.$vm[exp]) // 将"{{name}}" 替换成"name"的值
    })
    node.textContent = nodeTextStr
  }
  // 编译元素
  compileElement(node) {
    let attrList = node.attributes // 元素属性列表
    Array.from(attrList).forEach(attr => {
      // m-text="name"
      const attrName = attr.name  //  "m-text"
      const exp = attr.value   //  name
      if (this.isDirective(attrName)) {
        const dir = attrName.slice(2)  // text
        this[dir] && this[dir](node, exp)
      }
    })
  }
  // 渲染v-text 
  text(node, exp) {
    node.textContent = this.$vm[exp]
  }
  // 渲染v-html
  html(node, exp) {
    node.innerHTML = this.$vm[exp]
  }
  // 判断是否是指令，如，m-text，m-html
  isDirective(attrName) {
    return attrName.indexOf("m-") === 0
  }
  // 是否是元素
  isElement(node) {
    return node.nodeType === 1
  }
  // 是否插值表达式{{}}
  isText(node) {
    return node.nodeType === 3 && /\{\{.*?\}\}/.test(node.textContent)
  }
}
```

以下是html:

``` html
<body>
  <script src="./MVue.js"></script>
  <div id="app">
    <h2>插值表达式：姓名{{name}}，爱好{{hobby}}</h2>
    <h2>
      m-text:<span m-text="name"></span>
    </h2>
    <h2 m-html="myHtml"></h2>
  </div>
  <script>
    const myvue = new MVue({
      el: "#app",
      data: {
        name: "cxx",
        myHtml: "<div style='color:red'>渲染v-html</div>",
        hobby: "swim"
      }
    })
  </script>
</body>
```


看，渲染出来啦！！！
<img :src="$withBase('/imgs/vue2/my-simple-vue/compiler.png')" style="transform:scale(0.6);">


