# 遇到的问题

## iife 打包模式没配置`output.name`

问题描述：`rollup` `iife`模式打包成功后，想在 html 里引入打包文件做一下测试，如下：

```html
<body>
  <script src="../reactivity/dist/VueReactivity.global.js"></script>
  <script>
    const { abc } = VueReactivity
  </script>
</body>
```

结果报错 `VueReactivity is not defined`，打开打包代码一看，发现里面只有一个立即执行函数，立即执行函数没有赋值给某个变量：

```js
// dist/VueReactivity.global.js
;(function (exports) {
  'use strict'
  const abc = 133
  exports.abc = abc
  Object.defineProperty(exports, '__esModule', { value: true })
  return exports
})({})
```

原因是没有配置`output.name`，添加`output.name`后，问题解决：

```js
// rollup.config.json
export default [
  {
    input: './packages/reactivity/src/index.ts',
    output: {
      name: 'VueReactivity', // 这里
      file: './packages/reactivity/dist/VueReactivity.global.js',
      format: 'iife',
    },
  },
]
```

新的打包产物：

```js
// dist/VueReactivity.global.js
var VueReactivity = (function (exports) {
  'use strict'
  const abc = 133
  exports.abc = abc
  Object.defineProperty(exports, '__esModule', { value: true })
  return exports
})({})
```
