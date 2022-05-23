# 数据代理

我们在实际使用的vue的时候一般都直接通过`this.name = xxx`的方式改变数据，而不需要通过`this.$data.name = xxx`,这是怎么做到的呢？其实很简单，只要将数据都代理到vue示例上来就好了。

``` js
class MVue {
  constructor(options) {
    this.$options = options
    this.$data = this.$options.data
    this.$set = this.set
    new Observer(this.$data)  // 数据劫持
+   this.proxyData(this.$data)
  }
  /** 代理，使不仅能通过this.$data.name 获取/设置响应式数据，还能通过this.name 获取/设置数据 */
+  proxyData(data) {
+    Object.keys(data).forEach(key => {
+      Object.defineProperty(this, key, {
+        get: () => {
+          return this.$data[key]
+        },
+        set: (newVal) => {
+          this.$data[key] = newVal
+        }
+      })
+    })
+  }
  /** 新增属性也要劫持 */
  set(obj, key, value) {
    this.$data[key] = value
    if (Object.prototype.toString.call(value) === "[object Object]") {
      new Observer(value)
    } else {
      defineProperty(obj, key, value)
    }
    let newData = {}
    newData[key] = value
+   this.proxyData(newData)  // 对新增的属性进行代理
  }
}

```

现在，可以直接通过`this.xxx` 改变数据了
``` html
<script>
    setTimeout(() => {
      myvue.hate.fruit = "banana"  // 代理后能直接通过this.xxx,而非this.$data.xxx 改变数据了！
    }, 4000)
</script>
```
