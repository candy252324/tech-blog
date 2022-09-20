# .less/.sass
 
如果项目使用 less： `yarn add less less-loader`

如果项目使用 sass： `yarn add sass sass-loader`

- `less-loader` 将 less 处理成 css
- `sass-loader` 将 sass 处理成 css

其它配置和处理 css 的一样，配置完就可以写 css 嵌套语法，样式变量等等了。

```js
module.exports = {
  ...
  module: {
    rules: [
       {
        test: /\.less$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader", "less-loader"],
      },
    ]
  }
}
```

