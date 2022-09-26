# @babel/plugin-transform-runtime

`@babel/plugin-transform-runtime` 是为了方便`@babel/runtime`的使用。通过 ast 的分析，自动识别并替换代码中的新 api，解决手动 require 的麻烦。

`.babelrc`配置如下：
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

测试代码如下：
```js
// index.js
if ([1, 2, 3].includes(3)) {
  console.log("静态属性")
}
const fn = () => { console.log("箭头函数") }

const p = new Promise(() => {
  console.log(fn)
})

const key = 'name'
const obj = {
  [key]: 'cxx',
}
```

输出结果如下，可以看到，所有的语法都得到了转化：
```js
import _defineProperty from "@babel/runtime-corejs3/helpers/defineProperty";

var _context;

import _includesInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/includes";
import _Promise from "@babel/runtime-corejs3/core-js-stable/promise";

if (_includesInstanceProperty(_context = [1, 2, 3]).call(_context, 3)) {
  console.log("静态属性");
}

var fn = function fn() {
  console.log("箭头函数");
};

var p = new _Promise(function () {
  console.log(fn);
});
var key = 'name';

var obj = _defineProperty({}, key, 'cxx');
```

改成 `"corejs": 2`，输出结果如下，可以看到实例方法`includes`并没有被转换：
```js
import _defineProperty from "@babel/runtime-corejs2/helpers/defineProperty";
import _Promise from "@babel/runtime-corejs2/core-js/promise";

if ([1, 2, 3].includes(3)) {
  console.log("静态属性");
}

var fn = function fn() {
  console.log("箭头函数");
};

var p = new _Promise(function () {
  console.log(fn);
});
var key = 'name';

var obj = _defineProperty({}, key, 'cxx');
```



