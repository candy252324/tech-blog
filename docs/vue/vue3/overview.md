# 整体思路

vue2 和 vue3 的区别：

monorepo 不支持 npm，所以项目初始化使用 yarn init -y

packages/reactive  
packages/shared

```json
{
  "private": true,
  "workspaces": ["packages/*"]
}
```

所有包都依赖的东西放到外面的 package.json,需要添加 -W 参数
`yarn add typescript -D -W`

npx tsc --init 自动生成 tsconfig.json 配置

最外层安装 rollup 等

devDependencies":
"@rollup/plugin-json":"4.1.0",
"@rollup/plugin-node-resolve":"13.0.4",
"execa":"^5.1.1", // 多进程打包
"ro11up":"2.56.3",
"rollup-plugin-typescript2":"0.30.0",
"typescript":"^4.4.2"

reactive package.json 中添加自定义配置项 buildoptions，同理 shared

```json
{
  "name": "@vue/reactivity",
  "version": "1.0.0",
  "main": "index.js",
  "license": "MIT",
  "buildoptions": {
    "name": "VueReactivtiy", // vueShared
    "formats": [
      "esm-bundler",
      "cjs",
      "global" // vueshared 不需要
    ]
  }
}
```

添加文件 /scripts/build.js
添加 scripts 命令: build:node scripts/build.js

build.js 脚本中遍历 packages 文件夹，对里面的每一个文件使用 execa 打包（使用 rollup）

<!-- 只有 json5 中才能写注释 -->

rollup.config.js

```js

```
