# watcher和dep的关系

## vue1


我们知道，data 中每一个 key 都对应有一个 dep 实例。

假设有如下代码：
```html
<div id="app">
  <div>{{name}}</div>
  <div>{{name}}</div>
  <div>{{name}}</div>
  <div>{{hobby}}</div>
</div>
```

以上代码会生成两个dep实例，其中 dep1 数组中放的是 name 的依赖，其中有三个 watcher，因为字符串模板中有 3 处name 的依赖； dep2 中放的是 hobby 的依赖，其中只有一个 watcher。

<img :src="$withBase('/imgs/myvue/vue1-dep-and-watcher.png')" style="transform:scale(0.8);">

当 name 变化时，循环 dep1, 依次执行 3 个 watcher 回调，挨个更新 3 个依赖name属性的dom节点。

## vue2 

vue2 和 vue1 一样，data 中每一个 key 都对应有一个 dep 实例。此外，每个组件对应一个渲染 watcher，计算属性也有 watcher。（注：还有用户自己定义的 watch 方法，这里没涉及）

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

以上代码会生成两个 dep 实例：其中 dep1 对应 name 的依赖，里面只有一个根组件渲染 watcher；dep 2 对应 count 的依赖，里面有两个 watcher。
<img :src="$withBase('/imgs/myvue/vue2-dep-and-watcher1.png')" style="transform:scale(0.8);">

打印看一下 dep2 里的两个 watcher 长啥样，如下图所示：可以看到里面有两个 watcher ，第一个是根组件的渲染 watcher，回调函数是`vm._update()`， 第二个是计算属性的 watcher，回调函数是 doubleCount。

<img :src="$withBase('/imgs/myvue/vue2-dep-and-watcher2.png')" style="transform:scale(0.8);">




假如再加一个自定义的`<comp/>`组件, `<comp/>`组件模板字符串中有两个数据引用，代码如下：
```diff
<div id="app">
  <div>{{name}}</div>
  <div>{{count}}</div>
  <div>{{doubleCount}}</div>
  <div>{{doubleCount}}</div>
+ <comp></comp>
</div>
```

```js
new Vue({
  ...    
  components: {
    "comp": {
      template: `
        <div class="line">
          <span>{{address}}</span>
          <span>{{hobby}}</span>
        </div>
      `,
      data() {
        return {
          address: "浙江杭州",
          hobby: "画画"
        }
      },
    },
  }
})
```
则会生成 4 个 dep ，5 个 watcher ：
> tips: “5 个 watcher” 的表述其实不太准确，因为 watcher 是引用类型，dep1 和 dep2 的根组件渲染 watcher 其实是同一个，dep3 和 dep4 子组件渲染 watcher 也是指向同一个 watcher 实例。

dep1: 根组件 name 的依赖，里面只有一个根组件的渲染 watcher

dep2: 根组件 count 的依赖，里面有两个 watcher ，分别是根组件的渲染 watcher 和 计算属性 watcher

dep3: 子组件 address 的依赖，里面只有一个子组件`<comp/>`的渲染 watcher

dep4: 子组件 hobby 的依赖，里面只有一个子组件`<comp/>`的渲染 watcher



