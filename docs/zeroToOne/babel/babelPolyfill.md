# `@babel/polyfill`

`@babel/polyfill`是一个运行时包，主要是通过核心依赖`core-js@2`来完成新的全局 Api 和实例属性的转换。

**但是在升级到`core-js@3`后（Babel 7.4.0），官方决定弃用`@babel/polyfill`**，原因是：如果还要保留`@babel/polyfill`的使用，就要在`@babel/polyfill`中添加`core-js@2`和`core-js@3`切换的选项，这样`@babel/polyfill`中将包含`core-js@2`和`core-js@3`两个包。



```js
// Babel 7.4.0 以前
import"@babel/polyfill";

// Babel 7.4.0 以后，@babel/polyfill已被弃用
// 改为`core-js/stable` 和 `regenerator-runtime/runtime`
import"core-js/stable";
import"regenerator-runtime/runtime";

```


`@babel/polyfill`的缺点:

- 1. 可能造成全局污染

`@babel/polyfill`是往全局对象上添加属性以及直接修改内置对象的 Prototype。比如说我们需要支持`String.prototype.include`，在引入 babelPolyfill 这个包之后，它会在全局String 的原型对象上添加 include 方法。

- 2. 会让不同的文件中包含重复的代码，增加编译后的体积

如下代码:
```js
const key = 'name'
const obj = {
  [key]: 'cxx',
}
```
编译后，代码中插入了`_defineProperty`函数，如果多个文件中使用了对象的属性名表达式，则会插入多个_defineProperty函数。
```js
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var key = 'name';

var obj = _defineProperty({}, key, 'cxx');
```

