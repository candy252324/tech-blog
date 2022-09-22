# svg 的使用

## 直接使用
```html
<!-- 直接写在 html 里 -->
<svg>
  <path d="M32 18.451l-16-12.42-16 12.42v-5.064l16-12.42 16 12.42zM28 18v12h-8v-8h-8v8h-8v-12l12-9z"></path>
</svg>
```
如果直接使用的话，在 vue 中可以这样封装组件，首先，通过脚本把所有的 `.svg` 生成到一个js 文件中，格式如下：
```js
// svgData.js
export default {
  iconName1:`<svg><path>...<path/></svg>`，
  iconName2:`<svg><path>...<path/></svg>`，
}
```
然后组件 `props` 接收 iconName，使用 `v-html`渲染。


## symbol + use

首先把 svg 文件处理成如下格式插入到 dom 中，并设置隐藏
```html
<svg style="display:none">
  <symbol id="iconName1">
    <path>...</path>
  </symbol>
  <symbol id="iconName2">
    <path>...</path>
  </symbol>
</svg>
```
<img :src="$withBase('/imgs/mess/svg-symbol.png')"/>

用的时候使用`use`加上 icon 的 id 就好了，
```html
<svg>
  <use xlink:href="#iconName"></use>
</svg>
```
> 注：如果在一个 svg 里 `use` 两个图标，效果是两个图标会重叠起来。

## viewbox

画图理解一下 svg 标签属性上的 `width`、`height`和`viewbox`是如何影响 svg 图标的大小的。

首先用 svg 画一个长宽皆为 300 的正方形，并加上蓝色边框
```html
<svg width="300" height="300" style="border:1px solid blue"></svg>
```
效果如下图所示：

<img :src="$withBase('/imgs/mess/svg-viewbox1.png')"/>

然后在 svg 里画一个宽 200 高 100 的黄色矩形
```html
<svg width="300" height="300" style="border:1px solid blue">
  <rect x="10" y="20" width="200" height="100" fill="yellow"></rect>
</svg>
```
效果如下图所示，很明显，黄色矩形是以蓝色正方向的左上角为原点坐标进行绘制的。

<img :src="$withBase('/imgs/mess/svg-viewbox2.png')"/>


接下来，我们再给 svg 添加一个 `viewbox` 属性：`viewbox="180,60,80,80"`
```html
<svg width="300" height="300" style="border:1px solid blue" viewbox="180,60,80,80">
  <rect x="10" y="20" width="200" height="100" fill="yellow"></rect>
</svg>
```
加了`viewbox`后渲染结果变成了下图这样，黄色矩形看起来像是移动了位置，大小也变了。

<img :src="$withBase('/imgs/mess/svg-viewbox3.png')"/>

打开控制台，审查元素看一下这个黄色矩形，发现它的实际宽高变成了 750*375，相对于之前的 200 * 100，宽高比还是2：1，只是放大了3.75倍，然后超出蓝色正方形的部分被隐藏了。为啥会这样呢？

<img :src="$withBase('/imgs/mess/svg-viewbox4.png')"/>

我们画图来解释，蓝色框框是画布，红色框框是`viewbox`，`viewbox`定义的是画布上可以显示的区域。
由于当前设置的值是`viewbox="180,60,80,80"`，所以`viewbox`是个左上角坐标为（180,60），宽高都是 80 的正方形。`viewbox`将 80*80 这块区域里的图像（阴影部分）“裁剪”下来，然后缩放平铺到整个画布里。

由于画布的尺寸是 300 * 300，所以放大倍数是 300/80=3.75，这就是为什么之前审查元素的时候看到黄色矩形的宽高由 200 * 100 变成了 750 * 375。

比较形象的比喻是头像裁剪，`viewbox`就是那个裁剪框，裁剪完之后再平铺到之前的画布上。

<img :src="$withBase('/imgs/mess/svg-viewbox5.png')"/>














<!-- 接下来，我们再给 svg 添加一个 viewbox 属性
```html
 <svg width="300" height="300" style="border:1px solid blue" viewbox="150,80,90,20">
    <rect x="10" y="20" width="200" height="100" fill="yellow"></rect>
  </svg>
```

<img :src="$withBase('/imgs/mess/svg-viewbox3.png')"/> -->

