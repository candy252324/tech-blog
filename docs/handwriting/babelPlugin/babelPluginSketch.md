# babel 插件的格式

以下代码中，`transformFn` 就是一个 babel 插件，它其实就是一个具有指定属性（如：`visitor`）的对象：

```js
const babel=require("@babel/core")
const sourceCode="const a=()=>{}"

// transformFn 就是一个babel插件
var transformFn = {
  visitor: {
    ArrowFunctionExpression(path){  // path 是访问路径
      // todo
    },
  },
}
const result = babel.transform(sourceCode, {
  plugins: [transformFn],  
})
console.log(result.code)
```

Visitors 是访问者模式，遍历 AST 树时，每当遇见一个节点，该节点的方法就会被调用。

如下代码，`FunctionDeclaration()` 将被调用 1 次，`Identifier()` 将被调用 5 次。
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
      FunctionDeclaration(path) {
        console.log('Called!',path.type)  // 调用 1 次
      },
      Identifier(path) {
        console.log('Called!',path.type)  // 调用 5 次
      },
    },
  }
}
```

这些调用都发生在进入节点时，不过我们也可以在退出时调用访问者方法:

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