# 数据劫持

使用`Object.defineProperty`进行数据劫持, 获取对象属性会触发get, 设置值会触发set。 

**注：该属性不支持IE8及其更低版本的浏览器。**

index.js 文件内容如下：

``` js
// 对对象中的所有属性进行劫持
function observer(obj) {
  if (Object.prototype.toString.call(obj) !== '[object Object]') {
    return
  }
  Object.keys(obj).forEach(key => {
    if (Object.prototype.toString.call(obj[key]) === "[object Object]") {
      observer(obj[key])
    } else {
      defineProperty(obj, key, obj[key])
    }
  })
}

/** 数据劫持函数 */
function defineProperty(obj, key, value) {
  Object.defineProperty(obj, key, {
    get: () => {
      console.log("get value:", value)
      return value
    },
    set: (newValue) => {
      console.log("set value", key, ":", newValue)
      if (newValue !== value) {
        value = newValue
        update(value)
      }
    }
  })
}

/** 页面更新逻辑*/
function update(value) {
  document.getElementById("app").innerHTML = value
}
```

index.html文件内容如下：

``` html
<body>
  <script src="./index3.js"></script>
  <div id="app">hello!</div>
  <script>
    let obj = { name: 123, age: { larger: 333 } }
    observer(obj)  // 对obj进行数据劫持
    setTimeout(() => {
      obj.name = "new Data!" // 视图将会更新
    }, 1000)
  </script>
</body>
```
