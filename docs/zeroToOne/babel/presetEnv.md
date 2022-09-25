# [`@babel/preset-env`](https://www.babeljs.cn/docs/presets)

这是一个预设的插件集合，包含了一组相关的插件。

默认情况下，`@babel/preset-env`只对语法进行转化（如箭头函数、`let`、`const`），不转化Api（如`Promise`，`Proxy`）和一些新的实例静态方法（如`include`，`Array.from`），除非将`useBuiltIns`设置为非 false。

`@babel/preset-env`主要依赖`core-js`来处理 api 的兼容性，在升级到 7.4.0 以上的版本以后，既支持`core-js@2`，也支持`core-js@3`，所以增加了 corejs 的配置来控制所需的版本。如果设置了`useBuiltIns`选项（不为false）就得设置 corejs 版本，否则 babel 将会发出警告。
```json
// .babelrc
{
  "presets": [
    [
      "@babel/preset-env",
      {
        "useBuiltIns": "usage",   // 也可配置成 entry，配置为 false 则不需要配置 corejs
        "corejs": 3      // 也可配置成 2
      }
    ]
  ]
}
```

`useBuiltIns` 是 babel7 的新功能，这个配置提供了三个选项告诉 babel 该如何引入 polyfill 包：

- `usage` ：代码中不用主动 import，babel 会自动将代码里已使用到的且 browserslist 环境不支持的 polyfill 导入
- `entry`：需要在代码运行之前导入，会将browserslist环境不支持的所有polyfill都导入。
- `false`：只做语法转换，不会导入任何 polyfill 进来，并且 corejs 配置将无效。

> 另外，从 babel@7 开始，所有针对标准提案阶段的功能所编写的预设（stage preset）都已被弃用，官方已经移除了`@babel/preset-stage-x`。也就是说只能用来转换那些已经被正式纳入TC39中的语法，无法对那些还在提案中的语法进行处理，对于处在stage 中的语法，需要安装对应的 plugin 进行处理