# 实现一个简单的脚手架  


本节目的：实现一个脚手架，脚手架命令为`tcli`, bash中输入`tcli`，打印 123

### 1. 创建npm项目
注意，package.json中的name将会是发布到npm上的包名，必须唯一，否则会发不上去。
``` bash
npm init -y
```
### 2.  创建脚手架入口文件
添加index.js 文件，文件最上方添加 `#!/usr/bin/env node`。脚手架代码只写一句console。

``` js
#! /usr/bin/env node
console.log('123')
```

### 3. package.json中添加bin 属性
含义：命令 `tcli`, 对应的执行文件为index.js。
``` json
  "bin": {
    "tcli": "index.js"
  },
```
### 4. 发布
```bash
npm publish
```
发布成功后，全局安装npm install -g xxx (你的包名), 然后bash中执行`tcli`，打印结果123。

<img :src="$withBase('/imgs/cli/tcli.png')">

至此，我们已经完成了这个简单脚手架的开发。
但是我们平时使用脚手架的时候，后面还会带一个命令，比如`vue create`, 输入`vue --version` 会展示当前版本号，这是怎么做到的呢？
### 5. 注册create命令
这里需要使用一个第三方包--commander, 这是一个node命令行工具。
```
yarn add  commander -S
```

修改index.js 如下：

``` js
#! /usr/bin/env node
// console.log(123)

const program = require('commander');
const packageJson = require('./package.json')

function create() {
  console.log('create!')
}
// 配置版本号
program.version(packageJson.version)
// 注册create命令
program
  .command('create')
  .action(() => {
    create()
  })

// 解析commanderline arguments
program.parse(process.argv)

```

修改完index.js 后，再修改一下版本号，然后再重新发布和安装。
这个时候bash中输入`tcli --version` 和 `tcli create` 可以看到如下结果！

<img :src="$withBase('/imgs/cli/tcli-commander.png')">

