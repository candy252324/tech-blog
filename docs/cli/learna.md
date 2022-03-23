# learna

learn 是一个优化基于git+npm的多package项目的管理工具

npm init

npm i lerna -D

lerna init（会创建git仓库,lerna.json）

手动创建 .gitignore文件（
.vscode
.idea
node_modules
packages/**/node_modules
）

lerna create core（创建core文件夹，但是得手动输入包名称，如：@hhh/core,发包前需要提前在npm上把@hhh这个建一下）


lerna create utils

