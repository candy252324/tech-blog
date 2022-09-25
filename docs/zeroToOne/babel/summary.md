# 总结

目前，babel处理兼容性问题有两种方案：

@babel/preset-env + corejs@3实现简单语法转换 + 复杂语法注入api替换 + 在全局和者构造函数静态属性、实例属性上添加api，支持全量加载和按需加载，我们简称polyfill方案；
@babel/preset-env + @babel/runtime-corejs3 + @babel/plugin-transform-runtime实现简单语法转换 + 引入替换复杂语法和api，只支持按需加载，我们简称runtime方案。

两种方案一个依赖核心包core-js，一个依赖核心包core-js-pure，两种方案各有优缺点：

polyfill方案很明显的缺点就是会造成全局污染，而且会注入冗余的工具代码；优点是可以根据浏览器对新特性的支持度来选择性的进行兼容性处理；
runtime方案虽然解决了polyfill方案的那些缺点，但是不能根据浏览器对新特性的支持度来选择性的进行兼容性处理，也就是说只要在代码中识别到的api，并且该api也存在core-js-pure包中，就会自动替换，这样一来就会造成一些不必要的转换，从而增加代码体积。

所以，polyfill方案比较适合单独运行的业务项目，如果你是想开发一些供别人使用的第三方工具库，则建议你使用runtime方案来处理兼容性方案，以免影响使用者的运行环境。
