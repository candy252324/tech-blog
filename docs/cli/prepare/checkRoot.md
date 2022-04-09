# 检查是否管理员权限

 使用 `root-check`包，判断是否root账户启动的bin命令,如果当前是root权限启动的（sudo cxxgo），自动进行权限降级。为了防止后面出现一些奇怪的问题。

``` bash
npm i root-check -S
```
``` js
function checkRoot() {
  const checkRoot = require('root-check') 
  checkRoot()
}
```
注： 当前示例基于root-check 1.0.0 版本。之后版本改成了ESM, 无法再使用require 方式加载。