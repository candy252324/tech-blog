# 环境搭建

## 目录结构

vue3 使用 monorepo 模式管理项目。

首先，我们参照 vue 的目录结构，建立如下项目目录结构：

所有的包都放在`/packages`目录下，除了根级的`package.json`外，每个包都有自己的`package.json`。公共依赖安装在根级`package.json`中，每个包自己的依赖安装在自己的`package.json`中。

```json
MVue3
|- package.json   // 根 package.json
|- /scripts
  |- build.js
  |- dev.js
|- /packages
  |- /reactivity  // reactivity 包
    |- index.ts
    |- package.json
  |- /shared     // shared 包
    |- index.ts
    |- package.json
```

然后，根级 `package.json` 中添加 `workspaces` 、 `private:true` 和 `scripts` 字段

```json
// 根级`package.json`
{
  "name": "mvue",
  "workspaces": ["packages/*"],
  "private": "true", // 使用 workspaces， private 必须为 true
  "scripts": {
    "build": "node scripts/build.js",
    "dev": "node scripts/dev.js"
  }
}
```

`workspaces` 用于解决本地文件系统中如何在一个顶层`package`下管理多个子`package`的问题。在 `workspaces` 声明目录下的 `package` 会软链到根级 `node_modules` 中。（如果根级 `node_modules`中没有发现软链接，尝试运行`yarn --force`解决）

<img :src="$withBase('/imgs/myvue/vue3-soft-link.png')" style="transform:scale(0.9)">

接着，在子包 `package.json` 添加自定义的 `buildOptions`参数，目的是打包的时候读取这个自定义参数以生成不同后缀的打包产物：

```json
// /packages/reactivity/package.json
{
  "name": "@mvue/reactivity", // 子包 name
  "version": "1.0.0",
  "buildOptions": {
    "name": "VueReactivity",
    "format": ["esm-bundler", "cjs", "global"]
  }
}
```

```json
// /packages/shared/package.json
{
  "name": "@mvue/shared", // 子包 name
  "version": "1.0.0",
  "buildOptions": {
    "name": "VueShared",
    "format": ["esm-bundler", "cjs"]
  }
}
```

## 正式环境打包脚本 build.js

安装 `rollup` 和 `execa`依赖到根`package.json`（`execa`支持在 Windows 上使用 Node.js 运行子进程，实现并行打包）。

`yarn add rollup execa -D -W`

> 提示：`-W` 参数是必须的，表示依赖是安装到根`package.json`

依赖安装完后，开始编写打包脚本：

```js
// scripts/build.js
const fs = require('fs')
const path = require('path')
const execa = require('execa')

const dirs = [] // [ 'reactivity', 'shared' ]
// 遍历 packages 目录，找出里面的一级文件夹
const packages = fs.readdirSync('./packages').forEach(file => {
  if (fs.statSync(`./packages/${file}`).isDirectory()) {
    dirs.push(file)
  }
})

async function build(dir) {
  await execa('rollup', ['-c', '--environment', `TARGET:${dir}`])
}

function runParaller(dirs, buildFn) {
  let fns = []
  dirs.forEach(dir => {
    fns.push(buildFn(dir))
  })
  return Promise.all(fns)
}

runParaller(dirs, build).then(() => {
  console.log('全部打包成功')
})
```

这一段打包脚本其实就是遍历`/packages`目录下的一级文件夹，得到数组`['reactivity', 'shared']`，然后循环这个数组，执行 `execa('rollup', ['-c', '--environment', TARGET:${dir}])`进行打包，就等价于执行`rollup -c --environment TARGET:xxx`。

我们知道`--environment`是用来注入环境变量的， 当我们执行 `rollup -c --environment param1:aaa,parmam2:bbb`的时候，意味着指定当前目录下的`rollup.config.js`为配置文件，并且能在配置文件中通过`process.env.xxx`的方式拿到注入的环境变量，像下面这样：

```js
// rollup.config.js
console.log(process.env.param1) // aaa
console.log(process.env.param2) // bbb
```

## rollup.config.js 配置

知道这些之后，就可以开始写`rollup.config.js`配置文件了：

```js
// rollup.config.js
import fs from 'fs'
const target = process.env.TARGET // reactivity
const fullTarget = `./packages/${target}` // ./packages/reactivity
const jsonData = require(`./packages/${target}/package.json`) // 读取 ./packages/reactivity/package.json文件内容
const buildOptions = jsonData.buildOptions // 拿到 buildOptions 参数

const outputOptions = {
  'esm-bundler': {
    file: `${fullTarget}/dist/${buildOptions.name}.esm-bundler.js`,
    format: 'es',
  },
  cjs: {
    file: `${fullTarget}/dist/${buildOptions.name}.cjs.js`,
    format: 'cjs',
  },
  global: {
    file: `${fullTarget}/dist/${buildOptions.name}.global.js`,
    format: 'iife',
  },
}
function createConfig(output) {
  output.sourcemap = true
  return {
    input: `${fullTarget}/index.ts`,
    output,
    plugins: [],
  }
}
export default buildOptions.format.map(format => createConfig(outputOptions[format]))
```

`rollup.config.js` 其实就是通过`process.env.TARGET`拿到注入的环境变量，也就是我们需要打包的子包，然后读取子包下的`package.json`，根据其中的自定义字段`buildOptions`来生成打包配置，最终目的是导出形如下面的配置：

```js
export default [
  {
    input: './packages/reactivity/index.ts',
    output: {
      file: './packages/reactivity/dist/VueReactivity.esm-bundler.js',
      format: 'es',
      sourcemap: true,
    },
    plugins: [],
  },
  {
    input: './packages/reactivity/index.ts',
    output: {
      file: './packages/reactivity/dist/VueReactivity.cjs.js',
      format: 'cjs',
      sourcemap: true,
    },
    plugins: [],
  },
  ...
]
```

一切准备就绪，执行 `yarn build`，可以看到打包产物了：
<img :src="$withBase('/imgs/myvue/vue3-build-test.png')" style="transform:scale(0.9)">

## 开发环境打包脚本 dev.js
