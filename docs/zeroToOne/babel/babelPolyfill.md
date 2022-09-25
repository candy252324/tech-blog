# `@babel/polyfill`

`@babel/polyfill`是一个运行时包，主要是通过核心依赖`core-js@2`来完成新的全局 Api 和实例属性的转换。

**但是在升级到`core-js@3`后（Babel 7.4.0），官方决定弃用`@babel/polyfill`**，原因是：如果还要保留`@babel/polyfill`的使用，就要在`@babel/polyfill`中添加`core-js@2`和`core-js@3`切换的选项，这样`@babel/polyfill`中将包含`core-js@2`和`core-js@3`两个包。

基于以上，目前有两种配置方式来处理新 Api 和新的实例属性:

- **方式 1： 直接使用 `@babel/preset-env` 提供的处理 api 兼容性的能力**

 只需要开启`useBuiltIns` + 配置 corejs 版本即可（前面已有示例代码）。
 
 这种方案不需要安装`@babel/polyfill`，只需要安装core-js（regenerator-runtime会在安装`@babel/preset-env`的时候自动安装）。

 - **方式 2： 使用`@babel/polyfill`**
 
如果不依赖`@babel/preset-env`提供的处理api兼容性的能力，那就要使用`@babel/polyfill`来处理。如果使用了`core-js@3`，则需要做如下的替换工作：


```js
// Babel 7.4.0 以前
import"@babel/polyfill";

// Babel 7.4.0 以后，@babel/polyfill已被弃用
// 改为`core-js/stable` 和 `regenerator-runtime/runtime`
import"core-js/stable";
import"regenerator-runtime/runtime";

```


<!-- cjh todo -->
`@babel/polyfill`的缺点:

- 1. 可能造成全局污染

`@babel/polyfill`是往全局对象上添加属性以及直接修改内置对象的 Prototype。比如说我们需要支持`String.prototype.include`，在引入 babelPolyfill 这个包之后，它会在全局String 的原型对象上添加 include 方法。

- 2. 会让不同的文件中包含重复的代码，增加编译后的体积
