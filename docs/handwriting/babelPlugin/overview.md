# 概述

babel 的工作流程是：

- **解析**：使用 [`@babel/parser`](https://babeljs.io/docs/en/babel-parser) 解析器进行语法解析，获得 AST
- **转换**：然后使用 [`@babel/traverse`](https://babeljs.io/docs/en/babel-traverse) 对 AST 进行遍历和更新

  > babel 插件就是在转换这一步被调用的，本质就是返回一个符合 babel 插件规范的对象，其中最核心的是对象中的 visitor 属性。

- **生成**：最后使用 [`@babel/generator`](https://babeljs.io/docs/en/babel-generator) 将处理后的 AST 转换回正常代码。

> 参考文章 [babel 插件手册](https://github.com/jamiebuilds/babel-handbook/blob/master/translations/zh-Hans/plugin-handbook.md#toc-asts)

Visitors（访问者）

这是一个简单的访问者，把它用于遍历中时，每当在树中遇见一个 Identifier 的时候会调用 Identifier() 方法。
所以在下面的代码中 Identifier() 方法会被调用四次（包括 square 在内，总共有四个 Identifier）。).

这些调用都发生在进入节点时，不过有时候我们也可以在退出时调用访问者方法。.

```js
const MyVisitor = {
  Identifier() {
    console.log("Called!");
  },
};
```

这些调用都发生在进入节点时，不过有时候我们也可以在退出时调用访问者方法。.,向下遍历这棵树我们进入每个节点，向上遍历回去时我们退出每个节点。

```js
const MyVisitor = {
  Identifier: {
    enter() {
      console.log("Entered!");
    },
    exit() {
      console.log("Exited!");
    },
  },
};
```

```js
/** 求和函数 */
function sum(a, b) {
  return a + b;
}
//
var sum1 = sum(100, 1);
```
