# 输出路径配置

期望最后生成的 dist 文件目录结构如下，即所有的资源都放到 static 目录下
```
dist
|- index.html
|- main.js
|- /static
  |- /js
    |- a.js
    |- b.js
    |- c.js
  |- /css
    |- a.css
    |- b.css
  |- /img
    |- a.png
    |- b.jpg
```

修改 `output.chunkFilename`：
```js
module.exports = {
  output: {
    filename: "[name].js", // 主入口 js 文件名称，也可以写死成 main.js
    chunkFilename: "static/js/[name]-[id].js",  // 异步加载的模块名称
  },
}
```
`output.chunkFilename` ，这个配置影响的是异步加载的 js 模块名称，比如使用`import()`函数导入的模块（vue 中路由配置经常使用`import()`加载模块）。

这里文件名称配置成`[name]-[id].js`的格式，其中 `[name]` 是通过`/* webpackChunkName: "xxx" */`注释的形式手动设置的。

举个例子，如下代码，希望点击按钮的时候执行`loadCount`函数，从而动态加载一个文件：
```js
const loadCount = () => {
  import(/* webpackChunkName: "count" */ "./components/count.vue");
};
```

最终打包结果如下图所示，可以看到，除了主入口 main.js 之外，`dist/static/js`路径下还生成了`count-800.js`文件。

<img :src="$withBase('/imgs/zeroToOne/outputPath.png')" style="transform:scale(0.8)">


> `static/css`目录的生成是因为使用了`mini-css-extract-plugin`插件，这个插件会将 vue 里的 css 抽离。
`static/img`目录的生成是因为图片资源配置了`generator.filename`。这些在后面的 loader 章节中会讲。

点击按钮，触发`loadCount`函数执行，这个时候可以看到浏览器发起了两个请求：
<img :src="$withBase('/imgs/zeroToOne/outputPath2.png')" style="transform:scale(0.8)">




