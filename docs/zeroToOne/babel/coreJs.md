# `core-js`

[`core-js`](https://github.com/zloirock/core-js) 是JavaScript的模块化标准库，包括了新 api 的向后兼容实现，它和babel高度集成，是babel解决新特性在浏览器中兼容问题的核心依赖。

目前`core-js`的版本是3.x，与`core-js@2`相比不仅在本身的架构上有重大调整，还对 babel 中的一些插件有重大影响。

### `core-js@2`

`core-js@2` 被 `@babel/polyfill`、`@babel/preset-env` 和 `@babel/runtime-corejs2` 引入来进行新 api 的兼容处理，其中有两个核心的模块：

- `modules`：污染全局的 `polyfill` 模块，供 `@babel/polyfill` 和 `@babel/preset-env` 引入。

- `library`：不污染全局的 `runtime` 模块，供 `@babel/runtime-corejs2` 引入；

`core-js@2` 分支已经冻结，不会再添加新特性，新特性都会添加到 `core-js@3`，为了可以使用更多的新特性，建议使用`core-js@3`。

### `core-js@3`

`core-js@3` 放弃了对 `@babel/polyfill` 的支持，被 `@babel/preset-env`和`@babel/runtime-corejs3`引入来进行新 api 的兼容处理。其中两个核心的包分别是：

- `core-js`：污染全局的 polyfill 包，供 `@babel/preset-env`引入，等价于 `core-js@2/modules`；

- `core-js-pure`：不污染全局的 runtime 包，供 `@babel/runtime-corejs3` 使用，在安装 `@babel/runtime-corejs3` 的时候自动安装，等价于 `core-js@2` 中的 `core-js/library`。