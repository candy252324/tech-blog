# 定制log

基于库`npmlog`实现。

``` bash
yarn add npmlog -S
```



这个库的的实现原理是：
**给每一种类型的log定一个level, 只有level值大于或等于当前level的log才会被执行。**

`npmlog`库部分源码:
``` js
// 定义了9种log类型
log.addLevel('silly', -Infinity, { inverse: true }, 'sill')
log.addLevel('verbose', 1000, { fg: 'cyan', bg: 'black' }, 'verb')
log.addLevel('info', 2000, { fg: 'green' })
log.addLevel('timing', 2500, { fg: 'green', bg: 'black' })
log.addLevel('http', 3000, { fg: 'green', bg: 'black' })
log.addLevel('notice', 3500, { fg: 'cyan', bg: 'black' })
log.addLevel('warn', 4000, { fg: 'black', bg: 'yellow' }, 'WARN')
log.addLevel('error', 5000, { fg: 'red', bg: 'black' }, 'ERR!')
log.addLevel('silent', Infinity)
```

 
 ### 1、基本使用

 如下代码，只有`log.notice` 和`log.error` 会有输出：
 ``` js
const log = require('npmlog')
log.level = "notice"  // 定义当前的log为verbose（level为3500）

log.info('info输出')  // level 2000，不会打印
log.timing('timing输出') // level 2500，不会打印
log.notice('notice输出') // 当前level, 会打印
log.error('error输出')  // level 5000，会打印
 ```
 输出结果如下图：

<img :src="$withBase('/imgs/cli/prepare/custom-log1.png')" style="transform:scale(0.9);">

如果我们把上述代码的 level 改为 verbose, 则每一个log 都会有输出。

### 2、定制

``` js
log.heading = 'cxxgo'   // 自定义前缀
// 自定义 strange log，level为2000，增加样式
log.addLevel('strange', 2000, { fg: 'cyan', bg: 'green' ,bold: true})

log.info('info输出') 
log.strange('strange输出')

```
输出结果如下：

<img :src="$withBase('/imgs/cli/prepare/custom-log2.png')" style="transform:scale(0.9);">