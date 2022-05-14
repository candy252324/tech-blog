# 新增属性实现数据劫持

在我们使用vue的时候，对于新增属性，需要使用`Vue.set( target , key , value)` 才能使之成为响应式数据，这是因为vue在初始化的时候，只对已经存在的属性进行了递归响应式处理，后面新增的属性是检测不到的。基于上一章的代码，我们也来实现一下这个功能。

实现原理很简单，只需要在set方法中对新增的属性进行递归监听就好了
``` js
class MVue {
  constructor(options) {
    this.$options = options
    this.$data = this.$options.data
+   this.$set = this.set
    new Observer(this.$data)  // 数据劫持
  }
+  /** 新增属性也要劫持 */
+  set(obj, key, value) {
+    this.$data[key] = value
+    if (Object.prototype.toString.call(value) === "[object Object]") {
+      new Observer(value)
+   } else {
+     defineProperty(obj, key, value)
+   }
+    let newData = {}
+    newData[key] = value
+  }
}

```


现在，可用通过$set对新增属性实现监听了
``` html
<script>
    setTimeout(() => {
      myvue.$set(myvue.$data, "hate", { fruit: "apple" })
      myvue.$data.hate.fruit = "pear"  // 新增对象也能响应
  }, 3000)
</script>
```