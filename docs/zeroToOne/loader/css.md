# .css


在项目中引入样式文件`import "./xxx.css"`，发现无法打包成功，需要添加处理 css 文件的 loader。

## 处理成 style 标签

`yarn add style-loader css-loader --save-dev`

- `css-loader` 用于将 .css 后缀的文件处理成 js
- `style-loader` 用于将处理后的 css 以 style 标签的方式插入 DOM 树中。



然后在 webpack.config.js 中增加 module 配置，重新打包就能看到样式内容以 `<style>`标签的形式插入到`<head>`中了。

```js
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

## 抽离样式文件

如果将所有的 css 都以 `<style>`标签的形式插入到 dom 中，`html`文件会很大，我们可以将 css 抽离出来。安装`mini-css-extract-plugin`， 这个插件的功能是抽离 css 样式。

`yarn add mini-css-extract-plugin -D`

同时我们不再需要`style-loader`了，把它移除掉：`yarn remove style-loader`

修改  webpack 配置：
<!-- cjh todo css 导出路径并未生效 -->
```js
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
module.exports = {
  ...
  plugins:[
     new MiniCssExtractPlugin({
      filename: 'static/css/[name].css',
      chunkFilename: 'static/css/[id].css',
      ignoreOrder: true,
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"]
      }
    ]
  }
}
```

## 样式兼容

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
        use: [MiniCssExtractPlugin.loader, "css-loader","postcss-loader"]
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









