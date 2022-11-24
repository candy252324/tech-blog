# require 能加载的文件类型

如下 `.txt`后缀文件：

```js
// test.txt
function hello() {
  console.log('hello')
}
hello()
```

如果使用`node test.txt`去加载，结果是会报错还是打印 'hello'呢？

答案是打印 'hello'。为什么呢？

require 能加载的文件类型有 3 种，`.js`,`.json`,`.node`，针对这三种文件类型，require 有不同的处理方式：

- `.js`，如果是`.js`，必须以 `module.exports = abc` 或`export.abc = xxx`的方式导出模块
- `.json`，require 调用 `JSON.parse 解析`
- `.node`，`.node` 文件是 C++ 插件，实现原理是通过 `process.dlopen` 去打开插件，这个基本用不上

除这三种之外的文件，统一当做 js 文件处理。
