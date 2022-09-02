# watcher和dep的关系

vue2 中，每个组件对应一个渲染 watcher，计算属性也有 watcher。

**注：还有用户自己定义的 watch 方法，这里没涉及。**

假设有如下代码：
```html
<div id="app">
  <div>{{name}}</div>
  <div>{{count}}</div>
  <div>{{doubleCount}}</div>
  <div>{{doubleCount}}</div>
</div>
```
```js
new Vue({
  data(){
    return{
      name:"cxx",
      count:1
    }
  },
  computed: {
    doubleCount() {
      return this.count * 2
    }
  }
})
```

以上代码只会生成一个 dep 实例，里面有两个 watcher ，第一个是根组件的渲染 watcher，可以看到，回调函数是`vm._update()`， 第二个是计算属性的 watcher，回调函数是 doubleCount。
<img :src="$withBase('/imgs/myvue/vue2-dep-and-watcher.png')" style="transform:scale(0.8);">


假如再在模板字符串中加两个自定义的`<comp/>`组件（注：`<comp/>`组件中没有计算属性也没有watch方法），如以下代码：
```diff
<div id="app">
  <div>{{name}}</div>
  <div>{{count}}</div>
  <div>{{doubleCount}}</div>
  <div>{{doubleCount}}</div>
+ <comp1></comp1>
+ <comp2></comp2>
</div>
```
则会生成 3 个 dep 实例， 如下图所示

<img :src="$withBase('/imgs/myvue/vue2-dep-and-watcher2.png')" style="transform:scale(0.8);">


