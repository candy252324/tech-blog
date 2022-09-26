# [`@babel/preset-env`](https://www.babeljs.cn/docs/presets)

这是一个预设的插件集合，包含了一组相关的插件。

`@babel/preset-env` 主要依赖 `core-js` 来处理 api 的兼容性，在升级到 7.4.0 以上的版本以后，既支持`core-js@2`，也支持`core-js@3`，所以增加了 corejs 的配置来控制所需的版本。


`useBuiltIns` 是 babel7 的新功能，这个配置提供了三个选项告诉 babel 该如何引入 polyfill 包：

- `false`

默认值，这种情况下，`@babel/preset-env`只对语法进行转化（如箭头函数、`let`、`const`），不转化Api（如`Promise`，`Proxy`）和一些新的实例/静态方法（如`include`，`Array.from`），不会导入任何 polyfill 进来，并且 `corejs` 配置将无效，所以当然也就无需安装 `core-js`。


- `usage` 

代码中不用主动 import，babel 会自动将代码里已使用到的且 browserslist 环境不支持的 polyfill 导入，需要提前安装 `core-js`（`yarn add core-js -D`） 并设置 `corejs` 版本。

- `entry`

需要在代码运行之前导入，会将 browserslist 环境不支持的所有 polyfill 都导入，需要提前安装 `core-js` 并设置 `corejs` 版本。


> 另外，从 babel@7 开始，所有针对标准提案阶段的功能所编写的预设（stage preset）都已被弃用，官方已经移除了`@babel/preset-stage-x`。也就是说只能用来转换那些已经被正式纳入TC39中的语法，无法对那些还在提案中的语法进行处理，对于处在stage 中的语法，需要安装对应的 plugin 进行处理。


### 打包测试

接下来实际操作看一下不同`useBuiltIns`配置下打包结果有啥区别。

>在这之前，为了方便对比打包结果，将 webpack 的 sourceMap 打开 `devtool: "eval-cheap-source-map"`


以下测试代码：

```js
// index.js 
if ([1, 2, 3].includes(3)) {
  console.log("静态属性")
}
const fn = () => { console.log("箭头函数") }
const p = new Promise(() => {
  console.log(fn)
})
```


1.  `useBuiltIns:false` 打包测试
```json
// .babelrc
{
  "presets":[
    "@babel/preset-env"
  ]
}
```
输出如下，可以看到，`const` 变成了`var`，箭头函数变成了普通函数，但是 api `Promise` 和 静态属性`includes`并没有变，这肯定无法在我们的目标浏览器上运行。
```js
// dist/index.js 
if ([1, 2, 3].includes(3)) {
  console.log("静态属性");
}
var fn = function fn() {
  console.log("箭头函数");
};
var p = new Promise(function () {
  console.log(fn);
});
```

2.  `useBuiltIns:usage` + `corejs 3`打包测试

 <!--  cjh todo 配置成2为什么会报错 -->
```json
// .babelrc
{
  "presets": [
    [
      "@babel/preset-env",
      {
        "useBuiltIns": "usage",   
        "corejs": 3    
      }
    ]
  ]
}
```

输出如下，可以看到，按需引入了需要 polyfill 的包，此时已经可以在 IE 上运行了。
```js
// dist/index.js 
import "core-js/modules/es.array.includes.js";
import "core-js/modules/es.object.to-string.js";
import "core-js/modules/es.promise.js";

if ([1, 2, 3].includes(3)) {
  console.log("静态属性");
}
var fn = function fn() {
  console.log("箭头函数");
};
var p = new Promise(function () {
  console.log(fn);
});
```

3.  `useBuiltIns:entry` + `corejs 3`打包测试

```json
// .babelrc
{
  "presets": [
    [
      "@babel/preset-env",
      {
        "useBuiltIns": "entry",
        "corejs": 3
      }
    ]
  ]
}
```

index.js 头部引入这两个包：

>注：其中`regenerator-runtime`会在安装`@babel/preset-env`的时候自动安装，不需要手动安装
```js
// index.js
import "core-js/stable";  
import "regenerator-runtime/runtime"; 
```

输出如下，所有的 polyfill 的包都引进来了
```js
import "core-js/modules/es.symbol.js";
import "core-js/modules/es.symbol.description.js";
// ... 还有很多...
import "regenerator-runtime/runtime";

if ([1, 2, 3].includes(3)) {
  console.log("静态属性");
}
var fn = function fn() {
  console.log("箭头函数");
};
var p = new Promise(function () {
  console.log(fn);
});
```

我们注意到，不管是按需还是全量引入 polyfill 包，引入路径都是`import "core-js/modules/xxx"`，在 corejs 章节中讲过，这个是会污染全局的 polyfill 包。如何不污染全局？看后面的 runtime 章节。