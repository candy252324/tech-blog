# babel 插件的格式

babel 插件的格式是这样的
```js
module.exports=()=>{
  return {
    visitor: {
      // Identifier(node) {
      //   console.log(node.type)
      // },
    },
  }
}
```
Visitors 是访问者模式，遍历 AST 树时，每当遇见一个 `Identifier` 的时候就会调用 `Identifier()` 方法。

在下面的代码中，`FunctionDeclaration()` 将被调用 1 次，`Identifier()` 将被调用 5 次。
```js
// 1 个 FunctionDeclaration，5 个 Identifier
function sum(a, b) {
  return a + b
}
```
```js
module.exports=()=>{
  return {
    visitor: {
      FunctionDeclaration(node) {
        console.log('Called!',node.type)  // 调用 1 次
      },
      Identifier(node) {
        console.log('Called!',node.type)  // 调用 5 次
      },
    },
  }
}
```

这些调用都发生在进入节点时，不过有时候我们需要在退出时调用访问者方法。

```js
const MyVisitor = {
  Identifier: {
    // 进入节点
    enter() {
      console.log("Entered!");
    },
    // 离开节点
    exit() {
      console.log("Exited!");
    },
  },
};
```