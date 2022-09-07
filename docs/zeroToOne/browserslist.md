# browserslist 配置

package.json 中增加 browserslist 配置，根据实际需求配置。

这里配置目标浏览器为：全球用户份额大于 5% 的浏览器 和 所有浏览器的最新两个版本，但是不包括版本 <= 8 的 ie。



```json
{
 "browserslist": [
    "> 1%",
    "last 2 versions",
    "not ie <= 8"
  ]
}
```