# 异步更新队列

整体思路：

1. 定义两个数组 `queue`（用于存放 watcher） 和 `callbacks`（用于存放刷新 watcher 队列的函数，或者用户调用 Vue.nextTick 方法传递的回调函数）

2. 定义两个函数 `flushSchedulerQueue`（用于遍历`queue`执行 watcher 回调） 和 `flushCallbacks`（用于遍历`callbacks`执行里面的 cb）

> 假如现在 dep 里有两个 watcher（watcher1 和 watcher2），还有一个用户使用 nextTick 自定义的回调 cb3 ，这种情况下，queue = [watcher1, watcher2]，callbacks = [flushSchedulerQueue，cb3]

3. 定义变量 flushing，用于标识现在是否正在刷新 watcher 队列，初始值 false，`flushSchedulerQueue`开始执行时置为 true, watcher 回调全部执行完置为 false

4. 定义变量 waiting， 保证 callbacks 数组中只会有一个刷新 watcher 队列的函数，初始值 false，首次执行`queueWatcher`便置为 true

5. 定义变量 pending， 标识浏览器当前任务队列中是否存在刷新 callbacks 数组的函数，初始值 false，首次执行`nextTick`便置为 true，`flushCallbacks` 开始执行时置为 false

6. 此外，首次执行`nextTick`的时候还会使用 Promise.resolve().then() 将`flushSchedulerQueue`放入异步队队列中等待执行，后面再执行 `nextTick`只会往 callbacks 里 push cb


以下是具体的实现代码。

首先watcher 需要改一下，增加 uid(用于排序) 及改造 update 方法
```js
// Watcher.mjs
import queueWatcher from './asyncUpdateQueue.mjs'
let uid = 0

export default class Watcher {
  constructor(cb, options = {}, vm = null) {
    this.uid = uid++  
    ...
  }
  // 当响应式数据更新时，执行update
  update() {
    // 懒执行
    if (this.options.lazy) {
      this.dirty = true
    } else {
      queueWatcher(this)
    }
  }
}
```

以下是 asyncUpdateQueue.mjs 文件内容

```js
// 存储本次更新的所有 watcher
const queue = []
// 标识现在是否正在刷新 watcher 队列
let flushing = false
// 保证 callbacks 数组中只会有一个刷新 watcher 队列的函数
let waiting = false
// 存放刷新 watcher 队列的函数，或者用户调用 Vue.nextTick 方法传递的回调函数
const callbacks = []
// 标识浏览器当前任务队列中是否存在刷新 callbacks 数组的函数
let pending = false
```

```js
/**
 * 将 watcher 放入队列
 * @param {*} watcher 待会儿需要被执行的 watcher，包括渲染 watcher、用户 watcher、computed
 */
export default function queueWatcher(watcher) {
  if (!queue.includes(watcher)) { // 防止重复入队
    if (!flushing) { // 现在没有在刷新 watcher 队列
      queue.push(watcher)
    } else { // 正在刷新 watcher 队列，比如用户 watcher 的回调函数中更改了某个响应式数据
      // 标记当前 watcher 在 for 中是否已经完成入队操作
      let flag = false
      // 这时的 watcher 队列时有序的(uid 由小到大)，需要保证当前 watcher 插入进去后仍然有序
      for (let i = queue.length - 1; i >= 0; i--) {
        if (queue[i].uid < watcher.uid) { // 找到了刚好比当前 watcher.uid 小的那个 watcher 的位置
          // 将当前 watcher 插入到该位置的后面
          queue.splice(i + 1, 0, watcher)
          flag = true
          break;
        }
      }
      if (!flag) { // 说明上面的 for 循环在队列中没找到比当前 watcher.uid 小的 watcher
        // 将当前 watcher 插入到队首 
        queue.unshift(watcher)
      }
    }
    if (!waiting) { // 表示当前 callbacks 数组中还没有刷新 watcher 队列的函数
      // 保证 callbacks 数组中只会有一个刷新 watcher 队列的函数
      // 因为如果有多个，没有任何意义，第二个执行的时候 watcher 队列已经为空了
      waiting = true
      nextTick(flushSchedulerQueue)
    }
  }
}
```

```js
/**
 * 负责刷新 watcher 队列的函数，由 flushCallbacks 函数调用
 */
function flushSchedulerQueue() {
  // 表示正在刷新 watcher 队列
  flushing = true
  // 给 watcher 队列排序，根据 uid 由小到大排序
  queue.sort((a, b) => a.uid - b.uid)
  // 遍历队列，依次执行其中每个 watcher 的 run 方法
  while (queue.length) {
    // 取出队首的 watcher
    const watcher = queue.shift()
    // 执行 run 方法
    watcher.run()
  }
  // 到这里 watcher 队列刷新完毕
  flushing = waiting = false
}
```


```js
/**
 * 将刷新 watcher 队列的函数或者用户调用 Vue.nextTick 方法传递的回调函数放入 callbacks 数组
 * 如果当前的浏览器任务队列中没有刷新 callbacks 的函数，则将 flushCallbacks 函数放入任务队列
 */
function nextTick(cb) {
  callbacks.push(cb)
  if (!pending) { // 表明浏览器当前任务队列中没有刷新 callbacks 数组的函数
    // 将 flushCallbacks 函数放入浏览器的微任务队列
    Promise.resolve().then(flushCallbacks)
    // 标识浏览器的微任务队列中已经存在 刷新 callbacks 数组的函数了
    pending = true
  }
}
```

```js
/**
 * 负责刷新 callbacks 数组的函数，执行 callbacks 数组中的所有函数
 */
function flushCallbacks() {
  // 表示浏览器任务队列中的 flushCallbacks 函数已经被拿到执行栈执行了
  // 新的 flushCallbacks 函数可以进入浏览器的任务队列了
  pending = false
  while (callbacks.length) {
    // 拿出最头上的回调函数
    const cb = callbacks.shift()
    // 执行回调函数
    cb()
  }
}
```