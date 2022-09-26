# .tsx? 

如果项目使用 TypeScript 这一 JavaScript 超集，则建议使用[`@babel/preset-typescript`预设](https://www.babeljs.cn/docs/babel-preset-typescript)。

`yarn add @babel/preset-typescript -D`

它包含插件 `@babel/plugin-transform-typescript`。



增加 webpack 配置:
```js
module.exports = {
  ...
  module: {
    rules: [
       {
        test: /\.tsx?$/i,
        use: ["ts-loader"]
      },
    ]
  }
}
```

同时需要在根目录下添加 `tsconfig.json`，不然会报错。

`tsconfig.json` 文件中指定了用来编译这个项目的根文件和编译选项，如果一个目录下存在一个`tsconfig.json`文件，意味着这个目录是 TypeScript 项目的根目录。[tsconfig文档](https://www.tslang.cn/docs/handbook/tsconfig-json.html)


<!-- cjh todo 常见的 tsconfig 配置 -->

