# Observer

我们现在已知，如果是对象，由于getter 和 setter中的 dep 指向的是同一个实例，getter中调用`dep.depend()`收集依赖，setter中调用`dep.notify()`触发更薪，能保证数据变化和依赖更新对应关系是正确的。

但是，当我们操作数组的时候，比如说数组，`{ myArr : [1,2,3] }`，我们往数组中push了新值`this.myArr.push(xxx)`， 是不会触发 setter 的，不会触发 setter 那如何去通知页面更新呢？

可以这样做，在 observe 这个数组的时候，给它添加一个`__ob__`属性，再在`__ob__`上挂一个 Dep 实例。那么整个过程就变成了这样：

 1. `observe([1,2,3])`时在 `[1,2,3]`上挂了一个`.__ob__.dep `  
 2. compiler 时 发现页面有 myArr 的依赖，于是便 new 了一个 Watcher 
 3. Watcher 的回调中有this.myArr 的引用，引用触发了getter
 4. getter 判断存在子ob，也就是, 则收集子ob的依赖`childOb.dep.depend()`
 5. 当发生`this.arr.push(xxx)`时，由于我们改写了push这个方法，在push方法里通过`this.__ob__.dep`拿到挂在当前arr数组上的dep实例，在通过`dep.notify()`去触发更新。


``` js
//  observe.js
import Observer from './Observer.mjs'

/** 数据监听 */
export default function observe(value) {
  if (typeof value !== "object") return
  // 如果已经存在__ob__属性，说明已经是响应式对象了，不需要再做响应式处理了
  if (value.__ob__) return value.__ob__
  const ob = new Observer(value)
  return ob
}
```

``` js
//  Observer.js
import defineReactive from './defineReactive.mjs'
import Dep from './Dep.mjs'
import protoArray from './protoArray.mjs'
import observe from './observe.mjs'

/** 数据监听 */
export default class Observer {
  constructor(obj) {
    // 给vm.$data里嵌套的每一个对象和数组都添加一个__ob__属性，并且在__ob__属性上再添加一个dep属性
    // 目的：当data里的数组发生变化时，用于通知更新
    Object.defineProperty(obj, "__ob__", {
      value: this,
      // 防止递归的时候处理__ob__，导致无限递归
      // 在页面显示的时候，不想显示__ob__属性
      enumerable: false,
      writable: true,
      configurable: true
    })
    obj.__ob__.dep = new Dep()

    // 如果是数组，修改原型链并进行响应式处理
    if (Array.isArray(obj)) {
      protoArray(obj)
      this.observerArray(obj)
    } else if (Object.prototype.toString.call(obj) === '[object Object]') {
      this.walk(obj)
    }
  }
  walk(obj) {
    for (let key in obj) {
      defineReactive(obj, key, obj[key])
    }
  }
  /** 使数组中的对象具备响应式
   * arr=[ 1, 2, { name: "cxx" }]
   * this.arr[2].name="newVal"
   */
  observerArray(arr) {
    for (let item of arr) {
      observe(item)
    }
  }
}
```