# require 和 import 区别

### 1. `require` 是运行时加载，`import` 是编译时加载

运行时加载的意思是只有运行到这行代码的时候，才会去加载。

以下 `require`的用法是 ok 的，因为`require` 是运行时加载，运行到 `require`命令的时候， `demoPath`已经有了结果。
```js
const demoPath="./demo.js"
require(demoPath)
```

以下 `import`的用法是错误的，因为`import` 是编译时加载，代码没运行，无法知道`demoPath`的运行结果。
```js
const demoPath="./demo.js"
import {demo} from demoPath 
```

假设 `demo.js`里只有一行打印，以下代码的执行顺序是先执行`demo.js`里的打印，再打印 "abc"。还是因为`import` 是编译时加载，`import`命令被提升到整个代码的头部。
```js
console.log("abc")
import {demo} from "./demo.js" 
```

### 2. 关于`import()函数`

import 函数是支持动态引入。以下代码是 ok 的，执行顺序是先打印 "abc"，再执行`demo.js`里的打印
```js
console.log("abc")
const demoPath="./demo.js"
import(demoPath).then(module => {
  // do something
})
```

### 3. import 支持按需引入

如下代码，希望按钮点击的时候动态引入文件。
```js
btn.onClick=()=>{
  // 写法1：demo.js 将打入主包
  require("./demo.js")
  // 写法2：demo.js 将打入主包
  import "./demo.js"
  // 写法3：demo.js 将单独打包成一个文件
  import("./demo.js")
}
```

在使用 webpack 打包的时候，不做特殊处理的话，写法 1 和 写法 2 都将把 `demo.js`打入主包，只有写法 3 能实现按需引入 —— 即点击按钮的时候，控制台才发起请求，去请求打包后的 demo.js 文件。


