# ref 的实现

先看 `ref` 用法, 下面示例代码的表现是 1s 后 ，页面显示内容由 'aaa' 变成了 'bbb'

```html
<!-- 这里引入的 reactivity.global.js 是 vue 源码的打包产物（版本 3.2.41） -->
<script src="../../reactivity/dist/reactivity.global.js"></script>
<div id="app"></div>
<script>
  const { reactive, effect, ref } = VueReactivity
  const refV = ref('aaa')
  effect(() => {
    app.innerHTML = refV.value
  })
  setTimeout(() => {
    refV.value = 'bbb'
  }, 1000)
</script>
```

看一下这个 ref 对象的打印结果，
