# .tsx? 

目前主流的 ts 编译方案有 2 种，分别是官方 tsc 编译 和 babel + ts  插件编译。

- **方案 1：官方 tsc 编译**

1. 编译器是 `tsc`（通过安装`typescirpt`获得），使用 `tsc` 必须要有 `tsconfig.json`配置文件。

2. `tsc` 除了能编译 ts，还会做类型检查，它会扫描那些包括 `node_modules` 在内的类型定义文件（*.d.ts）以确保代码正确，缺点是每次修改代码后，哪怕是一点小修改，可能都会很慢，所以许多人将 Typescript 类型检查放到一个单独的进程。

比如如下代码，运行 `tsc index.ts`是无法编译成功的，报错`Type 'number' is not assignable to type 'string'.`：
```ts
// index.ts
interface Foo {
  name: string
}
const obj: Foo = {
  name: 123
}
```

3. 对于 webpack 项目，需要安装`ts-loader`（本质上还是调用的 `tsc`）。

-  **方案 2：babel + ts 插件编译（建议）**

1. babel 处理 ts 的方式是删除 ts 代码，将其转换为 “常规的” js 代码进行处理。

2. babel 本身不做类型检查，它只负责编译，所以上面的测试代码，用 babel 编译是可以成功的。
>虽然 babel 不做类型检查，我们还是需要类型检查来保证开发时的效率和质量，具体如何配置看另一章节《ts 的类型检查》。

3. 对于 webpack 项目，需要安装`babel-loader`。





**babel 7 之后，方案 1 可以弃用了，建议使用方案 2**。

以下方案 2 具体配置方式：

安装依赖：`yarn add babel-loader @babel/preset-typescript -D`

 >其中[`@babel/preset-typescript`](https://www.babeljs.cn/docs/babel-preset-typescript)是 ts 的预设，它包含插件 `@babel/plugin-transform-typescript`（这个插件无需额外安装）。






增加 webpack 配置:
```js
module.exports = {
  ...
  module: {
    rules: [
       {
        test: /\.tsx?$/i,
        use: ["babel-loader"]
      },
    ]
  }
}
```

```json
// .babelrc
{
  "presets":[
    [
      "@babel/preset-typescript",
      {
        "allExtensions": true, 
        "isTSX": true, 
      },
    ]
  ]
}
```
注意到我这里给它添加了两个参数：

- `allExtensions:true`：将所有的文件类型都按照 ts、tsx 或没有 jsx 歧义的 ts（取决于`isTSX`和`disallowAmbiguousJSXLike`选项）来解析
<!-- cjh todo 是不是当做 js 解析了-->
> 添加这个配置的原因是：`.vue`文件中的`<script>`添加`lang='ts'`后，编译失败了，原因是`.vue`经过`vue-loader`处理后的后缀还是`.vue`，`babel-loader`将其当做 js 解析了。

- `"isTSX": true`：强制开启 jsx 解析。
> 添加这个配置的原因是：`allExtensions` 设置为 `true` 后，`.jsx`文件又无法正确解析了，因为被当成 ts 处理了。

当然，如果项目决定使用 ts 了，就不要再写 jsx，改成 tsx 吧。
