# Compiler

所谓的模板编译，就是遍历根节点，处理插值表达式`{{}}`, `v-bind`,`v-if`,`@click` 等语法。

实现原理大致是：遍历el元素的所有子节点，判断其节点类型——`nodeType`, 比如`nodeType`为 1 则表示是元素，则去遍历元素上面的所有属性和值，比如 `v-text=name`，则将元素的innerHtml替换为name的值。

编译过程中每遇到一个响应式数据就实例化一个 Watcher，Watcher的回调函数中通过访问this.xxx数据触发getter, 完成依赖收集。

这里只演示插值表达式`{{}}`, `v-text` , `v-html`,`v-model`,`v-on:click` 的处理。

``` js
import Watcher from './Watcher.mjs'
/** 模板编译 */
export default class Compiler {
  constructor(el, vm) {
    this.$vm = vm
    this.$el = document.querySelector(el)
    if (this.$el) {
      this.compile(this.$el)
    }
  }
  compile(el) {
    el.childNodes.forEach(node => {
      // 元素
      if (node.nodeType === 1) {
        this.compileElement(node)
      }
      // 是否插值表达式 {{ }}
      else if (node.nodeType === 3 && /\{\{.*?\}\}/.test(node.textContent)) {
        this.compileText(node)
      }
      if (node.hasChildNodes()) {
        this.compile(node)
      }
    })
  }
  // 渲染插值表达式,  "我的名字是{{name}},我的爱好是{{hobby}}" 
  compileText(node) {
    let nodeTextStr = node.textContent
    const matchArr = new Set(nodeTextStr.match(/\{\{.*?\}\}/g))  // ["{{name}}","{{hobby}}"] 
    matchArr.forEach(matchStr => {
      const cb = (originTextStr) => {
        matchArr.forEach(matchStr => {
          const exp = matchStr.replace(/\{/g, "").replace(/\}/g, "").trim()   // 取到插值里表达式： "name" or "hobby"
          const value = this.$vm[exp]  // 将"{{name}}" 替换成"name"的值
          originTextStr = originTextStr.replace(new RegExp(matchStr, "g"), typeof (value) === "object" ? JSON.stringify(value) : value)
        })
        node.textContent = originTextStr  // 所有的插值表达式都被替换了
      }
      // ！！！！注意：Watcher 的回调函数中必须要有 this.xxx 的数据读取操作，用于触发getter，收集依赖
      // cjh todo 这里有个依赖被重复收集的问题：
      // new Watcher写在forEach循环中，有n个插值表达式，则循环n次，产生n个watcher实例，到这没有问题
      // 但是cb函数中也需要通过forEach循环去遍历替换插值表达式，导致产生n次this.xxx的数据读取操作，触发n次getter,进而导致触发n次依赖收集
      // 如何优化？
      new Watcher(() => {
        cb(nodeTextStr)
      })
    })
  }
  // 编译元素
  compileElement(node) {
    let attrList = node.attributes
    Array.from(attrList).forEach(attr => {
      // v-text="name"
      const attrName = attr.name  //  v-text
      const exp = attr.value   //  name

      // <button v-on:click="foo"/>
      if (attrName.match(/v-on:click/) || attrName.match(/@click/)) {
        const fn = this.$vm.$options.methods[exp]
        node.addEventListener("click", () => {
          fn.apply(this.$vm)
        })
      }
      // <span v-bind:title="xxx"></span>
      else if (attrName.match(/v-bind:/)) {
        // cjh todo
      }
      // <input type="text" v-model="name">
      else if (attrName.match(/v-model/)) {
        let tagName = node.tagName.toLowerCase()
        if (tagName === "input" && node.type === "text") {
          node.addEventListener("input", (e) => {
            this.$vm[exp] = e.target.value
          })
          new Watcher(() => {
            node.value = this.$vm[exp]
          })
        } else if (tagName === "input" && node.type === "checkbox") {
          node.addEventListener("input", (e) => {
            this.$vm[exp] = e.target.checked
          })
          new Watcher(() => {
            node.checked = this.$vm[exp]
          })
        } else if (tagName === "select") {

        }

      }
      // <span v-text="name"></span>
      else if (attrName.match(/v-text/)) {
        new Watcher(() => {
          node.textContent = this.$vm[exp]
        })
      }
      // <span v-html="name"></span>
      else if (attrName.match(/v-html/)) {
        new Watcher(() => {
          node.innerHTML = this.$vm[exp]
        })
      }
    })
  }
}
```
