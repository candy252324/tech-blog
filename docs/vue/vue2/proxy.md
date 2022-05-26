# 数据代理

我们在实际使用的vue的时候一般都直接通过`this.name = xxx`的方式改变数据，而不需要通过`this.$data.name = xxx`,这是怎么做到的呢？其实很简单，只要将数据都代理到vue实例上来就好了。

``` js
/** 代理，使不仅能通过this.$data.name 获取/设置响应式数据，还能通过this.name 获取/设置数据 */
export default function proxyData(vm, data) {
  Object.keys(data).forEach(key => {
    Object.defineProperty(vm, key, {
      get: () => {
        return vm.$data[key]
      },
      set: (newVal) => {
        vm.$data[key] = newVal
      }
    })
  })
}
```