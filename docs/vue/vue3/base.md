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
    |- package.json
    |- /src
      |- index.ts
  |- /shared     // shared 包
    |- package.json
    |- /src
      |- index.ts
```

然后，根级 `package.json` 中添加 `workspaces` 、 `private:true` 和 `scripts` 字段

```json
// 根级`package.json`
{
  "name": "vue",
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
  "name": "@vue/reactivity", // 子包 name
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
  "name": "@vue/shared", // 子包 name
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

知道这些之后，就可以开始写`rollup.config.js`配置文件了。

项目使用 ts 开发，安装`rollup-plugin-typescript2 typescript`用于 `rollup` 打包 ts。

```js
// rollup.config.js
import fs from 'fs'
import typescript from 'rollup-plugin-typescript2' // 用于解析ts
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
  output.name = buildOptions.name
  output.sourcemap = true
  return {
    input: `${fullTarget}/src/index.ts`,
    output,
    plugins: [
      typescript({
        tsConfig: path.resolve(__dirname, 'tsconfig.json'),
      }),
    ],
  }
}
export default buildOptions.format.map(format => createConfig(outputOptions[format]))
```

`rollup.config.js` 其实就是通过`process.env.TARGET`拿到注入的环境变量，也就是我们需要打包的子包，然后读取子包下的`package.json`，根据其中的自定义字段`buildOptions`来生成打包配置，最终目的是导出形如下面的配置：

```js
export default [
  {
    input: './packages/reactivity/src/index.ts',
    output: {
      name:"VueReactivity",
      file: './packages/reactivity/dist/VueReactivity.esm-bundler.js',
      format: 'es',
      sourcemap: true,
    },
    plugins: [],
  },
  {
    input: './packages/reactivity/src/index.ts',
    output: {
      name:"VueReactivity",
      file: './packages/reactivity/dist/VueReactivity.cjs.js',
      format: 'cjs',
      sourcemap: true,
    },
    plugins: [],
  },
    {
    input: './packages/reactivity/src/index.ts',
    output: {
      // iife 模式下，打包产物中立即执行函数的结果将赋值给这个 name 变量，VueReactivity=()()
      // 如果没配置 name，打包产物中只有一个立即执行函数 ()()
      name:"VueReactivity",
      file: './packages/reactivity/dist/VueReactivity.global.js',
      format: 'iife',
      sourcemap: true,
    },
    plugins: [],
  },
  ...
]
```

一切准备就绪，执行 `yarn build`，可以看到打包产物了：
<img :src="$withBase('/imgs/myvue/vue3-build-test.png')" style="transform:scale(0.9)">

## tsconfig.json 配置

现在，我们在测试在 `shared` 中导出一个方法：`export { isObject }`

然后在 `reactivity` 包中 引入： `import { isObject } from '@vue/shared'`

发现编辑器报错了，打包也无法成功了。

仔细看一下报错信息，是来自 ts 的报错，ts 说它找不到`@vue/shared`这个模块：

<img :src="$withBase('/imgs/myvue/vue3-vscode-tserror.jpg')">

好的，我们`ts --init` 生成配置文件，给它配置一下，告诉 ts，凡是引入`@vue/*`这种格式的包，都去路径`"packages/*/src"`下找，这样就 ok 了。

```json
{
  "compilerOptions": {
    "target": "ESNext",
    "module": "ESNext",
    "moduleResolution": "node",
    "baseUrl": "./",
    "paths": {
      "@vue/*": ["packages/*/src"]
    }
    // ....等等
  }
}
```

## 开发环境打包脚本 dev.js
