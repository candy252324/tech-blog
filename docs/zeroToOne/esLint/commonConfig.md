# 常用配置项说明


为了方便学习，先删除之前通过 `eslint --init` 生成的配置：


```js
// .eslintrc.js
module.exports = {}
```



## parserOptions

**ParserOptions 选项表示 EsLint 对于不同的 Parser（解析器）配置的语言检查规则。**

- `ecmaVersion`：设置支持的 ECMAScript 版本。默认为 5 ，支持3、5、6、7、8、9 或 10 来指定你想要使用的 ECMAScript 版本，也可以使用年份，如：2015（同 6）。当然也可以使用 `latest` 表示最新的 ECMA 版本。
- `sourceType`：设置支持的模块规范，默认为 `script`。支持 `script` 和 `module` (ESM) 两种配置。
- `ecmaFeatures`： 它是一个对象，表示代码中可以使用的额外语言特性。

如下测试代码，不做任何配置的情况下，如下代码 ESLint 检测会报错：
```js
import "xxx.xx" // Parsing error: The keyword 'import' is reserved
const a=100     // Parsing error: The keyword 'const' is reserved

const jsxComp = () => {
  return () => <div>jsx组件</div>;    // Parsing error: Unexpected token <
};

```
增加以下配置后正常：
```js
// .eslintrc.js
module.exports = {
  parserOptions: {
    ecmaVersion:'latest',  // 指定 EsLint 支持最新的 ECMA 语法检测
    sourceType: 'module',  // 设置支持的模块规范为 ES Module
    ecmaFeatures: {
      jsx: true // 允许代码中使用 jsx
    }
  }
}
```

这个时候添加一条 rules，`no-undef` ：
```js
module.exports={
  rules:{
    'no-undef':['error'] // 禁止使用未定义的变量
  }
}
```
然后在测试代码里加一行，发现又报错了，`Promise`标红了：
```js
new Promise((resolve, reject) => {   // error  'Promise' is not defined
  //
})
```

这是为啥呢？

因为`parserOptions` 中的 `ecmaScript` 为 6 或者更高版本时，仅表示 Lint 在检查时支持一些高版本的**语法**，比如 let、const、箭头函数等等，但是并不支持新的 Api（如 `Promise`,`Set`）。

如何支持新的 Api？可以通过配置 `env.es6` 为 true，后面讲。


## parser

ESLint 根据配置的解析器转化成为 AST 抽象语法树，默认使用[Espree](https://github.com/eslint/espree)作为其解析器，当然我们也可以在配置文件中指定一个不同的解析器。本质上，所有的解析器最终都需要将代码转化为 espree 格式从而交给 Eslint 来检测。

我们添加一条 rules，禁止声明未使用的变量。
```js
// .eslintrc.js
module.exports = {
  rules: {
      'no-unused-vars': ['error'],    // 禁止声明未使用的变量
  }
}
```
然后在 ts 中定义了变量但是未使用， ESLint 却没有报错：
```ts
// test.ts
const a:number=100
```
这是因为 parser 默认使用的是 Espree，它并不支持 typescript 语法的检查，要支持 ts 语法的检查需要使用额外的 ts 解析器。

- 安装依赖：`yarn add @typescript-eslint/parser -D`

`@typescript-eslint/parser` 能将 TypeScript 转换成与 espree 兼容的 AST 形式，以便在ESLint中使用

- 添加配置：
```js
// .eslintrc.js
module.exports = {
  parser: "@typescript-eslint/parser",  //  修改解析器为 @typescript-eslint/parser
}
```



## env


指定 env 配置来告诉 ESLint 当前项目支持的运行环境，从而可以使用当前环境下相关的全局变量。

开启了 `rules : {'no-undef': ['error']}`的情况下，以下代码将报错：
```js
console.log(123)  // error  'console' is not defined 
console.log(window)   // error  'console' is not defined,  error  'window' is not defined
console.log(process)  // error  'console' is not defined,  error  'process' is not defined
```

添加以下配置后正常：

```js
// .eslintrc.js
modules.exports={
  env:{
    browser: true,
    node: true
  }
}
```
env 配置项支持非常多的选项
- `browser`： 支持浏览器环境，表示支持浏览器环境下的相关全局变量。比如 window、document 等等
- `node`： 支持 NodeJs 环境，可以使用 Node 环境下的全局变量。比如 process、global、require 等等
- `shared-node-browser`： 表示可以使用 Node 环境和浏览器环境下同时存在的全局变量，比如 console 相关。
- `es6`： 启用除了 modules 以外的所有 ECMAScript 6 特性（该选项会自动设置 ecmaVersion 解析器选项为 6）
- `mocha`：添加所有的 Mocha 测试全局变量
- 还有很多，[看这里](https://cn.eslint.org/docs/user-guide/configuring#specifying-environments)：


这里注意到，之前讲过 `parserOptions` 也可以通过配置 `parserOptions : { ecmaVersion : 6 }` 来设置支持的 ECMAScript 版本，那么它和 `env: {es6:true}`有什么区别呢？

- `parserOptions : { ecmaVersion : 6 }`：仅支持新的语法，不支持新的 Api。

- `env: {es6:true}`：支持新的语法和 Api，开启 `env: {es6:true}`，等同于设置了`parserOptions : { ecmaVersion : 6 }`，无需重复设置。



## globals

之前讲到，我们可以配置 env 来告诉 ESLint 当前项目支持的运行环境，从而可以使用当前环境下相关的全局变量。

那么，如果我们定义了一些特殊的全局变量。那么我们应该如何告诉 EsLint 呢？

添加 `globals` 配置：
>注：如果需要配置禁止对全局变量进行修改，需要启用[no-global-assign](http://eslint.cn/docs/rules/no-global-assign)规则。
```js
// .eslintrc.js
module.exports={
  globals:{
    aaa: 'readonly',
    bbb: 'writable'
  },
  rules:{
    'no-undef': ['error'],
    'no-global-assign': ['error']  // 禁止对只读的全局变量进行修改
  }
}
```

<!-- cjh todo -->
<!-- 这里设置readonly并没有生效，仍然可以重新赋值 -->

## plugins

EsLint 默认提供了一系列内置的 Rules 规则给我们进行配置，可以在`/node_modules/eslint/lib/rules`目录下看到所有这些内置的 Rules：

<img :src="$withBase('/imgs/zeroToOne/eslint-rules-builtIn.jpg')"/>

但是有时候这些内置的规则并不能满足我们的需求，这种情况下就需要使用 `plugins` 对规则做一些拓展。

假如我现在自己写了一个 eslint 插件 `@cxx-eslint-plugin`，里面有 n 条规则，其中一条叫`no-abcdefg`：

`yarn add @cxx-eslint-plugin -D`

```js
// .eslintrc.js
module.exports={
  plugins: ['@cxx-eslint-plugin'],
  rules:{
    "no-abcdefg":["error"]
  }
}
```

>注意：声明了 Plugin 仅表示我们引入了该规则对应的集合，并不代表会立即启动。需要手动在 rules 中声明对应插件的规则。


## extends

`extends`顾名思义“继承”的意思，可以理解为一些通用配置的合集。如果我们每条 rules 都单个去配置，无疑是一件非常麻烦的事情。使用`extends`可以解决单个配置的烦恼。

比如 EsLint 官方提供了 `eslint:recommended`，当我们在配置文件中继承 `eslint:recommended` 时，相当于启用了一系列核心规则，这些规则被 EsLint 官方维护：

<img :src="$withBase('/imgs/zeroToOne/eslint-recommended.jpg')" style="transform:scale(0.9)"/>

配置 `eslint:recommended` 后，即使没有配置任何 plugins 和 rules，如果我们定义了变量却未使用，eslint 也会报错`'xxx' is assigned a value but never used.`

```js
// .eslintrc.js
module.exports={
  extends: ["eslint:recommended"],
}
```

所谓的规则继承，其实就是继承另一份 EsLint 配置文件，上面的写法等价于下面 plugins + rules 的写法：

```js
// .eslintrc.js
module.exports={
  plugins: ['@cxx-eslint-plugin'],
  rules:{
    "no-abcdefg":["error"],
    // ...  省略很多规则声明
  }
}
```

## overrides

使用`overrides`可以实现对不同的文件进行不同的 Lint 配置。

```js
// .eslintrc.js
module.exports={
  plugins: ['@cxx-eslint-plugin'],
  rules:{
    "no-abcdefg":["error"],
  }
  overrides:{
    files: ['src/common/api/**/*'],
    rules: {
      '@cxx-eslint-plugin/no-abcdefg': 'off',  // src/common/api 目录下文件关闭 no-abcdefg 规则
    },
  },
}
```

## rules

- "off" 或 0 表示关闭本条规则检测
- "warn" 或 1 表示开启规则检测，使用警告级别的错误：warn (不会导致程序退出)
- "error" 或 2 表示开启规则，使用错误级别的错误：error (当被触发的时候，程序会退出)



