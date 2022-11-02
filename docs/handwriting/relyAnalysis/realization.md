# 如何实现

## 使用方式

我这里是 windows 系统，假如我的项目目录是`E:\\projectDir`，我改了`E:\\projectDir\\xxx\\A.vue`组件，我想知道哪些组件引用了 `A` 组件。

期望的使用方式类似于这样：

输入一行命令 `rely -p E:\\projectDir -f E:\\projectDir\\xxx\\A.vue`，工具便能分析出组件 `A` 的引用关系。

> 参数含义：<br/>`-p --projectDir` 项目目录（绝对路径）<br/>`-f --filePath` 组件路径（绝对路径）

命令行的实现过程这里不讲，只需要知道我们能拿到用户通过命令行输入的所有参数就行。

## 整体思路

假设现在项目中只有 5 个 `.vue`文件，分别是 `main.vue` , `body.vue` , `header.vue` , `footer.vue` 和 `A.vue`。

其中:

`main.vue` 引用了 `header.vue`、`body.vue` 和 `footer.vue`；

`header.vue` 引用了 `A.vue`；

`body.vue` 引用了 `A.vue`；

`footer.vue` 啥也没引用。

`A.vue` 啥也没引用。

遍历项目目录，判断如果是`.vue`文件，则去读取文件内容分析依赖，遍历结束之后，将会得到一份如下格式的数据（平铺，不带层级）。

> 注：这份数据之后都称之为`rawRely`（生的、未经处理的依赖关系）。

```js
// rawRely
;[
  {
    fileName: 'E:\\projectDir\\xxx\\main.vue',
    relyonComp: [
      { fileName: 'E:\\projectDir\\xxx\\header.vue' },
      { fileName: 'E:\\projectDir\\xxx\\body.vue' },
      { fileName: 'E:\\projectDir\\xxx\\footer.vue' },
    ],
  },
  {
    fileName: 'E:\\projectDir\\xxx\\header.vue',
    relyonComp: [{ fileName: 'E:\\projectDir\\xxx\\A.vue' }],
  },
  {
    fileName: 'E:\\projectDir\\xxx\\body.vue',
    relyonComp: [{ fileName: 'E:\\projectDir\\xxx\\A.vue' }],
  },
  {
    fileName: 'E:\\projectDir\\xxx\\footer.vue',
    relyonComp: [],
  },
  {
    fileName: 'E:\\projectDir\\xxx\\A.vue',
    relyonComp: [],
  },
]
```

有了 `rawRely` 之后，只需要写一个转化方法，就能得到任何组件的依赖关系，自己想是啥格式就处理成啥格式，比如我最终将 `A` 组件的依赖关系处理成了这样：

```js
;[
  {
    fileName: 'E:\\projectDir\\xxx\\main.vue',
    child: [
      {
        fileName: 'E:\\projectDir\\xxx\\header.vue',
        child: [
          {
            fileName: 'E:\\projectDir\\xxx\\A.vue',
          },
        ],
      },
      {
        fileName: 'E:\\projectDir\\xxx\\body.vue',
        child: [
          {
            fileName: 'E:\\projectDir\\xxx\\A.vue',
          },
        ],
      },
    ],
  },
]
```

所以问题的关键点就在于如何得到 `rawRely `，再具体点就是，遍历文件的时候，通过 `fs.readFileSync(filePath, 'utf-8')` 拿到文件内容后，如何分析这些内容。

## 单个 vue 文件的依赖分析（转 ast）

比如有如下 `example.vue` 文件，它实际依赖了 `header.vue` 和 `footer.vue`：

```html
<temlate>
  <div>something</div>
  <header-comp/>
  <footerComp></footerComp>
  <!-- <bodyComp/> -->
</template>

<script>
  import headerComp from '../header.vue' // 有后缀
  import FooterComp from '../footer' // 没后缀
  import otherComp from '@/components/other.vue' // 使用了路径别名
  // import bodyComp from '../bodyComp'     // 注释节点

  export default{
    //
  }
</script>

```

通过 `fs.readFileSync(filePath, 'utf-8')`拿到该文件内容后，使用 `@vue/compiler-sfc` 进行解析，它会直接返回 `<template>` 部分的 ast， 同时还会返回 `<script>` 的 `content`，再使用 `typescript` 将 `<script>` 的 `content` 解析成 ast。

```js
import sfcParser from '@vue/compiler-sfc'
import ts from 'typescript'

const fileData = fs.readFileSync(filePath, 'utf-8')
const res = sfcParser.parse(fileData)

// template 部分的 ast
const templateAst = res.descriptor.template.ast
// scritp 部分的 ast
const scriptAst = ts.createSourceFile('', res.descriptor.script.content, ts.ScriptTarget.ES6, false)
```

有了 `templateAst`和 `scriptAst`后，分别遍历他们，就能得到当前 vue 文件的 `template依赖` 和 `script依赖`。

- `template依赖` 处理成如下格式：

```js
// 标签转化为小驼峰形式，不包含注释节点
const templateRely = ['div', 'headerComp', 'footerComp']
```

- `script依赖` 处理成如下格式：

```js
// 组件名称处理成小驼峰形式，路径处理成绝对路径，不包含注释节点
const scriptRely = [
  {
    compName: 'headerComp',
    filePath: 'E://xxx/header.vue', // 绝对路径
  },
  {
    compName: 'footerComp',
    filePath: 'E://xxx/footer.vue', // 绝对路径
  },
  {
    compName: 'otherComp',
    filePath: 'E://xxx/other.vue', // 绝对路径
  },
]
```

由于代码中可能会出现 `<script>`中引入了某个依赖，但是`<template>`中实际并未使用的情况，所以**最终的依赖应该是 `<script>`中引入了且`<template>`中使用了的依赖**。

最终 `example.vue`文件内容解析结果如下：

```js
{
  fileName: 'E:\\projectDir\\xxx\\example.vue',
  relyonComp: [
    { fileName: 'E:\\projectDir\\xxx\\header.vue' },
    { fileName: 'E:\\projectDir\\xxx\\footer.vue' }
  ],
},
```

这样就得到 `rawRely` 啦！:tada::tada:

最主要的一步已经完成啦！:tada::tada::tada:

接下来就是一些细节处理了

## 一些细节

本工具提供了很多命令行参数，都是有原因的

```txt
参数                  是否必须     参数含义
----------------------------------------------------------
-V, --version           no        输出版本号
-p, --projectDir        no        需要分析的项目目录(默认当前路径)
-f, --filePath          yes       组件绝对路径
-a, --alias             no        路径别名(对应webpack中配置的resolve.alias)
-e, --extensions        no        解析顺序(对应webpack中配置的resolve.extensions)
-o, --open              no        打开浏览器 (default: false)
-h, --help              no        输出帮助信息
```

- `--filePath`

  只有这个参数是必须的，使用者必须明确告知想要知道哪个文件的引用关系，不然工具无法工作。

- `--projectDir`

  这个参数不是必须的，如果没传，就取`process.cwd()`

- `--alias`

  这个参数存在的原因是，打包工具可以配置别名，比如 webpack 中的 `resolve.alias`，使得我们在引入组件时更便捷，所以我们在分析依赖时，需要根据使用者传入的别名参数来解析组件路径。

- `--extensions`

  这个参数存在的原因是，打包工具可以配置解析顺序使得我们在引入文件时可以省略后缀。比如 webpack 中的 `resolve.extensions`，如果配置为`['.ts', '.tsx', '.js', '.jsx', '.vue', '.json']`，那么当我们 `import example from "../example"` 时，webpack 会先去找有没有`example.ts`，没有再去找有没有`example.tsx`，依次类推，直到找到文件。

  所以需要使用者传入该参数用于正确匹配依赖文件。

- `--open`

  用 node 启动一个服务，将解析结果输出到浏览器界面上。
