# 根据入参判断是否开启 debug 模式

### 方法一

通过 `process.argv` 拿到输入参数，再通过 minimist 包解析参数

``` bash
npm i minimist -S
```

``` js
function checkInputArgs() {
  const minimist = require('minimist')
  const args = minimist(process.argv.slice(2))
  // 如果是debug模式，将log level 将至verbose, 则能看见代码中所有的 log.verbose 打印
  if (args.debug) {
    process.env.LOG_LEVEL = "verbose"
  } else {
    process.env.LOG_LEVEL = "info"
  }
  log.level = process.env.LOG_LEVEL
}
```

### 方法一