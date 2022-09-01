# v-model 原理

vue1中，凡是有数据引用的地方，就会 `new Watcher` ，同时在节点上添加事件，在事件的回调函数中给 this.$data 赋值。

当数据发生变化时，触发 setter => 然后触发 dep.notify => watchers.update => 在 watcher 的回调函数中更新 dom。

代码解释如下：
```js
// compiler
if (attrName.match(/v-model/)) {
  let tagName = node.tagName.toLowerCase()
  if (tagName === "input" && node.type === "text") {
    node.addEventListener("input", (e) => {
      this.$vm[exp] = e.target.value
    })
    new Watcher(() => {
      node.value = this.$vm[exp]
    })
  }
}
```