# 整体思路

vue2 和 vue3 的区别：

vue3 使用 monorepo 管理项目

<!-- cjh todo -->

待补充...

<!-- npx tsc --init 自动生成 tsconfig.json 配置

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
``` -->
