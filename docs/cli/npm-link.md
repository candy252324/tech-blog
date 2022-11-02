# npm-link

本地开发 npm 包的时候，使用`npm link`可以方便的进行模块调试，避免频繁发包。

### 场景一： 使用相对路径进行 link

如下目录结果，project 是项目目录，cxx-utils 是需要开发的 npm 包。

```
├─project
  ├─index.js
  ├─package.json
├─cxx-utils
  ├─index.js
  ├─package.json
```

cxx-utils/index.js 中定义了一个 sum 方法：

```js
// cxx-utils/index.js
exports.sum = (a, b) => {
  return a + b;
};
```

project/index.js 中引用了 cxx-utils 中的方法:

```json
// project/package.json
{
  "dependencies": {
    "cxx-utils": "^0.0.1"
  }
}
```

```js
// project/index.js
const utils = require("cxx-utils");
const sum = utils.sum(1, 3);
console.log(sum);
```

这种情况，如何 link 呢？

```bash
# 进入项目目录
cd project
# 使用相对路径link
npm link ../cxx-utils
```

link 成功后，可以看到，project/node_modules 目录下多了一个 cxx-utils 的软链接。

<img :src="$withBase('/imgs/cli/npm-link-local.png')" style="transform:scale(0.9);">

### 场景二： 全局 link

如果 project 和 cxx-utils 不在一个目录下怎么办呢？

我们需要先将 util 包 link 到全局：

```bash
# 进入util包目录
cd cxx-utils
# 将util包link到全局
npm link

# 进入项目目录
cd project
# link 全局的utils 包
npm link cxx-utils
```

第二步（将 util 包 link 到全局）执行完后，可以看到在系统根目录先生成了 cxx-utils 包的软连接。
<img :src="$withBase('/imgs/cli/npm-link-global.png')" style="transform:scale(0.9);">

> tips:如果已经执行了 link，并且`where xxx`也能看到路径，但是运行 `xxx` 报错 “系统找不到指定的路径”，重启电脑试试

### 解除 link

解除项目和模块 link，项目目录下，npm unlink 模块名

解除模块全局 link，模块目录下，npm unlink 模块名

**注：npm link 会在 node_nodules 下添加软链接，但不会在 package.json 中自动添加依赖。但是 ，unlink 会自动移除 package.json 中的依赖。**

### 最后，补充一个小点

如果在 cxx-utils 目录下执行`npm i cxx-utils -g`, 并不会在用户根目录下安装远程 npm 上的 cxx-utils 包，而只是在用户根目录下创建了一个本地 cxx-utils 的软连接。效果等同于在 cxx-utils 目录下执行`npm link`。
