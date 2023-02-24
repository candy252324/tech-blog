# icon 图标乱码问题

遇到一个 icon 偶发乱码的问题。

<img :src="$withBase('/imgs/mess/iconGarbledCode.jpg')" style="transform:scale(0.9);">

当时的场景是，基于 elementUi 做组件库二次开发，顺带打几套公司业务适用的主题，实际业务项目中通过类似于 `import '@xxx/xxx/blueTheme.css'` 的方式引入对应的主题 css 文件。

实现方式很简单，改变主题scss变量，然后使用 [dart-sass](https://www.npmjs.com/package/sass) 将全量的 `.scss` 编译成 `.css` 。


**出现乱码的原因是，使用 dart-sass 将 `.scss` 编译成 `.css` 时使用了压缩属性，导致 icon 伪元素的 content unicode 编码被转换成了对应 unicode 明文。**

如以下示例代码：

```scss
// test.scss
.el-icon-chicken:before{
  content:"\e6c3"
}
```

1. 使用 `dart-sass` 编译，带压缩参数，编译命令及结果如下：

`npx sass ./test.scss ./test.css --style compressed --no-source-map`
 ```css
 /* 压缩输出 test.css */
 .el-icon-chicken:before{content:""}
 ```

2. 还是使用 `dart-sass` 编译，但是不压缩，编译命令及结果如下：

`npx sass ./test.scss ./test.css  --no-source-map`
 ```css
 /* 不压缩输出 test.css */
 .el-icon-chicken:before {
  content: "\e6c3"; }
 ```

由上可以看到，`dart-dass` 带压缩参数的情况下，将`"\e6c3"`编译成了`""` , 但是不带压缩参数，就没有问题。

问题是我需要压缩啊，压缩可以减少很多体积。

**最后解决方法是，使用 `node-sass` 来编译就好了**，elementUi本来就是用 `node-sass` 编译的。
以下使用 `node-sass` 编译命令及编译结果:


  `npx node-sass ./test.scss --output-style=compressed ./test.css`
 ```css
 .el-icon-chicken:before{content:"\e6c3"}
 ```




