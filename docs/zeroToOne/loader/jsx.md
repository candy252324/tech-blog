# .m?jsx?

项目中我们可以写 `jsx` 语法：
>当然，如果项目决定使用 ts 了，就不要再写 jsx，改成 tsx 吧，这里只是展示如果项目要使用 jsx 该如何配置。

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
