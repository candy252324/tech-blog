# babel 的作用

babel是一个包含语法转换等诸多功能的工具链，通过这个工具链的使用可以使低版本的浏览器兼容最新的 javascript 语法。

- `@babel/core`

`@babel/core`是 babel 的核心库，所有的核心 Api 都在这个库里，这些 Api 供 `babel-loader` 调用

- `@babel/preset-env`

这是一个预设的插件集合，包含了一组相关的插件，Bable中是通过各种插件来指导如何进行代码转换。该插件包含所有es6转化为es5的翻译规则。

- `@babel/polyfill`

@babel/preset-env只是提供了语法转换的规则，但是它并不能弥补浏览器缺失的一些新的功能，如一些内置的方法和对象，如Promise,Array.from等，此时就需要polyfill来做js得垫片，弥补低版本浏览器缺失的这些新功能。

- `babel-loader`
以上@babel/core、@babel/preset-env 、@babel/polyfill其实都是在做es6的语法转换和弥补缺失的功能，但是当我们在使用webpack打包js时，webpack并不知道应该怎么去调用这些规则去编译js。这时就需要babel-loader了，它作为一个中间桥梁，通过调用babel/core中的api来告诉webpack要如何处理js

- `@babel/plugin-transform-runtime`
polyfill的垫片是在全局变量上挂载目标浏览器缺失的功能，因此在开发类库，第三方模块或者组件库时，就不能再使用babel-polyfill了，否则可能会造成全局污染，此时应该使用transform-runtime。transform-runtime的转换是非侵入性的，也就是它不会污染你的原有的方法。遇到需要转换的方法它会另起一个名字，否则会直接影响使用库的业务代码