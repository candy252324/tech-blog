# 判断用户主目录是否存在

``` js
const os = require("os")
const pathExists = require('path-exists').sync // 示例版本version 4.0.0

/** 判断用户主目录是否存在 */
function checkUserHome() {
  const userHomeDir = os.homedir() // 当前用户主目录
  if (!userHomeDir || !pathExists(userHomeDir)) {
    throw new Error("当前登录用户主目录不存在！")
  }
}

```