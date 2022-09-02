# watcher和dep的关系

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

