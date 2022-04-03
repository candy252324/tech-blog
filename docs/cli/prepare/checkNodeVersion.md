# 检查node版本号

 使用 semver 库进行node版本检查

 ```
yarn add semver -S
 ```

``` js
const LOWEST_NODE_VERSION='16.13.2'
checkNodeVersion()

function checkNodeVersion() {
  const curNodeVersion = process.version  // 当前node版本号
  const lowestNodeVersion = constant.LOWEST_NODE_VERSION

  if (!semver.gt(curNodeVersion, lowestNodeVersion)) {
    log.error(`cxxgo 需要安装${lowestNodeVersion}以上的node版本`)
  }
}
```
