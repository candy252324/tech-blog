与packages同级建四个文件夹，core utils models commands, 删掉packages

lerna.json 修改为：
``` json
{
  "packages":[
    "core/*",
    "utils/*",
    "models/*",
    "commands/*",
    ]
}
```
core 的文件目录结构为
|-core  
  |-cli
    |-__tests__
    |-bin
      |-index.js
    |-lib
      |-const.js   // 如存储最低node 版本号
      |-index.js

core/package.json中可以这样写(这样写的话，在core下执行npm link, node_modules下会生成utils的软链接吗) 
``` json
{
  "dependencies":{
    "@cxxgo/utisl":"file:../../utils"
  }
}
```


/core/cli/bin/index.js文件内容如下
``` js
#！ /usr/bin/env node
const importLocal=require ('import-local')
if(importLocal(__filename)){
  require('npmlog').info('cli','正在使用imooc cli 本地版本')
}else{
  // 后面的/index.js可以省略
  require('../lib/index.js')(process.argv.slice(2))
}
```

/core/cli/lib/index.js文件中添加如下内容
1、定制npmlog
2、使用semver 校验node版本号, 使用colors包打印信息
注：throw new Error除了会打印错误外，默认还会打印大量的错误堆栈信息，可以使用try cache 捕获只打印错误信息

``` js
try{
  //
}cache((err)=>{
  log(err.message)
})
```

3、使用root-check 包增加检查root账户方法，判断是否root账户启动的bin命令，
如果当前是root权限启动的（sudo cxxgo），会自动进行权限降级(源码setuid)
4、使用usr-home获取用户主目录，path-exists库判断路径是否存在
```js
const userHome=require('user-home')
const pathExists=require('path-exists').sync

```
5、使用minimist检查入参，如果是debug模式，则将log的level改为'verbose'
6、使用dotenv检查环境变量, 保存用户名，密码等敏感信息 
7、获取最新版本号提示版本更新






utils 的文件目录结构为
|-utils  
  |-log
    |-__tests__
    |-lib
      |-index.js








小知识点：require 只支持加载三种文件
1、 .json 通过JSON.parse()解析
2、.js 文件必须导出module.exports 或 exports
3、.node (C++ 插件，原理通过process.dlopen打开一个c++插件)
4、其它任何类型的文件将被当做js文件解析（如在.txt中写js）



