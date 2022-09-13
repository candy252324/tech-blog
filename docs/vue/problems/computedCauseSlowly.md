# 计算属性导致的渲染变慢问题

## 1.现象描述
工作中遇到过这样一个问题：页面中有一个非常复杂的 table 组件（当时用的 ant-design-vue 的 table 组件），table 接收外部的 list 作为数据源，table 中每行都渲染一些 input radio 之类的小组件，点击这些小组件后通过 `this.list[index].xxx= 'new Value'` 的方式改变 list，到这里一切都很顺利，没有任何问题。

但是，如果再在页面上加一个依赖计算属性的总计行后，数据量稍大的情况下（比如 80 条），数据更新后，页面渲染就会变得很慢，肉眼可见的卡顿。

问题场景伪代码如下：
```vue
<template>
  <div>
    <div>总计：迟到{{staticData.late}}人，早退{{staticData.leaveEarly}}人</div>
    <a-table :dataSource="list"> 
      <div slot="name" slot-scope="text, record, index">
        <a-radio :value="record.status" @change="inputChange(index,$event)"/>
      </div>
    </a-table>
  </div>
</template>

<script>
export default{
  data(){
    return :{
      list:[{status:"迟到"}, {status:"早退"}]
    }
  },
  computed(){
    staticData(){
      let late=0
      let leaveEarly=0
      this.list.forEach(item=>{
        if(item.status==="迟到") late++
        if(item.status==="早退") leaveEarly++
      })
    }
  },
  methods:{
    inputChange(index,e){
      this.list[index].status=e.target.value
    }
  },
}
</script>
```

## 2.产生原因
现象知道了，但是这是为什么呢？

我的第一想法是在各个组件的 `updated` 钩子里加一行打印看一下执行结果：
```html
<template>
  <a-table @hook:updated="tableUpdated"> 
    <a-radio @hook:updated="radioUpdated"></a-radio>
  </a-table>
</template>
```
```js
export.default{
  updated(){
    console.log('根组件 updated！')
  },
  methods:{
    tableUpdated() {
      console.log('table updated！')
    }
    radioUpdated(){
      console.log('radio updated！')
    }
  }
}
```
结果是，当数据变更的时候：
如果没有总计行，只有`radioUpdated` 会执行；如果有总计行，三个`updated`都会执行。

结果说明，**没有总计行的时候，只是表格的某一行被重新渲染，有总计行的时候，整个根组件和`a-table` 组件也都被重新渲染了！**

只是多了一个总计行，为什么就产生了这样的差异呢？

其实如果知道 vue2 的响应式原理、渲染 watcher 和计算属性的话，这个问题就很好解释了。

**首先，由于 JavaScript 的限制，vue 检测不到通过 `this.list[index]` 操作造成的变动，比如如果 `list=[1,2,3]`，然后通过`this.list[0]=100`这种方式去操作数组，视图是不会更新的。但是如果`list=[{age:18}]`，然后通过`this.list[0].age=20`这种方式操作数组，视图会更新，因为 vue 在 `Observer`中会递归遍历数组中的每一项，如果是对象，会对对象进行响应式处理（添加`__ob__`属性）。**

**其次，vue2 是一个组件对应一个渲染 watcher，watcher 接收一个回调函数，这个回调函数用于生成组件的虚拟 dom，并通过 diff 算法将虚拟 dom 转化成真实dom。当组件依赖的数据发生变更时，渲染 watcher 的回调函数会被执行。**

在我们的问题场景中，有三个组件 —— 根组件，`a-table` 和`a-radio`。当我们通过 `this.list[index].xxx='new Value'`的方式改变 list 的时候，会触发`this.list[index]`对应对象的 getter，从而触发后续一系列的更新操作。
- 如果没有总计行，依赖该对象的只有`a-radio`的渲染 watcher ，所以只有`a-radio`组件会更新
- 如果有总计行，依赖该对象的除了`a-radio`的渲染 watcher 之外，还有计算属性 watcher（用于生成根组件虚拟dom），所以这两个肯定会更新，`table`组件是否更新其实取决于组件本身（而非 `table` 里面的子组件）是否依赖该对象。在我的实际工作场景中，使用的是`ant-design-vue`的 table ，测试结果是三个组件都执行了 updated ，原因是它内部有相关依赖。


综上：其实这也并不能说是计算属性的锅 →_→



## 3.解决方法

1. 方法1：将统计行封装成组件使用，这样当数据更新的时候，便只会更新 `a-radio` 组件和统计行组件。
<!-- cjh todo -->
2. 方法2：vue 中有一个组件属姓，可以让这种场景下 table 组件不重新渲染，忘记是啥了，想起来再更新

## 4.可复现问题的代码

以下代码可以复现问题，打开控制台看三个 `updated` 函数的执行情况。

还可以将改变数据的方法换成 `this.list.splice(index,1,newItem)`试试区别。

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <script src="https://cdn.bootcdn.net/ajax/libs/vue/2.6.14/vue.min.js"></script>
</head>

<body>
  <div id="app">
    <h3>
      总计： {{statics.appleCount}} 人喜欢苹果， {{statics.bananaCount}} 人喜欢香蕉， {{statics.pearCount}} 人喜欢梨
    </h3>
    <div>
      <table-comp :list="list"></table-comp>
    </div>

  </div>
  <script>
    Vue.component("radio-comp", {
      template: `
        <div style="display:inline-block">
          <template v-for="option in options">
              <input  type="radio" :value="option" :name="'fruitRadio'+index" :checked="item.fruit===option"
            @click="selectFruit(index,$event)">苹果
          </template>
        </div>
      `,
      data() {
        return {
          options: ["苹果", "香蕉", "梨"]
        }
      },
      props: ["index", "item"],
      methods: {
        selectFruit(index, e) {
          this.$emit("dataChange", { index, value: e.target.value })
        }
      },
      updated() {
        console.log("radio组件 updated!!!")
      }
    })


    new Vue({
      el: "#app",
      data() {
        return {
          list: [],
        }
      },
      computed: {
        statics() {
          let appleCount = 0
          let pearCount = 0
          let bananaCount = 0
          this.list.forEach(item => {
            if (item.fruit === "苹果") appleCount++
            if (item.fruit === "香蕉") bananaCount++
            if (item.fruit === "梨") pearCount++
          })
          return {
            appleCount,
            pearCount,
            bananaCount,
          }
        }
      },
      components: {
        // table 组件里如果发生对 this.list[index] 对象的使用也会导致结果不一样
        // 如在渲染模板后面加一行 => 他真的很喜欢 {{item.fruit}}
        "table-comp": {
          template: `
            <templdate>
              <div v-for="(item,index) in list" :key="index">
                同学{{index}}：喜欢
                <radio-comp :index="index" :item="item" @dataChange="dataChange"></radio-comp>
              </div>
            </template>
          `,
          props: ["list"],
          methods: {
            dataChange({ index, value }) {
              this.list[index].fruit = value

              // 再试试通过 splice 方法改变数据
              // const item = this.list[index]
              // item.fruit = value
              // this.list.splice(index, 1, item)
            }
          },
          updated() {
            console.log("table组件 updated!!!")
          }
        },
      },
      created() {
        for (let i = 0; i < 10; i++) {
          this.list.push({
            fruit: Math.random() < 0.33 ? "苹果" : Math.random() < 0.66 ? "香蕉" : "梨",
          })
        }
      },
      updated() {
        console.log("根组件 updated!!!")
      }
    })
  </script>
</body>

</html>
```