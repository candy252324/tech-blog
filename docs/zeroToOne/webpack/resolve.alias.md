# resolve.alias 配置别名

当项目文件变的复杂，引用文件的路径也将变的复杂。

可以通过配置 webpack 的 `resolve.alias` 来给路径取别名。

```js
module.exports={
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "../src"),
      "utils": path.resolve(__dirname, "../src/utils"),
    }
  }
}
```
配置之后可以这样使用：

`import xxx from '@/home/xxx.vue'`（定位到 `src/home`目录） 

`import {xxx} from 'utils/xxx.ts'`（定位到 `src/utils`目录）



