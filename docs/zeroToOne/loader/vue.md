
# .vue

处理 vue 文件 需要同时用到 `vue-loader` 和 `vue-template-compiler`。

[官网文档](https://vue-loader.vuejs.org/zh/guide/#vue-cli)中有以下描述：

 <img :src="$withBase('/imgs/zeroToOne/vue-loader.png')">

 所以先安装这两个依赖：

 `yarn add vue-loader vue-template-compiler -D`

Vue Loader 的配置和其它的 loader 不太一样。除了通过一条规则将 vue-loader 应用到所有扩展名为 .vue 的文件上之外，还需要确保添加 Vue Loader 的插件 —— VueLoaderPlugin。

**这个插件是必须的！** 它的职责是将你定义过的其它规则复制并应用到 .vue 文件里相应语言的块。例如，如果你有一条匹配 `/\.js$/` 的规则，那么它会应用到 `.vue` 文件里的 `<script>` 块，如果你 css 配置了 postcss 用于添加前缀，那么这也将应用到 `.vue` 文件里的 `<style>` 块。

webpack 中新增如下配置就可以了：

```js
const { VueLoaderPlugin } = require("vue-loader")
module.exports = {
  ...
   module: {
    plugins: [
      new VueLoaderPlugin(), // 配合 vue-loader 使用
    ],
    rules:[
      ...
      {
        test: /\.vue$/i,
        use: ["vue-loader"]
      },
    ]
   }
}
```
