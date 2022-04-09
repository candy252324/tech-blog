# 检查环境变量

使用`dotenv`检查环境变量, 保存用户名，密码等敏感信息。

``` bash
npm i dotenv path-exists -S  
```

``` js
const path = require('path')
const pathExists = require('path-exists').sync

/** 环境变量检查 */
function checkEnv() {
  const dotenv = require('dotenv')
  const dotenvPath = path.resolve(userHomeDir, '.env')
  if (pathExists(dotenvPath)) {
    // dotenv用于读取指定目录的的配置文件，并将配置写入到process.env中
    dotenv.config({
      path: dotenvPath,
    })
  }
  createDefaultConfig()
  log.verbose('环境变量', process.env.CLI_HOME_PATH)
}

/** 创建脚手架缓存目录 */
function createDefaultConfig() {
  const cliConfig = {
    home: userHomeDir,
  }
  const DEFAULT_CLI_HOME='.cxxgo-cli'  // 默认缓存陌路

  // 如果本地.env已经配置了CXXGO_CLI_HOME的缓存目录
  if (process.env.CXXGO_CLI_HOME) {
    cliConfig['cliHome'] = path.join(userHomeDir, process.env.CXXGO_CLI_HOME)
  } else {
    cliConfig['cliHome'] = path.join(userHomeDir, DEFAULT_CLI_HOME)
  }
  process.env.CLI_HOME_PATH = cliConfig.cliHome
}
```