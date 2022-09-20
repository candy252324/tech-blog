# 图片

css 中可能会混入图片，如下示例代码：
```js
import img from '../assets/example.png'
element.style.backgroundImage = `url('${img}')`
```
webpack 并不能识别，怎么办呢？

在 webpack 5 之前，通常使用：

- raw-loader 将文件导入为字符串
- url-loader 将文件作为 data URI 内联到 bundle 中
- file-loader 将文件发送到输出目录


在 webpack 5 中，可以使用内置模块[ Asset Modules](https://webpack.docschina.org/guides/asset-modules/)来处理，它允许使用资源文件（字体，图标等）而无需配置额外 loader。

增加 webpack rules 配置：
```js
module.exports = {
   module: {
    rules:[
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset',  // `type: 'asset'` 在导出一个 data URI 和发送一个单独的文件之间自动选择
        generator: {
          filename: 'static/img/[name]-[id][ext]',  // 配置图片资源输出路径
        },
      },
    ]
   }
}
```
type 一共有四个值：

- `type: 'asset/resource'` 图片被处理成地址字符串
```css
.box{
  background-image: url("file:///E:/own/holistic/dist/649a512a53dc9783c3a5.png")
}
```
- `type: 'asset/inline'`  图片被处理成 base64
```css
.box{
  background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKgA……LqTIgqd7t7etAtu6P/w/dWAxJfmsptgAAAABJRU5ErkJggg==")
}
```
- `type: 'asset/source'`  文档上说导出资源的源代码， 试了没啥反应？（cjh todo）
- `type: 'asset'` 在导出一个 data URI 和发送一个单独的文件之间自动选择

