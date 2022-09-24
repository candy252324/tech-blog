# .less/.sass
 
如果项目使用 less： `yarn add less less-loader`

如果项目使用 sass： `yarn add sass sass-loader`

- `less-loader` 将 less 处理成 css
- `sass-loader` 将 sass 处理成 css

其它配置和处理 css 的一样，配置完就可以写 less 语法了。

```js
// webpack.config.js
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
## `lessOptions.globalVars`

但是光这样配置还不够，如果我们想使用 less 的变量，需要在每个文件里`@import "./var.less";`，无疑非常麻烦。

可以通过配置 `lessOptions.globalVars` 解决。

- `globalVars`：将样式变量注入到全局，相当于在每个文件的**顶部**引入变量

```js
// webpack.config.js
module.exports = {
  ...
  module: {
    rules: [
       {
        test: /\.less$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader", {
          loader: "less-loader", 
          options: {
            lessOptions: {
              // 写法 1
              globalVars: {
                hack: `true; @import "@/style/var.less";`,
              }
              // 写法 2
              // globalVars: require("../src/style/var")
            }
          }
        }],
      },
    ]
  }
}
```

如果变量文件是`.less` 的，使用写法 1 `@import`的方式导入，当然变量文件也可以是如下`.js`格式的, 使用写法 2 `require`的方式导入。
```js
// var.js
module.exports = {
  "@primary-color": "orange",
  "@error-color": "#ff3333",
  "@success-color": "#00cc33",
  "@warning-color": "#ff9900",
}
```


## `lessOptions.modifyVars`

- `modifyVars`：覆盖变量值，相当于在每个文件的**底部**引入变量

```js
// webpack.config.js
module.exports = {
  ...
  module: {
    rules: [
       {
        test: /\.less$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader", {
          loader: "less-loader", 
          options: {
            lessOptions: {
              globalVars: {
                hack: `true; @import "@/style/var.less";`,
              },
              // 项目中所有的 "@primary-color" 最终都将渲染为"pink"
              modifyVars: { "primary-color": "pink" }  
            }
          }
        }],
      },
    ]
  }
}
```

