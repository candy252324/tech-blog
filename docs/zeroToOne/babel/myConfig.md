# 实际使用

假如我们的目标浏览器是 IE10：

<img :src="$withBase('/imgs/zeroToOne/target-browser.png')" style="transform:scale(0.8)"/>

已知 IE10 不支持`includes`,`Promise` 和箭头函数：

<img :src="$withBase('/imgs/zeroToOne/ie10-not-support.png')"/>

假如有如下测试代码，现在我们的目标是通过配置 babel 使之能在 IE10 上正常运行。
```js
// 静态属性
if ([1, 2, 3].includes(3)) {
  console.log("include!")
}
// 箭头函数
const fn = () => { console.log("fn 执行") }
// Promise
const p = new Promise(() => {
  console.log(fn)
})
```

配置开始：

`yarn add babel-loader  @babel/core  @babel/preset-env -D`

>注：我这里安装的版本为：
`babel-loader`： 8.2.5，
`@babel/core`： 7.19.1，
`@babel/preset-env`： 7.19.1


添加 webpack 配置：
```js
// webpack.config.js
module.exports={
  module:{
    rules:[{
      test:/\.m?jsx?$/i,
      use:["babel-loader"]
    }]
  }
}
```
根目录添加`.babelrc`配置文件:
```json
// .babelrc
{
  "presets":[
    "@babel/preset-env"
  ]
}

```
以下是添加配置前后的打包结果对比，可以看到，`const`变成了`var`，箭头函数变成了普通函数，但是 api`Promise` 和 静态属性`includes`并没有变。
<img :src="$withBase('/imgs/zeroToOne/preset-before-after.png')"/>


