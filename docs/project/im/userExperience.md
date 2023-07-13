# 前端交互相关

## 键盘弹起，页面上推

如下图，键盘弹起或者选择图片面板出现，需要将页面整体上推。

uview组件库的[input组件](https://www.uviewui.com/components/input.html) 有一个 `adjustPosition` 属性用于设置键盘弹起时自动上推页面。但是它会导致顶部导航栏也被推上去（我们是自定义导航栏，uni 默认的导航栏不知道会不会被推上去）。

解决方法：监听键盘弹起事件，动态计算键盘高度，给容器设置对应高度的 padding，让键盘浮在这块空白区域上。

<img :src="$withBase('/imgs/im/chat-panel-open.jpg')" style="transform:scale(0.8);">

## 长按消息的 tooltip

如下图：tooltip 出现的位置与元素的位置和尺寸有关，还与消息类型有关(引用消息的tooltip出现在回复的内容区域上而非整条消息上)。没有找到合适的现成组件。

解决方法: 获取目标元素（长按元素或长按元素的子元素）的尺寸和位置信息，动态计算 tooltip 的位置和 tooltip 小尖尖的位置。
<img :src="$withBase('/imgs/im/tooltip.png')" style="transform:scale(0.9);">

## 页面自动滚动到底部

以下场景需要自动将页面滚动到底部：
1. 页面首次进来
2. 键盘弹起或选择图片面板弹起
3. 点击 tooltip 上的回复（其实就是2）
4. 别人给我发消息，如果页面滚动高度不足一屏，需要自动将页面滚动到底部（页面滚动高度大于一屏，认为用户是在查看历史消息，不需要滚动到底）
5. 自己给自己发消息，无论页面滚动高度是否大于一屏，都需要将页面滚动到底部

## 丝滑的向上滚动加载

如下图：滚动到顶的时候，loading 出现，往列表前面 `unshift` n 条数据，由于页面有保持原有滚动高度的特性，所以会自动滚动到顶部，但是我们期望的是页面停留在用户之前的阅读位置。

并不好的解决方法：数据 `unshift` 完，再让页面滚回用户之前的阅读位置。效果是有明显的页面抖动感。

暂时没有好的解决方案。

<img :src="$withBase('/imgs/im/loadingmore.jpg')" style="transform:scale(0.8);">

## 图片的展示

方便处理，直接固定了图片宽度，右侧好看的为微信效果。

<img :src="$withBase('/imgs/im/picture-display.png')" style="transform:scale(0.8);">

## 消息发送按钮

没有做机型判断，消息发送按钮恒展示，所以在 ios 会看到两个发送按钮。

冷知识：安卓右下角是换行键，所以安卓发消息的时候可以换行，但是ios不行。

<img :src="$withBase('/imgs/im/send-btn.jpg')" style="transform:scale(0.9);"> 

## 长按部分选中

没做，uni 没有相关的 api。

