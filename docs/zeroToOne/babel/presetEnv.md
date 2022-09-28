# [`@babel/preset-env`](https://www.babeljs.cn/docs/presets)

这是一个预设的插件集合，包含了一组相关的插件。

`@babel/preset-env` 主要依赖 `core-js` 来处理 api 的兼容性，在升级到 7.4.0 以上的版本以后，既支持`core-js@2`，也支持`core-js@3`，所以增加了 corejs 的配置来控制所需的版本。


## 1. `useBuiltIns`
`useBuiltIns` 是 babel7 的新功能，这个配置提供了三个选项告诉 babel 该如何引入 polyfill 包：

- `false`

默认值，这种情况下，`@babel/preset-env`只对语法进行转化（如箭头函数、`let`、`const`），不转化Api（如`Promise`，`Proxy`）和一些新的实例/静态方法（如`include`，`Array.from`），不会导入任何 polyfill 进来，并且 `corejs` 配置将无效，所以当然也就无需安装 `core-js`。


- `usage` 

代码中不用主动 import，babel 会自动将代码里已使用到的且 browserslist 环境不支持的 polyfill 导入，需要提前安装 `core-js`（`yarn add core-js -D`） 并设置 `corejs` 版本。

- `entry`

需要在代码运行之前导入，会将 browserslist 环境不支持的所有 polyfill 都导入，需要提前安装 `core-js` 并设置 `corejs` 版本。




接下来实际操作看一下不同`useBuiltIns`配置下打包结果有啥区别。

1. 新建测试项目，安装依赖`yarn add @babel/core @babel/cli @babel/preset-env -D`

2. 运行 `npx babel index.js -o dist.js`查看打包输出：

以下测试代码：
```js
// index.js 
if ([1, 2, 3].includes(3)) {
  console.log("实例方法")
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
输出如下图所示，可以看到，`const` 变成了`var`，箭头函数变成了普通函数，但是 api `Promise` 和 实例方法`includes`并没有变。

<img :src="$withBase('/imgs/zeroToOne/presetEnv-useBuiltIns-false.jpg')" style="transform:scale(0.9)"/>

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

输出如下，可以看到，按需引入了 polyfill 的包。

<img :src="$withBase('/imgs/zeroToOne/presetEnv-useBuiltIns-usage.jpg')" style="transform:scale(0.9)"/>


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

输出如下，所有的 polyfill 包都引进来了：

<img :src="$withBase('/imgs/zeroToOne/presetEnv-useBuiltIns-entry.jpg')" style="transform:scale(0.9);"/>


## 2. `modules`

该项用来设置是否把ES6的模块化语法改成其它模块化语法。

取值可以是"amd"、"umd" 、 "systemjs" 、 "commonjs" 、"cjs" 、"auto" 、false。在不设置的时候，取默认值"auto"。

- `auto`：默认值，代码里的 `import` 都被转成 `require` 。
- `flase`：不对ES6模块化进行更改，还是使用`import`引入模块

在我们的测试代码里加一行 `import` ：

```js
// index.js
import { xxx } from "./xxxx"
```
同时修改 babel 配置，设置`"modules": false`,
```json
// babelrc.js
{
  "presets": [
    [
      "@babel/preset-env",
      {
        "modules": false,  // false，使用 import 导入模块
        "useBuiltIns": "usage",
        "corejs": 3
      }
    ]
  ]
}
```

 输出结果如下，可以看到我们新增的那行 `import`语句，同时，其他 polyfill 包引入方式也由之前的`require`变成`import`了。

<img :src="$withBase('/imgs/zeroToOne/presetEnv-modules-false.jpg')" style="transform:scale(0.9);"/>

 

## 3. `targets`

设置`@babel/preset-env`目标环境。可以是字符串、字符串数组或对象，不设置的时候取默认值空对象{}。

如果设置了`targets`，`@babel/preset-env`就使用`targets`设置的值加载目标环境缺失的 polyfill，否则就用`browserslist`的配置，如果两个都没设置，则`@babel/preset-env`会对代码中所有的 ES6 转 ES5（包括语法/api/实例方法）。

一般情况下，推荐使用`browserslist`的配置。


还是以之前的测试代码为例，修改 babelrc 配置，设置`"chrome": "58"`

```json
// .babelrc
{
  "presets": [
    [
      "@babel/preset-env",
      {
        "useBuiltIns": "usage",
        "corejs": 3,
        "targets": {
          "chrome": "58"
        }
      }
    ]
  ]
}
```

 输出结果如下，发现只引入了 Promise 的 polyfill 包。
 因为 `chrome:58`本来就支持箭头函数和`includes`，但是对 Promise 的支持不是很好（到 [caniuse](https://caniuse.com/?search=Promise.finally) 上查，发现 `chrome:58` 不支持 `promise.finally`）。


<img :src="$withBase('/imgs/zeroToOne/presetEnv-targets.jpg')" style="transform:scale(0.9);"/>



## 4. 其它

从 babel@7 开始，所有针对标准提案阶段的功能所编写的预设（stage preset）都已被弃用，官方已经移除了`@babel/preset-stage-x`。也就是说只能用来转换那些已经被正式纳入TC39中的语法，无法对那些还在提案中的语法进行处理，对于处在stage 中的语法，需要安装对应的 plugin 进行处理。
