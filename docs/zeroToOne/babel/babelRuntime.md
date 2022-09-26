# ` @babel/runtime`

在使用 `@babel/preset-env` 提供的语法转换和 api 添加的功能时，难免会造成文件的体积增加以及api的全局污染。为了解决这类问题，引入了 runtime 的概念，runtime 的核心思想是以引入替换的方式来解决兼容性问题。

runtime包有三个：

- [`@babel/runtime`](https://www.babeljs.cn/docs/babel-runtime)

- [`@babel/runtime-corejs2`](https://babeljs.io/docs/en/babel-runtime-corejs2)

- `@babel/runtime-corejs3`

三个包都依赖`helpers`、`regenerator-runtime`模块来实现语法的替换，`helpers`中提供了一些语法模拟的函数，`regenerator-runtime`中实现了`async/await`语法的转换。

**注：只有在 `@babel/preset-env` 的帮助下，runtime 包的语法模拟替换功能才会发挥作用。**


三个包不同的区别是：

- `@babel/runtime` 只能处理语法替换，跟随 `@babel/preset-env` 安装。

- `@babel/runtime-corejs2` 相比较 `@babel/runtime` 增加了 `core-js@2` 来支持全局构造函数（如`Promise`）和静态方法（如`Array.from`）兼容。需要单独安装。

- `@babel/runtime-corejs3` 相比较 `@babel/runtime-corejs2` 支持了实例方法(如`[].flat()`)的兼容，同时还支持对ECMAScript 提案的 api 进行模拟。需要单独安装。

我们安装 `@babel/runtime-corejs2` 和 `@babel/runtime-corejs3`具体看一下区别：

`@babel/runtime-corejs2`依赖`core-js`，并从`core-js`中的 library 模块去加载对应的 runtime 代码。

<img :src="$withBase('/imgs/zeroToOne/runtime-corejs2.jpg')"/>

而 `@babel/runtime-corejs3`依赖`core-js-pure`，并从`core-js-pure` 去加载对应的 runtime 代码：

<img :src="$withBase('/imgs/zeroToOne/runtime-corejs3.jpg')"/>

> 之前讲过，`core-js/library` 和 `core-js-pure` 都是不污染全局的 runtime 模块。

此外，可以看到，`@babel/runtime-corejs3` 比 `@babel/runtime-corejs2` 多了一个 `/instance`目录，里面有约 40 多个实例方法的定义。

<img :src="$withBase('/imgs/zeroToOne/runtime-corejs3-instance.jpg')"/>


但是当我们使用这些 Api 或 实例方法的时候，总不能自己一个一个手动导入，这时候就需要`@babel/plugin-transform-runtime`了。





