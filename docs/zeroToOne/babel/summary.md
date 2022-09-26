# 总结

目前，babel 处理兼容性问题有两种方案：

## 方案 1：`polyfill`方案

支持 **按需加载** 和 **全量加载**，核心包是 `core-js`

1. 按需加载完整配置过程如下：

`yarn add @babel/preset-env core-js -D`

```js
// .babelrc
{
  "presets": [
    [
      "@babel/preset-env",
      {
        "useBuiltIns": "usage",   
        "corejs": 3    
      }
    ]
  ]
}
```

2. 全量加载完整配置过程如下：

`yarn add @babel/preset-env core-js -D`

```js
// .babelrc
{
  "presets": [
    [
      "@babel/preset-env",
      {
        "useBuiltIns": "entry",   
        "corejs": 3    
      }
    ]
  ]
}
```

打包入口文件处引入以下两个包：
```js
// index.js
import "core-js/stable";  
import "regenerator-runtime/runtime";  
```


## 方案 2：`runtime`方案

该方案只支持按需加载，核心包是`core-js-pure`。

完整配置过程如下：

`yarn add @babel/preset-env @babel/runtime-corejs3 @babel/plugin-transform-runtime -D`

```js
// .babelrc
{
  "presets": [
    [
      "@babel/preset-env",
    ]
  ],
  "plugins": [
    [
      "@babel/plugin-transform-runtime",
      {
        "corejs": 3
      }
    ]
  ]
}
```

## 优缺点对比

- `polyfill`方案

缺点：很明显的缺点就是会造成全局污染，而且会注入冗余的工具代码；

优点：可以根据浏览器对新特性的支持度来**选择性**的进行兼容性处理；

- `runtime`方案

优点：虽然解决了`polyfill`方案的那些缺点

缺点：不能根据浏览器对新特性的支持度来选择性的进行兼容性处理，也就是说只要在代码中识别到的 api，并且该 api 也存在`core-js-pure`包中，就会自动替换，这样一来就会造成一些不必要的转换，从而增加代码体积。

所以，`polyfill`方案比较适合单独运行的业务项目，如果是想开发一些供别人使用的第三方工具库，建议使用`runtime`方案来处理兼容性方案，以免影响使用者的运行环境。
