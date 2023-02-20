# lerna

**learn 是一个基于 git+npm 的多 package 项目的管理工具。**

### 一、lerna 解决的痛点

#### 痛点 1：重复操作

- 多 package 本地 link
- 多 package 依赖安装
- 多 package 单元测试
- 多 package 代码提交
- 多 package 代码发布

#### 痛点 2：版本一致性

- 发布时版本一致性
- 发布后相互依赖版本升级

### 二、如何使用

```bash
$ npm init
$ npm i lerna -D
# 这步会自动生成lerna.json 和 空的packages文件夹, 如果当前不是git仓库还会自动创建git仓库
$ lerna init
# 创建 @cxxgo/core 包（发包前需要提前在npm上建好@cxxgo这个group）
$ lerna create @cxxgo/core
# 再创建一个 @cxxgo/utils 包
$ lerna create @cxxgo/utils
```

到这一步，我们的项目目录已经变成了这样:

```
├─cxxgo
  ├─package.json
  ├─node_modules
  ├─packages
    ├─core
      ├─package.json
      ├─node_modules
    ├─utils
      ├─package.json
      ├─node_modules
```

### 三、常用命令

- `lerna add xxx`

xxx 依赖会被安装到 packages 目录下的所有的包中。

- `lerna add xxx packages/core`

把 xxx 依赖安装到 packages/core 包下

- `lerna clean`

删除 packages 目录下所有包的 node_modules 文件夹（ps:但不会从 package.json 中删除）。

- `lerna bootstrap`

给所有的包重新安装依赖。

- `larn run xxx`

执行所有包里的 xxx script 命令

- `learn link`

链接互相引用的库

- `lerna version`

识别出修改的包 --> 创建新的版本号 --> 修改 package.json --> 提交修改 打上版本的 tag --> 推送到 git 上

- `lerna publish`

发布新的库版本。

```bash
$ lerna publish  # 发布最新commit的修改
$ lerna publish <commit-id> # 发布指定commit-id的代码
```

- `lerna exec`

在每个包目录下执行任意命令，如`lerna exec -- rm -rf node_modules`,将会删除 packages 目录下所有的 node_modules

- `lerna changed` 查看哪些包有变更

- `lerna diff` 查看代码变更

### 四、踩过的坑

#### 坑 1

group 形式的包，lerna 会默认为其是私有的，直接发会发不上去，报错 "You must sign up for private packages", 这种情况下，需要在每个包的 package.json 中添加配置

```json
{
  "publishConfig": {
    "access": "public"
  }
}
```

#### 坑 2

lerna 每次在 publish 之后，会自动在 git 仓库上打一个 tag(版本号), 如果当前版本号低于之前发布的版本号，是 publish 不成功的。

#### 坑 3

运行 lerna publish 如果中途有包发布失败，再运行 lerna publish 的时候，因为 Tag 已经打上去了，所以不会再重新发布包到 NPM。（这个时候本地`git tag` 查看，可以看到生成了新的 tag 和 commit 记录，但是远端仓库可能没有 push 成功）。

解决办法：

1. 运行`lerna publish from-git`，会把当前标签中涉及的 NPM 包再发布一次，PS：不会再更新 package.json，也不会把当前的 tag push 到 github 上，只是执行`npm publish`
2. 运行`lerna publish from-package`，会把当前所有本地包中的 package.json 和远端 NPM 比对，如果是 NPM 上不存在的包版本，都执行一次 npm publish
