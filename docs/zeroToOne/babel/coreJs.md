# `core-js`

`core-js` 是JavaScript的模块化标准库，包括了新 api 的向后兼容实现，它和babel高度集成，是babel解决新特性在浏览器中兼容问题的核心依赖。

### `core-js@2`

`core-js@2` 被 `@babel/polyfill`、`@babel/preset-env` 和 `@babel/runtime-corejs2` 引入来进行新 api 的兼容处理，其中有两个核心的模块：

- `library`：不污染全局的`runtime`模块，供`@babel/runtime-corejs2`引入；

- `modules`：污染全局的`polyfill`模块，供`@babel/polyfill和@babel/preset-env`引入。

### `core-js@3`

`core-js@3` 放弃了对 `@babel/polyfill` 的支持，被 `@babel/preset-env`和`@babel/runtime-corejs3`引入来进行新 api 的兼容处理。其中两个核心的包分别是：

- `core-js`：污染全局的polyfill包，供 `@babel/preset-env`引入，等价于 `core-js@2/modules`（约500k, 40k minified and gzipped）；

- `core-js-pure`：不污染全局的 runtime 包，供 `@babel/runtime-corejs3` 引入，等价于 `core-js@2/library`（约440k）。