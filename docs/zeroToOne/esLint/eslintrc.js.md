# 配置文件

ESLint 的[配置文件优先级](https://cn.eslint.org/docs/user-guide/configuring)是：

`.eslintrc.js` >`.eslintrc.yaml`>`.eslintrc.yml` >`.eslintrc.json` >`.eslintrc` >`package.json`

以下是常用配置。

## parserOptions

**ParserOptions 选项表示 EsLint 对于不同的 Parser（解析器）配置的语言检查规则。**

ESLint 默认使用[Espree](https://github.com/eslint/espree)作为 Parser 将代码转化为 AST。


- `ecmaVersion`：设置支持的 ECMAScript 版本。默认为 5 ，支持3、5、6、7、8、9 或 10 来指定你想要使用的 ECMAScript 版本，也可以使用年份，如：2015（同 6）。当然也可以使用 `latest` 表示最新的 ECMA 版本。
- `sourceType`：设置支持的模块规范，默认为 `script`。支持 `script` 和 `module` (ESM) 两种配置。
- `ecmaFeatures`： 它是一个对象，表示代码中可以使用的额外语言特性。

如下测试代码，不做任何配置的情况下，ESLint 检测会报错：
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

前面说了，ESLint 默认使用[Espree](https://github.com/eslint/espree)作为其解析器，但是 Espree 只能解析 js，如果我们要解析其它类型的文件，就需要指定其它的解析器。
>本质上所有的解析器最终都需要将代码转化为 espree 格式（AST 的某一种规范，本质上还是 AST）从而交给 Eslint 来检测。

- [@typescript-eslint/parser](https://github.com/typescript-eslint/typescript-eslint/blob/v3.0.1/docs/getting-started/linting/README.md)，这个解析器用于解析 ts。

`yarn add  @typescript-eslint/parser @typescript-eslint/eslint-plugin -D`

```js
module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
  ],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
  ],
};
```

- [vue-eslint-parser](https://github.com/vuejs/vue-eslint-parser)。
这个解析器能够解析 .vue 文件的 `<template>`  。如果在模板中使用复杂的指令和表达式，我们很容易在`<template>`上出错。使用该解析器配合[eslint-plugin-vue](https://github.com/vuejs/eslint-plugin-vue)的规则方便捕获错误。

该解析器的 `parserOptions`与 ESLint 的默认解析器 espree 支持的属性相同，不同的是它还支持配置`parserOptions.parser`来指定一个自定义分析器用于解析`<script>`标记。

我们可以这样用：

`yarn add vue-eslint-parser eslint-plugin-vue -D`

```js
module.exports = {
  parser: "vue-eslint-parser",  // 解析 <template> 标记
  parserOptions: {
    parser: "@typescript-eslint/parser",  // 解析 <script> 标记 
    sourceType: "module",
    vueFeatures: {
      filter: true,  // 是否解析vue2的filter，true:按vue2的filter解析  false:按vue3位操作符解析
    },
    ecmaFeatures: {
      jsx: true // 允许代码中使用 jsx
    }
  },
  extends: [
    "eslint:recommended",
    "plugin:vue/vue3-recommended",  // eslint-plugin-vue 提供的 rules 规则合集，可选值很多
    "plugin:@typescript-eslint/recommended"
  ],
  plugins: [
    "vue",  // 即 eslint-plugin-vue，用的时候省略前缀 eslint-plugin-
    "@typescript-eslint"
  ],
};
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

**插件用来扩展解析器的功能，插件是`eslint-plugin-`前缀的包，配置时无需加前缀。**

假如我现在自己写了一个 eslint 插件 `eslint-plugin-cxx`，里面有 n 条规则，其中一条叫`no-abcdefg`：

`yarn add eslint-plugin-cxx -D`

```js
// .eslintrc.js
module.exports={
  plugins: ['cxx'],
  rules:{
    "cxx/no-abcdefg":["error"]
  }
}
```

>注意：声明了 Plugin 仅表示我们引入了该规则对应的集合，并不代表会立即启动。需要手动在 rules 中声明对应插件的规则。


## extends

规则继承。如果我们每条 rules 都单个去配置（plugins + rules ），无疑是一件非常麻烦的事情。使用`extends`可以解决单个配置的烦恼。

比如 EsLint 官方提供了 `eslint:recommended`，当我们在配置文件中继承 `eslint:recommended` 时，相当于启用了一系列核心规则，这些规则被 EsLint 官方维护：

<img :src="$withBase('/imgs/zeroToOne/eslint-recommended.jpg')" style="transform:scale(0.9)"/>

**所以，所谓的规则继承，其实就是继承另一份 EsLint 的 rules 配置。**

写法：
- ESLint 官方的扩展，比如 `extends: ['eslint:recommended']`
- 从 ESLint 的插件进行继承，比如 `extends: ['plugin:vue/essential']` 是`eslint-plugin-vue`插件的扩展
- 从第三方的 NPM 包规则进行继承，比如 `extends : ['eslint-config-airbnb']`，配置时可以省略前缀 `eslint-config-`
- 从绝对路径继承而来，比如 `extends: ["./node_modules/coding-standard/eslintDefaults.js"]`


优先级：
如果 extends 配置的是一个数组，最终会将所有规则项进行合并，出现冲突的时候，后面的会覆盖前面的
通过 rules 单独配置的规则优先级比 extends 高。


## overrides

使用`overrides`可以实现对不同的文件进行不同的 Lint 配置。

```js
// .eslintrc.js
module.exports={
  plugins: ['cxx'],
  rules:{
    "no-abcdefg":["error"],
  }
  overrides:[
    {
      files: ['src/common/api/**'],
      rules: {
        'cxx/no-abcdefg': 'off',  // src/common/api 目录下文件关闭 no-abcdefg 规则
      }
    }
  ],
}
```

## rules

- "off" 或 0 表示关闭本条规则检测
- "warn" 或 1 表示开启规则检测，使用警告级别的错误：warn (不会导致程序退出)
- "error" 或 2 表示开启规则，使用错误级别的错误：error (当被触发的时候，程序会退出)

如果某项规则，有额外的选项，可以通过数组进行传递，数组的第一位必须是错误级别。
如 `rules:{'semi': ['error', 'never']`}, `never` 就是额外的配置项



