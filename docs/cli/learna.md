# learna


### 6.npm link





learn 是一个优化基于git+npm的多package项目的管理工具

npm init

npm i lerna -D

lerna init（会创建git仓库,lerna.json）

手动创建 .gitignore文件（
.vscode
.idea
node_modules
packages/**/node_modules
lerna-debug.log
）

lerna create core（创建core文件夹，但是得手动输入包名称，如：@hhh/core,发包前需要提前在npm上把@hhh这个建一下）


lerna create utils

使用lerna add xxx 装包，包会被安装到所有使用lerna create 的package中，


`lerna clean` 会把所有包下所有的nodedules都清除

`learn add xxx packages/core` 把包装到指定目录下

`learna bootstrap` 重新安装依赖

`learn link`
`lerna exec -- rm -rf node_modules` 删除packages目录下所有的node_modules

`larn run xxx` 执行所有包里的xxx script 命令

`lerna changed` 哪些包有变更

`lerna diff` 代码变更

`lerna version` 查看版本号


git checkout -- xxx.js


使用group的方式发布npm包，lerna会默认为是私有的，直接发会发不上去，
需要在每个包的package.json中添加配置
```
publishConfig:{
  access:'public'
}
```
lerna 每次在publish之后，会在git仓库上打一个tag(版本号),如果当前版本号低于之前的版本号，是publish不成功的