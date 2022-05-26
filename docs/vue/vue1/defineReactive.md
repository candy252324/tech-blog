# 数据劫持

使用`Object.defineProperty`进行数据劫持, 获取对象属性会触发 getter, 设置值会触发setter。在 getter 中进行依赖收集，在setter 中通知更新。

这里有个子依赖的收集过程，什么是子依赖？

比如数据`{ myArr:[1,2,3] }`，当我们执行this.myArr=[100] 时，会触发setter,从而调用 `dep.notify()` 通知更新。

但是当我们执行`this.myArr.push(4)`时，是不会触发setter的，那么如何通知更新呢？这里就涉及到了子依赖的收集。具体怎么实现的查看observe章节。



``` js
import Dep from './Dep.mjs'
import observe from './observe.mjs'

/** 数据监听 */
export default function defineReactive(obj, key, value) {
  let childOb = observe(value) // value可能是个对象，需要进行监听
  const dep = new Dep()

  // 这里相当于是一个闭包，data中的每一个key,都对应一个dep实例，
  // 所以watcher的回调函数中的this.xxx的读取操作触发getter时，同一个key的依赖会被放到同一个dep实例中
  Object.defineProperty(obj, key, {
    get: () => {
      // 如果Dep已经实例化过
      if (Dep.target) {
        dep.depend()  // 收集依赖，当执行 this.arr=[xxx] 时，会触发这里的依赖更新
        // 如果存在子ob, 则顺道一起把子对象的依赖收集也完成
        if (childOb) {
          childOb.dep.depend()  // 当执行数组操作如：this.arr.push()时，会触发这里的依赖更新 
        }
      }
      console.log("get value:", value)
      return value
    },
    set: (newValue) => {
      console.log("set value", key, ":", newValue)
      if (newValue === value) return
      value = newValue
      observe(value)  // set的值可能是个对象，需要进行监听
      dep.notify()  // 依赖通知更新
    }
  })
}

```