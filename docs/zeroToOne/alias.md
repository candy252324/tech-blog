# resolve.alias


## 配置别名
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


## 解析顺序

假如我们引入文件的时候不加后缀，webpack 会如何解析呢？

比如，现在有两个同名文件，一个`.vue`，一个`.ts`：

`src/home/day.vue` 和 `src/home/day.ts`，然后使用`import '@/home/day'`引入。

能正常打包吗？答案是不能，会报错。

因为 webpack 的默认解析顺序是 `['.js', '.json', '.wasm']`，会按顺序解析这些后缀名，匹配到一个则停止，匹配不到则报错。

可以通过配置 `resolve.extensions` 来覆盖它的解析顺序。

```js
module.exports={
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "../src"),
      "utils": path.resolve(__dirname, "../src/utils"),
    },
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.vue', '.json']
  }
}
```
