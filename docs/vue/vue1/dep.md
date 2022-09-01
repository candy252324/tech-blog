# Dep


Dep 函数非常简单，它是watcher的管家。data 中每一个 key 都对应有一个 dep 实例， dep 实例中维护了一个 watchers 数组。

getter触发时，调用`dep.depend` 收集依赖；
setter触发时，调用`dep.notify`, 循环数组，调用每一个watcher实例的update方法更新dom。


``` js
export default class Dep {
  constructor() {
    this.watchers = []
  }
  depend() {
    // 防止 watcher 被重复收集
    if (this.watchers.includes(Dep.target)) return
    this.watchers.push(Dep.target)
  }
  notify() {
    for (let watchers of this.watchers) {
      watchers.update()
    }
  }
}
Dep.target = null
```