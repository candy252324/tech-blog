# 响应式

使用`Object.defineProperty`进行数据劫持, 获取对象属性会触发get, 设置值会触发set。 

**注：该属性不支持IE8及其更低版本的浏览器。**

MVue.js 文件内容如下：

``` js
class MVue {
  constructor(options) {
    this.$options = options
    this.$data = this.$options.data
    new Observer(this.$data)  // 数据劫持
  }
}

/** 数据监听 */
class Observer {
  constructor(obj) {
    this.walk(obj)  // 递归数据劫持
  }
  walk(obj) {
    if (Object.prototype.toString.call(obj) !== '[object Object]') {
      return
    }
    Object.keys(obj).forEach(key => {
      // 递归转化为响应式数据
      if (Object.prototype.toString.call(obj[key]) === "[object Object]") {
        this.walk(obj[key])
      } else {
        defineProperty(obj, key, obj[key])
      }
    })
  }
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
  console.log("页面更新")
  document.getElementById("app").innerHTML = value
}
```

index.html文件内容如下：

``` html
<body>
  <script src="./MVue.js"></script>
  <div id="app"></div>
  <script>
    const myvue = new MVue({
      el: "#app",
      data: {
        name: "cxx",
          hobby: {
          swim: true
        }
      }
    })
    setTimeout(() => {
      myvue.$data.name = "cxxgo!"
    }, 1000)
    setTimeout(() => {
      myvue.$data.hobby.swim = false  // 多层对象也能响应
    }, 2000)
  </script>
</body>
```
