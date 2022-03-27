# learna

**learn 是一个基于git+npm的多package项目的管理工具。**
## 一、lerna解决的痛点

#### 痛点1：重复操作
- 多 package 本地link
- 多package 依赖安装
- 多package 单元测试
- 多package 代码提交
- 多package 代码发布

#### 痛点2：版本一致性
- 发布时版本一致性
- 发布后相互依赖版本升级

## 二、如何使用
``` bash
$ npm init
$ npm i lerna -D
# 这步会自动生成lerna.json 和 空的packages文件夹, 如果当前不是git仓库还会自动创建git仓库
$ lerna init
# 创建core包（命令输完后还得手动输入包名，如：@cxxgo/core, 发包前需要提前在npm上建好@cxxgo这个group）
$ lerna create core
# 再创建一个 utils 包
$ lerna create utils
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

## 三、常用命令

- `lerna add xxx`

xxx依赖会被安装到 packages 目录下的所有的包中。

- `lerna add xxx packages/core`

把 xxx 依赖安装到 packages/core 包下

- `lerna clean` 

删除 packages 目录下所有包的 node_modules 文件夹（ps:但不会从package.json中删除）。

- `learna bootstrap` 

给所有的包重新安装依赖。

- `larn run xxx` 

执行所有包里的xxx script 命令


- `learn link`

链接互相引用的库

- `lerna version` 

识别出修改的包 --> 创建新的版本号 --> 修改package.json --> 提交修改 打上版本的tag --> 推送到git上

- `lerna publish`

发布新的库版本。
``` bash
$ lerna publish  # 发布最新commit的修改
$ lerna publish <commit-id> # 发布指定commit-id的代码
```

- `lerna exec`

在每个包目录下执行任意命令，如`lerna exec -- rm -rf node_modules`,将会删除packages目录下所有的node_modules

- `lerna changed` 查看哪些包有变更

- `lerna diff` 查看代码变更


## 四、踩过的坑

### 坑1

group形式的包，lerna会默认为其是私有的，直接发会发不上去，报错 "You must sign up for private packages", 这种情况下，需要在每个包的package.json中添加配置
``` json 
{
  "publishConfig":{
   "access":"public"
  }
}
```

### 坑2
lerna 每次在publish之后，会自动在git仓库上打一个tag(版本号), 如果当前版本号低于之前发布的版本号，是publish不成功的。

### 坑3
运行lerna publish如果中途有包发布失败，再运行lerna publish的时候，因为Tag已经打上去了，所以不会再重新发布包到NPM。（这个时候本地`git tag` 查看，可以看到生成了新的tag和commit记录，但是远端仓库可能没有push成功）。

解决办法：
1. 运行`lerna publish from-git`，会把当前标签中涉及的NPM包再发布一次，PS：不会再更新package.json，也不会把当前的tag push 到github上，只是执行`npm publish`
2. 运行`lerna publish from-package`，会把当前所有本地包中的package.json和远端NPM比对，如果是NPM上不存在的包版本，都执行一次npm publish