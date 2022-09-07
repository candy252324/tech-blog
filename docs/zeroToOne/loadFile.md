# 资源处理

## css

如果我们在 src/index.js 中引入样式文件，发现无法打包成功，因为 webpack 无法处理这种类型的文件，这个时候我们就需要使用loader。

```diff
+ import "./style.css"
function component() {
  const element = document.createElement('div');
  element.innerHTML = "hello";
  return element;
}
document.body.appendChild(component());
```
首先安装依赖 `yarn add style-loader css-loader --save-dev`

- `css-loader` 用于将 .css 后缀的文件处理成 js
- `style-loader` 用于将处理后的 css 以 style 标签的方式插入 DOM 树中。

然后在 webpack.config.js 中增加 module 配置，重新打包就能看到新加的样式了。

```js
const path = require("path")

module.exports = {
  ...
  module: {
    rules: [
      {
        test: /\.css/i,
        use: ["style-loader", "css-loader"]
      }
    ]
  }
}
```
>loader 可以链式调用。链中的每个 loader 都将对资源进行转换。链会**逆序执行**，第一个 loader 将其结果（被转换后的资源）传递给下一个 loader，依此类推。

如果有兼容低版本浏览器的需求，可以再装个`postcss`

- `postcss` 是一个使用 js 插件来转换样式的工具，类似 babel 对 js 的处理，常见功能如：补全前缀，px 转 rem，css 代码压缩等，需要配合插件使用。

现在结合`autoprefixer` 和 `postcss-px-to-viewport `插件来实现一下补全前缀 和 px 转 vw。

1. 安装依赖 `yarn add postcss-loader autoprefixer postcss-px-to-viewport --save-dev`
2. webpack.config.js  中添加 postcss-loader(放在最后面)

```js
module.exports = {
  ...
  module: {
    rules: [
      {
        test: /\.css/i,
        use: ["style-loader", "css-loader","postcss-loader"]
      }
    ]
  }
}
```
3. 项目根目录添加 postcss.config.js 配置文件（里面配置内容都只是示例，根据实际修改增减修改）
```js
// postcss.config.js
module.exports = {
  plugins: {
    "postcss-px-to-viewport": {
      viewportWidth: 375, // 视口宽
      viewportHeight: 667, // 视口高
      unitPrecision: 3, // 保留小数点位数
      viewportUnit: 'vw', // 转化成什么单位
      selectorBlackList: [], // 白名单（不需要做转化的)
    },
    "autoprefixer": {
      // 用于配置目标浏览器， 配了的话使用配置内容，没配的话使用 browserslist 配置
      overrideBrowserslist: [
        'ie>8'
      ]
    }
  }
}
```
重新打包后可以看到转化前后对比
<img :src="$withBase('/imgs/zeroToOne/autoprefixer.png')">





## 图片


## fonts 

