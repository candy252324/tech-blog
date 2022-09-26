# .m?jsx?

在 vue 中我们可以写 `jsx` 语法：

```jsx
// jsxComp.jsx
import { defineComponent } from "vue"
export default defineComponent({
  props: ["name"],
  setup(props) {
    return () => <div>jsx组件，{props.name}</div>
  }
})
```

处理这种文件及语法，我们需要使用 `@vue/babel-plugin-jsx`插件，这是一个 babel 插件。

`yarn add babel-loader @babel/core -D`

`yarn add @vue/babel-plugin-jsx -D`


```js
//  webpack.config.js
module.exports={
  module:{
    rules:[
      {
        test:/\.m?jsx?$/i,
        use:["babel-loader"]
      }
    ]
  }
}
```

```json
// .babelrc
{
  "plugins":["@vue/babel-plugin-jsx"]
}
```

其他关于 js 的兼容性配置相关在 babel 章节中讲。