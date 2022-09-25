# 换肤

## 方案 1：切 class

`document.querySelector('body').className = 'dark'`

需要写 n 份雷同的样式代码，难以维护

## 方案 2：替换 `<link>`标签上的 `href` 值

`link.href = 'light.css'`

同样，需要写 n 份雷同的样式代码，难以维护

## 方案 3：css3 var() 函数

定义全局变量：
```css
:root {
  --primary-color: blue;
  --main-padding: 8px;
}
```
>注：`:root`是 CSS 伪类，匹配文档树的根元素。除了优先级更高之外，与 html 选择器相同。

使用变量：
```css
.box{
  background: var(--primary-color);  
}
```
改变变量的值：
```js
/**
 * @param val  颜色值
 */
function changeTheme(val){
  document.body.style.setProperty("--primary-color", val);
}
```
这种方案缺点是兼容性不太好，ie 直接不支持。

但是有现成的插件来帮我们处理兼容性问题 —— [css-vars-ponyfill](https://www.npmjs.com/package/css-vars-ponyfill)


## 方案 4：使用插件

`yarn add webpack-theme-color-replacer -S`

插件原理：
- 接收一个颜色数组，这是需要被替换掉的颜色，比如这个数组是`["red","green"]`，webpack 构建时，在 emit 事件（准备写入dist结果文件时）中，将即将生成的所有 css 文件的内容中含有`red`和`green` 的 css 规则单独提取出来，并合成一个`theme-colors.css`输出文件。
- 然后在切换主题的时候，下载这个文件，把文件中所有的`red`和`green`替换成我们的目标颜色，比如我们的目标颜色是`["yellow","blue"]`，则是把所有的`red`替换成`yellow`，`green`替换成`blue`
- 最终把替换过后的文件以`<style/>`标签的形式插入到`<body>`标签的最末尾，这样就完成了换肤

以下是使用示例：

```js
// webpack.config.js
const ThemeColorReplacer = require('webpack-theme-color-replacer')
module.exports = {
  ...
  plugins: [
    new ThemeColorReplacer({
      matchColors: ["red","green"],  // 需要被替换的颜色
      fileName: 'static/css/theme-colors-[contenthash:8].css', //可选，输出文件路径，支持 [contenthash] 和 [hash]
      injectCss: false, // optional. Inject css text into js file, no need to download `theme-colors-xxx.css` any more.
      isJsUgly: process.env.NODE_ENV !== 'development', // optional. Set to `true` if your js is uglified. Default is set by process.env.NODE_ENV.
    }),
  ]
}
```
换肤函数：
```js
import client from "webpack-theme-color-replacer/client";
const changeTheme = () => {
  const options = {
    newColors: ["yellow","blue"]  // 目标颜色
  }
  return client.changer.changeColor(options).then(() => {
    console.log("换肤成功！")
  });
};
```
点击按钮，调用`changeTheme`函数，可以看到换肤效果：

<img :src="$withBase('/imgs/mess/change-theme-color1.png')"/>

下图是被提取出来的样式规则：

<img :src="$withBase('/imgs/mess/change-theme-color2.png')"/>

下图是被插入到页面的`<style/>`标签：

<img :src="$withBase('/imgs/mess/change-theme-color3.png')"/>


## ElementUi换肤实现的原理

和上面说的`webpack-theme-color-replacer`插件差不多，比如用户通过颜色选择器选择了一个红色，然后基于这个红色计算出一系列的红色`["深红","浅红","浅浅红"]`，去替换之前的`["深蓝","浅蓝","浅浅蓝"]`，很暴力，直接就是拿到 element 的那个`<style/>`标签进行字符串替换。


