# 概述

babel 的工作流程是：

- **解析**：使用 [`@babel/parser`](https://babeljs.io/docs/en/babel-parser) 解析器进行语法解析，获得 AST
- **转换**：然后使用 [`@babel/traverse`](https://babeljs.io/docs/en/babel-traverse) 对 AST 进行遍历和更新

  babel 插件就是在转换这一步被调用的，本质就是返回一个符合 babel 插件规范的对象，其中最核心的是对象中的 visitor 属性。

- **生成**：最后使用 [`@babel/generator`](https://babeljs.io/docs/en/babel-generator) 将处理后的 AST 转换回正常代码。

参考文章 [babel 插件手册](https://github.com/jamiebuilds/babel-handbook/blob/master/translations/zh-Hans/plugin-handbook.md#toc-asts)

babel 自 6.0 起，就不再对代码进行 transform，现在只负责 parse 和 generate 过程，代码的 transform 过程全都交给一个个 plugin 去做。**所以在没有配置任何plugin的情况下，经过babel输出的代码是没有改变的**。

如下代码，不配置任何插件， 输出代码不会有任何变化：
```js
const babel=require("@babel/core")
// 需要转换的代码
const sourceCode = `
  const sum = (a, b) => {
    console.log(this)
    return a + b
  }
`
const result = babel.transform(sourceCode,{
  plugins:[]  // 不配置任何插件
})
console.log(result.code)  // 原样输出
```

如果我们添加箭头函数转化插件[@babel/plugin-transform-arrow-functions](https://www.npmjs.com/package/@babel/plugin-transform-arrow-functions)，
```js
const result = babel.transform(sourceCode,{
  plugins:['@babel/plugin-transform-arrow-functions']  // 添加插件
})
console.log(result.code)  // 转化输出
```
输出结果如下：
```js
var _this = this;
const sum = function (a, b) {
  console.log(_this);
  return a + b;
};
```
可以看到，箭头函数变成了普通函数，并且处理了this。

后面，我们将自己来实现这个箭头函数的转换插件。
