# 环境变量

项目打包的时候需要根据环境来决定是否需要压缩，是否需要去除注释等等，所以需要有环境变量。

## 方法 1

打包命令中添加变量，webpack 配置 文件改成函数形式，最后导出json。
```json
// package.json
{
 "scripts": {
    "build": "webpack --config ./build/webpack.config.js --env production=true"
  }
}
```
```js
// webpack.config.js
module.exports = (arg) => {
  console.log(arg) // { WEBPACK_BUNDLE: true, WEBPACK_BUILD: true, production: 'true' }
  return {
    mode: arg.production ? "production" : "development",
  }
}
```


## 方法 2：使用 `cross-env`

`cross-env` 提供一个设置环境变量的scripts，让你能够以 unix 方式设置环境变量，然后在windows上也能兼容运行。

`yarn add cross-env -D`

```json
// package.json
{
 "scripts": {
    "build": "cross-env NODE_ENV=production webpack --config ./build/webpack.config.js",
    "build:dev": "cross-env NODE_ENV=development webpack --config ./build/webpack.config.js",
  }
}
```
webpack.config.js 文件中能直接拿到NODE_ENV变量，无需改成函数形式。
```js
// webpack.config.js
module.exports = {
  mode: process.env.NODE_ENV   // "production"
}
```

## 方法 3：DefinePlugin

以上两种方法配置的环境变量都只能在 node 环境中使用（通过 process 获取到），但是如果我想在页面上使用怎么办呢？

> DefinePlugin 允许在**编译时**将你代码中的变量替换为其他值或表达式。这在需要根据开发模式与生产模式进行不同的操作时，非常有用。例如，如果想在开发构建中进行日志记录，而不在生产构建中进行，就可以定义一个全局常量去判断是否记录日志。这就是 DefinePlugin 的发光之处，设置好它，就可以忘掉开发环境和生产环境的构建规则。

[DefinePlugin用法看这里](https://webpack.docschina.org/plugins/define-plugin#root)

基于使用 `cross-env` 的配置基础上添加如下配置:

根目录下添加配置文件目录 config，里面放一个开发环境配置 `development.json` 和一个 生产环境配置 `production.json`
```json
// config/development.json
{
  "NODE_ENV": "'development'",
  "NEED_TRACK": false
}
```

```json
// config/production.json
{
  "NODE_ENV": "'production'",
  "NEED_TRACK": true
}
```

`getConfigOptions`方法用于根据当前构建环境读取对应配置文件：
```js
const fs = require("fs")
const path = require("path")

exports.getConfigOptions = () => {
  const NODE_ENV = process.env.NODE_ENV
  const filePath = path.resolve(__dirname, `../config/${NODE_ENV}.json`)
  let fileData
  try {
    fileData = fs.readFileSync(filePath, "utf-8")
  } catch (error) {
    console.error("读取文件失败")
  }
  return JSON.parse(fileData)
}
```

```js
// webpack.config.js
const getConfigOptions = require("./utils").getConfigOptions
module.exports = {
  plugins: [
    new webpack.DefinePlugin({ ENVConfig: getConfigOptions() }),
  ]
}
```
配置完后，就可以在页面上通过`ENVConfig.xxx`的方式使用这些变量了。
