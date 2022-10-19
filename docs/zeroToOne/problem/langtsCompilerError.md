# .vue中使用lang='ts'打包出错

`.vue` 文件中的 `<script>`标签添加`lang='ts'`后，打包失败，以下报错信息。

<img :src="$withBase('/imgs/zeroToOne/problem-langts-build-error.jpg')">

<!-- cjh  todo vue-loader 最后把文件处理成了什么格式 -->
可以看到报了语法错误，报错文件是`./src/components/box1-comp.vue?vue&type=template&id=30ae9d58&scoped=true&ts=true`，报错来源是 `@babel/parser`，猜测是 `.vue` 文件被 `vue-loader` 处理过后交给 `babel-loader`，但是 `babel-loader` 没有将其当做 ts 来处理。

**解决方法1：**

在网上搜索了一下处理方案，说是给`ts-loader`配置`appendTsSuffixTo: [/\.vue$/]`，作用是给`.vue`文件添加`.ts`后缀，使其变成`xxx.vue.ts`，再交给 `babel-loader`处理就 ok 了 ：
```js
// webpackconfig.js
module.exports={
  module:{
    rules:[
      {
        test: /\.vue$/i,
        use: ["vue-loader"]
      },
      {
        test: /\.tsx?$/i,
        use: ["babel-loader",
          {
            loader: "ts-loader",
            options: {
              appendTsSuffixTo: [/\.vue$/]  // 不加也行
            }
          }
        ]
      },
    ]
  }
}
```
试了一下这个配置，确实是 ok 的， 不过 `appendTsSuffixTo: [/\.vue$/]`似乎不是必须的，只要使用了 ts-loader 就行。

**解决方法2：**

由于本项目是用[`@babel/preset-typescript`](https://www.babeljs.cn/docs/babel-preset-typescript)处理 ts 的，不想再额外的安装一个 `ts-loader`（升级到 babel 7 后可以弃用`ts-loader`）。

可以通过给 `@babel/preset-typescript` 添加 `allExtensions:true` 参数来解决这个问题。

- **`allExtensions:true`将所有的扩展名的文件都按照 ts、tsx 或没有 jsx 歧义的 ts（取决于`isTSX`和`disallowAmbiguousJSXLike`选项）来解析**

添加如下配置后，`vue-loader` 处理过后的`.vue`文件交给 `babel-loader` 后，`@babel/preset-typescript` 会将其按照 ts 解析。

```json
// .babelrc
{
  "presets":[
    "@babel/preset-typescript",
    {
      "allExtensions": true,  // 增加这里
      // "isTSX": true,
    }
  ]
}
```
增加`allExtensions:true`后虽然解决了使用`lang='ts'`后产生的打包出错问题，但是又产生了一个新的问题：`.jsx`文件打包失败了。

<img :src="$withBase('/imgs/zeroToOne/problem-jsx-build-error.jpg')">

原因很容易想到，增加`allExtensions:true`后， `.jsx`文件也将被当做 ts 处理，`.jsx`里有尖括号，肯定会出错，我们需要增加 `isTSX:true` 参数。

-  **`isTSX:true`：强制开启 jsx 解析。否则，尖括号将被视为 typescript 的类型断言。另外，`isTSX: true` 需要 `allExtensions: true`。**

```json
// .babelrc
{
  "presets":[
    "@babel/preset-typescript",
    {
      "allExtensions": true, 
      "isTSX": true,   // 增加这里
    }
  ]
}
```

当然，如果我们的项目使用 ts ，自然不应当写 jsx，建议使用 tsx。



