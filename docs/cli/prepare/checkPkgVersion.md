# 检查版本更新

思路：发请求拿到最新版本与当前版本进行比较。

存在的问题：

1、 url-join 是ES module, 通过require引入报错

2、sort((a, b) => semver.gt(b, a))  倒序排列不生效(cjh todo)


``` bash
yarn add semver url-join -S
```

``` js
const axios = require('axios')
const semver = require('semver')
const pkg = require('../../package.json')

const pkgName = Object.keys(pkg.bin)[0]  // 当前包名
const currentVersion = pkg.version  //当前版本号
const latestVersionList = await getNpmPkgVersionList(pkgName, currentVersion) 
if(latestVersionList.length && latestVersionList[0] && semver.gt(latestVersionList[0],currentVersion)){
  log.warn(`有新版本${latestVersionList[0]},请手动更新`,`当前版本${currentVersion}`)
}

// 获取所有满足条件的版本数组，比如当前版本是 1.2.3， 则满足条件的版本是 ^1.2.3
async function getNpmPkgVersionList(
  pkgName, 
  baseVersion, 
  registry = 'https://registry.npmjs.org/'
) {
  const url = urlJoin(registry, pkgName)
  const res = await axios.get(url)
  if (res.status === 200) {
    const versions = Object.keys(res.data.versions || [])
    versions
      .filter(version => semver.satisfies(version, `^${baseVersion}`))  // 筛选满足条件的版本
      .sort((a, b) => semver.gt(b, a))  // 倒序排列
    return versions
  } else {
    return []
  }
}
```
