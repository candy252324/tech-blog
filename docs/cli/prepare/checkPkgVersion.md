# 版本检查

``` js
const pkg = require('../package.json')
function checkPkgVersion() {
  log.notice('cli版本', pkg.version)
}
 checkPkgVersion()
```
