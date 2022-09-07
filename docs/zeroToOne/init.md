# 项目初始化

`npm init` 生成 package.json 文件

`yarn add webpack webpack-cli --save-dev` 安装 webpack 依赖

目录配置, 之后的构建相关内容都会放到 build 文件夹中
```
project-name
|- package.json
|- /build  
  |- build.js
  |- webpack.config.js
|- /src
  |- index.js
|- /node_modules
```
以下 build/build.js 内容
```js
const path = require("path")
const webpack = require("webpack")
const webpackOptions = require("./webpack.config")
webpack(webpackOptions)

```


以下 build/webpack.config 内容
```js
const path = require("path")
module.exports = {
  entry: path.resolve(process.cwd(), "src/index.js"),
  output: {
    filename: "main.js",
    path: path.resolve(process.cwd(), "dist")
  }
}
```

以下 src/index.js 内容
```js
function component() {
  const element = document.createElement('div');
  element.innerHTML = "hello";
  return element;
}
document.body.appendChild(component());
```

package.json 中配置一条打包命令

```json
"scripts": {
  "build": "webpack --config ./build/webpack.config.js"
},
```

然后命令行执行 `yarn build` 便可生成打包产物了。
