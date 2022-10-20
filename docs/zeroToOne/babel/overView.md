# 什么是 babel 

babel是一个包含语法转换等诸多功能的工具链，通过这个工具链的使用可以使低版本的浏览器兼容最新的 javascript 语法。

`yarn add babel-loader @babel/core -D`

```js
// webpack.config.js
module.exports={
  ...
  module:{
    rule:[
      {
        test:/\.m?jsx?$/i,
        use:["babel-loader"]
      }
    ]
  }
}
```

- `@babel/core`

`@babel/core`是 babel 的核心库，所有的核心 Api 都在这个库里，这些 Api 供 `babel-loader` 调用


- `babel-loader`

我们通过配置 babel 规则（preset 或者 polyfill）去做 es6 的语法转换，但是当我们在使用 webpack 打包 js 时，webpack 并不知道应该怎么去调用这些规则。这时就需要`babel-loader`了，它作为一个中间桥梁，通过调用`babel/core`中的 api 来告诉 webpack 要如何处理 js。


`bable-loader` ,`babel-core`,`preset`的关系可以用以下伪代码表示：
```js
const core = require('@babel/core');
function babelLoader(sourceCode, options) {
  // 通过transform方法编译传入的源代码
  core.transform(sourceCode, {
    presets: ['babel-preset-env'], //告诉 babel 以什么样的规则来转换代码
    plugins: [...]
  });
  return targetCode;
}
```


babel 运行总共分为三个阶段：**解析**、**转换**、**生成**。

babel 自 6.0 起，就不再对代码进行 transform，现在只负责 parse 和 generate 过程，代码的 transform 过程全都交给一个个 plugin 去做。**所以在没有配置任何plugin的情况下，经过babel输出的代码是没有改变的**。








