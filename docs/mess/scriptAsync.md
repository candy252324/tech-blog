# 动态创建的 scirpt 标签同步异步问题

众所周知，非动态创建的 `script` 标签有 `defer` 和 `async` 属性用于控制 script 脚本的下载和执行。
本节不讨论这个，本节讨论动态创建 `script` 标签的情况。

- **通过 src 属性赋值动态创建的 script，无论是否指定 `async` 都是异步的**

如下代码，先打印 "other"，再打印 "test"
```html
<script>
  var script = document.createElement('script')
  script.src = './test.js'  // test.js 中只有一行 console.log("test")
  document.head.appendChild(script)
</script>
<script>
  console.log("other")  // 这里有个打印
</script>
```
- **通过 innerHtml 或 document.write 方式创建的 script，不指定 `async` 属性是同步，指定 `async` 是异步**

如下代码，不指定 `async` ,先打印 "test"，再打印 "other"

```html
<script>
  var src = './test.js'  // test.js 中只有一行 console.log("test")
  document.write("<script type='text/javascript' src='" + src + "' charset='UTF-8'><\/script>")
</script>
<script>
  console.log("other") // 这里有个打印
</script>
```

如下代码，指定 `async` ,先打印 "other"，再打印 "test"

```html
<script>
  var src = './test.js'  // test.js 中只有一行 console.log("test")
  document.write("<script async type='text/javascript' src='" + src + "' charset='UTF-8'><\/script>")
</script>
<script>
  console.log("other") // 这里有个打印
</script>
```

