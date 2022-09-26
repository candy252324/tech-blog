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

```json
// .babelrc
{
  "presets":[
    ["@babel/preset-typescript"]
  ]
}

```
